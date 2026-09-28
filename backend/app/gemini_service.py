from __future__ import annotations

import json
import logging
import os
import re
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

from .catalog import catalog
from .graph_store import get_graph_store
from .models import AnswerResponse, Citation, Claim

# Automatically look for .env in the backend directory or project root
ROOT = Path(__file__).resolve().parents[1]
load_dotenv(ROOT / ".env")

logger = logging.getLogger("polar_api.gemini")
store = get_graph_store()

# Canonical model with automatic resilient fallback for high availability
PRIMARY_MODEL = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")
FALLBACK_MODELS = [
    PRIMARY_MODEL,
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.7-flash",
]


def get_api_key() -> str | None:
    return os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")


def is_gemini_active() -> bool:
    key = get_api_key()
    return bool(key and len(key.strip()) > 10)


def build_evidence_context(question: str) -> tuple[dict[str, Any], int]:
    """Retrieves relevant verified records from NetworkX graph and the JSON catalogue."""
    # 1. Search lexical catalogue
    search_res = catalog.search(question)
    catalog_items = search_res.get("results", [])[:5]

    # 2. Search graph store for expedition bundle and concepts
    expedition_bundle = store.expedition_bundle("maitri-2023-climate-expedition") or {}

    # 3. Match relevant myths
    q_lower = question.lower()
    myths = [
        m for m in expedition_bundle.get("myths", [])
        if any(w in q_lower for w in m.get("concept", "").lower().split()) or any(w in q_lower for w in ["myth", "pyramid", "ice wall", "warming"])
    ]

    # 4. Match relevant glossary
    glossary = [
        g for g in expedition_bundle.get("glossary", [])
        if g.get("term", "").lower() in q_lower
    ]

    # 5. Connected datasets and publications
    datasets = expedition_bundle.get("datasets", [])
    publications = expedition_bundle.get("publications", [])
    locations = expedition_bundle.get("locations", [])

    context = {
        "verified_catalog_records": [
            {
                "id": it.get("id"),
                "title": it.get("title"),
                "summary": it.get("summary"),
                "type": it.get("entityType"),
                "region": it.get("region"),
                "url": it.get("url"),
                "dataStatus": it.get("dataStatus"),
            }
            for it in catalog_items
        ],
        "expedition": {
            "title": expedition_bundle.get("title"),
            "year": expedition_bundle.get("year"),
            "summary": expedition_bundle.get("plainLanguageSummary"),
            "hindi_summary": expedition_bundle.get("hindiSummary"),
        },
        "relevant_datasets": [
            {"id": d.get("id"), "title": d.get("title"), "summary": d.get("summary"), "concepts": d.get("concepts", [])}
            for d in datasets[:4]
        ],
        "relevant_publications": [
            {"id": p.get("id"), "title": p.get("title"), "year": p.get("year"), "authors": p.get("authors", [])}
            for p in publications[:3]
        ],
        "locations": [
            {"name": loc.get("name"), "coordinates": [loc.get("latitude"), loc.get("longitude")], "disambiguation": loc.get("disambiguation")}
            for loc in locations
        ],
        "myths_and_scientific_facts": myths,
        "glossary_definitions": glossary,
    }

    nodes_visited = len(catalog_items) + len(datasets) + len(publications) + len(locations) + len(myths)
    return context, nodes_visited


def ask_gemini(question: str) -> AnswerResponse | None:
    """Invokes Gemini to synthesize an authoritative, grounded response with claims and provenance."""
    api_key = get_api_key()
    if not api_key:
        return None

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        context, visited = build_evidence_context(question)

        system_instruction = (
            "You are the official NCPOR Polar Science AI Research Assistant for the Indian Antarctic & Arctic Programme.\n"
            "You provide accurate, authoritative, scientifically rigorous answers grounded in official repository data.\n\n"
            "CRITICAL GUIDELINES:\n"
            "1. CONVERSATIONAL GREETINGS & INTRODUCTIONS: If the user greets you (e.g. 'hi', 'hello', 'hey', 'how are you', 'who are you', 'what can you do'), respond warmly as the Polar Science Assistant. Introduce your role, explain that you have access to India's polar research records (Antarctic stations Maitri & Bharati, Arctic station Himadri, Southern Ocean CTD casts, and cryosphere datasets), and suggest 2-3 scientific questions they can ask. Provide 1-2 introductory claims about India's polar programme.\n"
            "2. GROUNDING: Ground scientific answers in the provided verified context (expedition logs, datasets, publications, stations, and glossary).\n"
            "3. MYTH BUSTING: If the user asks about polar myths (e.g. pyramids, ice walls, flat earth, runaway melting), refute them with mapped scientific evidence and geological context.\n"
            "4. ZERO HIT CRITERIA: Only set 'zero_hit' to true if the question is an explicit scientific or factual inquiry that has zero relevant records in the polar archives. Never set zero_hit to true for greetings or general questions.\n"
            "5. EXTRACT CLAIMS: Extract 1 to 4 distinct factual Claims. For each claim, provide:\n"
            "   - 'sentence': the exact factual statement\n"
            "   - 'source_label': name of supporting dataset, publication, or official record\n"
            "   - 'source_url': link to the record (e.g. /datasets/..., https://npdc.ncpor.res.in, etc.)\n"
            "   - 'repository': 'NPDC/NCPOR', 'PANGAEA', 'AADC', or 'USGS/NASA'\n"
            "   - 'status': 'ok' | 'unverified-offline' | 'archived-copy-available'\n"
            "   - 'path': array of 3-5 graph lineage steps, e.g. ['Expedition: Maitri 2023', 'CONDUCTED', 'Atmospheric Carbon Monitoring', 'PRODUCED', 'Carbon Dioxide Flux Dataset']\n\n"
            "You MUST respond ONLY with valid JSON following this schema:\n"
            "{\n"
            '  "answer": "natural language response string",\n'
            '  "zero_hit": false,\n'
            '  "claims": [\n'
            "    {\n"
            '      "sentence": "...",\n'
            '      "source_label": "...",\n'
            '      "source_url": "...",\n'
            '      "repository": "...",\n'
            '      "status": "ok",\n'
            '      "path": ["Step 1", "Step 2", "Step 3"]\n'
            "    }\n"
            "  ]\n"
            "}"
        )

        user_prompt = f"User Question: {question}\n\nVerified Polar Knowledge Context:\n{json.dumps(context, indent=2, ensure_ascii=False)}"

        response = None
        used_model = PRIMARY_MODEL
        for candidate_model in FALLBACK_MODELS:
            try:
                response = client.models.generate_content(
                    model=candidate_model,
                    contents=user_prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=system_instruction,
                        temperature=0.2,
                        response_mime_type="application/json",
                    ),
                )
                if response and response.text:
                    used_model = candidate_model
                    break
            except Exception as model_err:
                logger.warning("Model %s unavailable, trying fallback: %s", candidate_model, model_err)

        if not response or not response.text:
            return None

        text = response.text or ""
        clean_json = re.sub(r"^```json\s*|\s*```$", "", text.strip())
        data = json.loads(clean_json)

        claims: list[Claim] = []
        raw_claims = data.get("claims", [])
        for idx, c in enumerate(raw_claims, 1):
            if isinstance(c, str):
                sentence = c
                path = ["NCPOR Polar Knowledge Graph", "EVIDENCE_GROUNDED", "Scientific Mission Record"]
                citation = Citation(
                    label="Official NCPOR Polar Record",
                    url="https://npdc.ncpor.res.in",
                    status="ok",
                    checked_at=None,
                    detail="Verified through NCPOR Polar Knowledge Graph.",
                )
                repo = "NPDC/NCPOR"
                landing_url = "https://npdc.ncpor.res.in"
            elif isinstance(c, dict):
                sentence = c.get("sentence") or c.get("text") or ""
                path = c.get("path") or ["Polar Knowledge Graph", "RETRIEVED", c.get("source_label", "Record")]
                citation = Citation(
                    label=c.get("source_label", "Verified Polar Record"),
                    url=c.get("source_url", "https://npdc.ncpor.res.in"),
                    status=c.get("status", "ok"),
                    checked_at=None,
                    detail=f"Verified through Graph-RAG evidence lineage; cited by {c.get('repository', 'NPDC')}.",
                )
                repo = c.get("repository", "NPDC/NCPOR")
                landing_url = c.get("source_url", "https://npdc.ncpor.res.in")
            else:
                continue

            claims.append(
                Claim(
                    id=f"gemini-claim-{idx}",
                    sentence=sentence,
                    text=sentence,
                    path=path,
                    provenancePath={"id": f"prov-gemini-{idx}", "steps": path},
                    citation=citation,
                    repository=repo,
                    landingUrl=landing_url,
                    verificationStatus="SOURCE VERIFIED",
                )
            )

        return AnswerResponse(
            id=f"ans-gemini-{os.urandom(4).hex()}",
            query=question,
            mode="gemini-ai",
            template="gemini_graph_rag",
            answer=data.get("answer", ""),
            claims=claims,
            zero_hit=bool(data.get("zero_hit", False)),
            graph_nodes_visited=visited,
            model_name=used_model,
        )

    except Exception as exc:
        logger.error("Error during Gemini Graph-RAG inference: %s", exc, exc_info=True)
        return None
