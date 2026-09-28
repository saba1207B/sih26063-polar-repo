from __future__ import annotations

import csv
import io
import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Any


DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "platform.json"
TYPE_KEYS = ("datasets", "publications", "researchers", "stations", "projects", "expeditions", "topics")
STOP_WORDS = {"a", "an", "and", "are", "at", "by", "for", "from", "in", "is", "of", "on", "show", "the", "to", "what", "with"}


def _tokens(value: Any) -> list[str]:
    text = json.dumps(value, ensure_ascii=False) if not isinstance(value, str) else value
    return [token for token in re.findall(r"[a-z0-9]+", text.casefold().replace("co₂", "co2")) if token not in STOP_WORDS]


class Catalog:
    def __init__(self, path: Path = DATA_PATH):
        self.data: dict[str, Any] = json.loads(path.read_text(encoding="utf-8"))
        self.records: list[dict[str, Any]] = []
        for key in TYPE_KEYS:
            self.records.extend(self.data.get(key, []))
        self.by_id = {record["id"]: record for record in self.records}

    def list(self, entity_type: str, **filters: str | int | None) -> list[dict[str, Any]]:
        key = entity_type if entity_type.endswith("s") else f"{entity_type}s"
        records = list(self.data.get(key, []))
        for name, value in filters.items():
            if value in (None, ""):
                continue
            needle = str(value).casefold()
            records = [item for item in records if needle in str(item.get(name, "")).casefold() or needle in " ".join(item.get(name, []) if isinstance(item.get(name), list) else []).casefold()]
        return records

    def get(self, entity_type: str, slug: str) -> dict[str, Any] | None:
        return next((item for item in self.list(entity_type) if item.get("slug") == slug or item.get("id") == slug), None)

    def resolve_related(self, record: dict[str, Any]) -> list[dict[str, Any]]:
        return [self.by_id[item_id] for item_id in record.get("related", []) if item_id in self.by_id]

    def search(self, query: str, entity_type: str | None = None, region: str | None = None, year: int | None = None, topic: str | None = None) -> dict[str, Any]:
        query_tokens = _tokens(query)
        candidates = self.records
        if entity_type and entity_type != "all":
            candidates = [item for item in candidates if item.get("entityType") == entity_type.rstrip("s")]
        if region:
            candidates = [item for item in candidates if region.casefold() in str(item.get("region", "")).casefold()]
        if year:
            candidates = [item for item in candidates if str(year) in str(item.get("year", item.get("years", "")))]
        if topic:
            candidates = [item for item in candidates if topic.casefold() in json.dumps(item.get("topics", []), ensure_ascii=False).casefold()]

        document_frequency = Counter()
        candidate_tokens: dict[str, list[str]] = {}
        for item in candidates:
            tokens = _tokens({key: item.get(key) for key in ("title", "name", "summary", "topics", "region", "station", "authors")})
            candidate_tokens[item["id"]] = tokens
            document_frequency.update(set(tokens))

        scored = []
        for item in candidates:
            tokens = candidate_tokens[item["id"]]
            counts = Counter(tokens)
            score = 0.0
            matched = []
            for token in query_tokens:
                if counts[token]:
                    inverse_frequency = math.log((len(candidates) + 1) / (document_frequency[token] + 1)) + 1
                    score += (1 + math.log(counts[token])) * inverse_frequency
                    matched.append(token)
            title = str(item.get("title", item.get("name", ""))).casefold()
            if query.casefold().strip() and query.casefold().strip() in title:
                score += 5
            if not query_tokens:
                score = 1
            if score > 0:
                scored.append((score, matched, item))

        scored.sort(key=lambda row: (-row[0], str(row[2].get("title", row[2].get("name", "")))))
        results = []
        for score, matched, item in scored[:30]:
            results.append({
                "id": item["id"],
                "slug": item["slug"],
                "entityType": item["entityType"],
                "title": item.get("title", item.get("name")),
                "summary": item.get("summary", ""),
                "region": item.get("region"),
                "year": item.get("year", item.get("years")),
                "topics": item.get("topics", []),
                "dataStatus": item.get("dataStatus", "Context record"),
                "relevance": round(score, 3),
                "matchedTerms": sorted(set(matched)),
                "url": self.url_for(item),
            })
        return {"query": query, "count": len(results), "results": results, "retrieval": "Local lexical ranking plus metadata filters; no embedding or generative ranking"}

    @staticmethod
    def url_for(record: dict[str, Any]) -> str:
        entity_type = record["entityType"]
        plural = {"researcher": "researchers", "expedition": "expeditions", "publication": "publications", "dataset": "datasets", "station": "stations"}.get(entity_type, "explore")
        return f"/{plural}/{record['slug']}" if plural != "explore" else f"/explore?type={entity_type}&id={record['slug']}"

    def graph(self, focus: str | None = None, depth: int = 1) -> dict[str, Any]:
        depth = max(1, min(depth, 3))
        selected_ids = set(self.by_id)
        if focus and focus in self.by_id:
            selected_ids = {focus}
            frontier = {focus}
            for _ in range(depth):
                expanded = set()
                for item_id in frontier:
                    record = self.by_id[item_id]
                    expanded.update(record.get("related", []))
                    expanded.update(other["id"] for other in self.records if item_id in other.get("related", []))
                selected_ids.update(expanded)
                frontier = expanded
        nodes = [{"id": item["id"], "label": item.get("title", item.get("name")), "type": item["entityType"], "slug": item["slug"], "url": self.url_for(item), "summary": item.get("summary", "")} for item in self.records if item["id"] in selected_ids]
        edge_keys: set[tuple[str, str]] = set()
        links = []
        for item in self.records:
            if item["id"] not in selected_ids:
                continue
            for target in item.get("related", []):
                if target in selected_ids:
                    key = tuple(sorted((item["id"], target)))
                    if key not in edge_keys:
                        edge_keys.add(key)
                        links.append({"source": item["id"], "target": target, "label": "RELATED_TO"})
        return {"nodes": nodes, "links": links, "focus": focus, "depth": depth}

    def analyse_dataset(self, slug: str, variable: str | None = None) -> dict[str, Any] | None:
        dataset = self.get("datasets", slug)
        if not dataset:
            return None
        rows = dataset.get("rows", [])
        numeric_variables = [key for key in dataset.get("variables", []) if rows and isinstance(rows[0].get(key), (int, float))]
        selected = variable if variable in numeric_variables else (numeric_variables[0] if numeric_variables else None)
        values = [float(row[selected]) for row in rows] if selected else []
        if not values:
            return {"dataset": dataset["title"], "variable": selected, "count": 0, "message": "No numeric values are available."}
        slope = (values[-1] - values[0]) / max(1, len(values) - 1)
        direction = "increasing" if slope > 0 else "decreasing" if slope < 0 else "flat"
        return {
            "dataset": dataset["title"], "variable": selected, "count": len(values), "minimum": min(values), "maximum": max(values),
            "mean": round(sum(values) / len(values), 3), "first": values[0], "last": values[-1], "simpleSlopePerRow": round(slope, 3),
            "direction": direction, "method": "Deterministic descriptive statistics over the bundled demonstration rows; no causal inference.",
            "citation": {"label": dataset["title"], "url": dataset["sourceUrl"], "dataStatus": dataset["dataStatus"]},
        }

    def dataset_download(self, slug: str, output_format: str) -> tuple[str, str] | None:
        dataset = self.get("datasets", slug)
        if not dataset:
            return None
        if output_format == "json":
            return json.dumps(dataset.get("rows", []), indent=2), "application/json"
        buffer = io.StringIO()
        writer = csv.DictWriter(buffer, fieldnames=dataset.get("variables", []))
        writer.writeheader()
        writer.writerows(dataset.get("rows", []))
        return buffer.getvalue(), "text/csv"

    def stats(self) -> dict[str, int]:
        return {key: len(self.data.get(key, [])) for key in TYPE_KEYS}


catalog = Catalog()
