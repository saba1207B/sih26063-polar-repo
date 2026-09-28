from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["graph"] == "networkx"
    assert client.get("/api/v1/health").json()["catalog"] == "loaded"


def test_semantic_synonym_search():
    response = client.post("/api/ask", json={"question": "Show CO2 flux data"})
    body = response.json()
    assert response.status_code == 200
    assert body["zero_hit"] is False
    assert "Carbon dioxide" in body["answer"]
    assert body["claims"][0]["path"]


def test_unicode_co2_subscript_is_normalized():
    body = client.post("/api/ask", json={"question": "What did the expedition measure about CO₂ flux?"}).json()
    assert body["zero_hit"] is False
    assert "Carbon dioxide" in body["answer"]


def test_zero_hit_is_honest():
    body = client.post("/api/ask", json={"question": "Are there penguin poetry recordings?"}).json()
    assert body["zero_hit"] is True
    assert "I don't know" in body["answer"]


def test_expedition_bundle():
    body = client.get("/api/expeditions/maitri-2023-climate-expedition").json()
    assert len(body["datasets"]) == 4
    assert len(body["publications"]) == 3
    assert len(body["media"]) == 5
    assert len(body["myths"]) == 3


def test_link_health_has_archived_fallback():
    body = client.get("/api/link-health").json()
    assert any(link["status"] == "archived-copy-available" and link.get("archivePath") for link in body)


def test_universal_search_returns_cross_type_evidence():
    body = client.get("/api/v1/search", params={"q": "black carbon Arctic", "type": "all"}).json()
    assert body["count"] >= 3
    assert {item["entityType"] for item in body["results"]} >= {"dataset", "publication", "researcher"}
    assert body["retrieval"].startswith("Local lexical")


def test_search_filter_and_zero_hit():
    filtered = client.get("/api/v1/search", params={"q": "weather", "type": "dataset"}).json()
    assert filtered["results"]
    assert all(item["entityType"] == "dataset" for item in filtered["results"])
    assert client.get("/api/v1/search", params={"q": "penguin poetry phonograph"}).json()["count"] == 0


def test_dataset_analysis_is_deterministic():
    body = client.get("/api/v1/datasets/arctic-black-carbon-observations/analysis", params={"variable": "black_carbon_ng_m3"}).json()
    assert body["count"] == 6
    assert body["minimum"] == 27
    assert body["maximum"] == 42
    assert body["direction"] == "decreasing"
    assert "no causal inference" in body["method"]


def test_dataset_downloads():
    csv_response = client.get("/api/v1/datasets/arctic-black-carbon-observations/download", params={"format": "csv"})
    assert csv_response.status_code == 200
    assert "black_carbon_ng_m3" in csv_response.text
    json_response = client.get("/api/v1/datasets/arctic-black-carbon-observations/download", params={"format": "json"})
    assert len(json_response.json()) == 6


def test_graph_neighborhood_and_recommendations():
    graph = client.get("/api/v1/graph", params={"focus": "ds-arctic-black-carbon", "depth": 1}).json()
    assert any(node["id"] == "pub-arctic-aerosol-demo" for node in graph["nodes"])
    assert graph["links"]
    recommendations = client.get("/api/v1/recommendations/ds-arctic-black-carbon").json()
    assert any(item["id"] == "station-himadri" for item in recommendations)


def test_polar_ai_catalogue_bundle_has_claim_citations():
    body = client.post("/api/v1/ask", json={"question": "What research exists on black carbon in the Arctic?", "mode": "graph"}).json()
    assert body["zero_hit"] is False
    assert body["template"] == "catalogue_evidence_bundle"
    assert all(claim["citation"] and claim["path"] for claim in body["claims"])


def test_security_headers_are_present():
    response = client.get("/api/v1/health")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"


def test_gemini_health_and_frontend_routes():
    health = client.get("/api/health").json()
    assert "gemini" in health
    assert health["gemini"] in ("active", "ready-for-api-key")

    # Test assistant route alias
    response = client.post("/assistant/ask", json={"question": "Show CO2 flux data"})
    assert response.status_code == 200
    body = response.json()
    assert body["claims"][0]["text"]  # frontend alias
    assert body["claims"][0]["provenancePath"]  # frontend alias
    assert body["claims"][0]["verificationStatus"]  # frontend alias

    # Test analytics zero-hits route
    zh = client.get("/api/analytics/zero-hits").json()
    assert isinstance(zh, list)
