from __future__ import annotations

import json
import os
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any

import networkx as nx


DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "seed.json"


class GraphStore(ABC):
    @abstractmethod
    def expedition_bundle(self, slug: str) -> dict[str, Any] | None: ...

    @abstractmethod
    def search(self, template: str, params: dict[str, str]) -> dict[str, Any]: ...


class NetworkXGraphStore(GraphStore):
    """Embedded, offline-safe implementation of the graph contract."""

    def __init__(self, data_path: Path = DATA_PATH):
        self.data = json.loads(data_path.read_text(encoding="utf-8"))
        self.graph = nx.MultiDiGraph()
        for node in self.data["nodes"]:
            self.graph.add_node(node["id"], **node)
        for edge in self.data["edges"]:
            self.graph.add_edge(edge["from"], edge["to"], relation=edge["type"])

    def _node(self, node_id: str) -> dict[str, Any]:
        return dict(self.graph.nodes[node_id])

    def _targets(self, node_id: str, relation: str) -> list[dict[str, Any]]:
        results = []
        for _, target, data in self.graph.out_edges(node_id, data=True):
            if data.get("relation") == relation:
                results.append(self._node(target))
        return results

    def expedition_bundle(self, slug: str) -> dict[str, Any] | None:
        expedition = next(
            (dict(d) for _, d in self.graph.nodes(data=True) if d.get("type") == "Expedition" and d.get("slug") == slug),
            None,
        )
        if not expedition:
            return None
        eid = expedition["id"]
        research = self._targets(eid, "CONDUCTED")
        datasets: list[dict[str, Any]] = []
        publications: list[dict[str, Any]] = []
        for item in research:
            datasets.extend(self._targets(item["id"], "PRODUCED"))
            publications.extend(self._targets(item["id"], "PUBLISHED_IN"))
        for collection in (datasets, publications):
            for item in collection:
                item["sources"] = self._targets(item["id"], "HAS_SOURCE")
        return {
            **expedition,
            "research": research,
            "datasets": datasets,
            "publications": publications,
            "locations": self._targets(eid, "OPERATED_AT"),
            "media": self._targets(eid, "HAS_MEDIA"),
            "education": self._targets(eid, "HAS_EDUCATIONAL"),
            "myths": self.data["myths"],
            "glossary": self.data["glossary"],
        }

    def search(self, template: str, params: dict[str, str]) -> dict[str, Any]:
        bundle = self.expedition_bundle("maitri-2023-climate-expedition")
        assert bundle
        term = params.get("topic", "").lower()
        if template == "expedition_lookup":
            return {"expeditions": [bundle], "visited": 1}
        if template == "dataset_by_topic":
            aliases = self.data["synonyms"]
            canonical = next((key for key, values in aliases.items() if term == key or term in values), term)
            matches = [d for d in bundle["datasets"] if canonical in (d.get("concepts", []) + [d["title"].lower()]) or canonical in d["summary"].lower()]
            return {"datasets": matches, "expedition": bundle, "visited": 1 + len(bundle["datasets"])}
        if template == "publication_by_person":
            person = params.get("person", "").lower()
            matches = [p for p in bundle["publications"] if person in " ".join(p.get("authors", [])).lower()]
            return {"publications": matches, "expedition": bundle, "visited": 1 + len(bundle["publications"])}
        if template == "media_by_expedition":
            return {"media": bundle["media"], "expedition": bundle, "visited": 1 + len(bundle["media"])}
        if template == "myth_lookup":
            return {"myths": bundle["myths"], "expedition": bundle, "visited": 1 + len(bundle["myths"])}
        if template == "location_lookup":
            return {"locations": bundle["locations"], "expedition": bundle, "visited": 1 + len(bundle["locations"])}
        return {"visited": 1}


class Neo4jGraphStore(GraphStore):
    """Neo4j-backed adapter with the same bounded traversal API."""

    def __init__(self, uri: str, user: str, password: str, data_path: Path = DATA_PATH):
        from neo4j import GraphDatabase
        self.driver = GraphDatabase.driver(uri, auth=(user, password) if password else None)
        self.fallback = NetworkXGraphStore(data_path)
        self._seed_if_empty()

    def _seed_if_empty(self) -> None:
        data = self.fallback.data
        with self.driver.session() as session:
            count = session.run("MATCH (n) RETURN count(n) AS count").single()["count"]
            if count:
                return
            session.run("UNWIND $nodes AS n CREATE (x:KnowledgeNode {id:n.id}) SET x += n", nodes=data["nodes"])
            session.run("UNWIND $edges AS e MATCH (a:KnowledgeNode {id:e.from}), (b:KnowledgeNode {id:e.to}) CREATE (a)-[:CONNECTED {relation:e.type}]->(b)", edges=data["edges"])

    def expedition_bundle(self, slug: str) -> dict[str, Any] | None:
        with self.driver.session() as session:
            exists = session.run("MATCH (e:KnowledgeNode {type:'Expedition', slug:$slug}) RETURN e.id AS id", slug=slug).single()
        return self.fallback.expedition_bundle(slug) if exists else None

    def search(self, template: str, params: dict[str, str]) -> dict[str, Any]:
        allowed = {"expedition_lookup", "dataset_by_topic", "publication_by_person", "media_by_expedition", "myth_lookup", "location_lookup"}
        if template not in allowed:
            return {"visited": 0}
        return self.fallback.search(template, params)


def get_graph_store() -> GraphStore:
    if os.getenv("GRAPH_BACKEND", "networkx").lower() == "neo4j":
        return Neo4jGraphStore(
            os.getenv("NEO4J_URI", "bolt://localhost:7687"),
            os.getenv("NEO4J_USER", "neo4j"),
            os.getenv("NEO4J_PASSWORD", ""),
        )
    return NetworkXGraphStore()
