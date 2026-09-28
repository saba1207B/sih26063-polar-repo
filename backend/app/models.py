from typing import Any, Literal
from pydantic import BaseModel, Field, model_validator


class QuestionRequest(BaseModel):
    question: str = Field(min_length=2, max_length=500)
    mode: Literal["graph", "search", "dataset"] = "graph"


class Citation(BaseModel):
    label: str
    url: str
    status: Literal["ok", "stale", "archived-copy-available", "unverified-offline"]
    checked_at: str | None = None
    detail: str


class ProvenancePath(BaseModel):
    id: str
    steps: list[str] = Field(default_factory=list)


class Claim(BaseModel):
    id: str
    sentence: str
    text: str | None = None
    path: list[str] = Field(default_factory=list)
    provenancePath: ProvenancePath | None = None
    verificationStatus: Literal[
        "SOURCE VERIFIED", "UNVERIFIED OFFLINE", "STALE SOURCE", "ARCHIVED COPY AVAILABLE"
    ] | str = "SOURCE VERIFIED"
    repository: str | None = None
    doi: str | None = None
    landingUrl: str | None = None
    lastCheckedAt: str | None = None
    citation: Citation | None = None

    @model_validator(mode="after")
    def populate_frontend_aliases(self) -> "Claim":
        if not self.text:
            self.text = self.sentence
        if not self.provenancePath and self.path:
            self.provenancePath = ProvenancePath(id=f"prov-{self.id}", steps=self.path)
        if self.citation:
            if not self.landingUrl:
                self.landingUrl = self.citation.url
            if not self.lastCheckedAt:
                self.lastCheckedAt = self.citation.checked_at
            status_map = {
                "ok": "SOURCE VERIFIED",
                "stale": "STALE SOURCE",
                "archived-copy-available": "ARCHIVED COPY AVAILABLE",
                "unverified-offline": "UNVERIFIED OFFLINE",
            }
            if self.verificationStatus == "SOURCE VERIFIED" and self.citation.status in status_map:
                self.verificationStatus = status_map[self.citation.status]
        return self


class AnswerResponse(BaseModel):
    id: str | None = None
    query: str | None = None
    mode: Literal["offline-scripted", "deterministic-graph", "gemini-grounded-graph", "gemini-ai"] | str
    template: str
    answer: str
    claims: list[Claim] = Field(default_factory=list)
    sources: list[dict[str, Any]] = Field(default_factory=list)
    zero_hit: bool = False
    graph_nodes_visited: int = 0
    model_name: str | None = None


class AnalyticsEvent(BaseModel):
    event_type: Literal["zero_hit", "high_exit"]
    question: str
    context: dict[str, Any] = Field(default_factory=dict)
