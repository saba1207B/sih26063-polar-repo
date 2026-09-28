export interface BaseEntity {
  id: string;
  title: string;
  description?: string;
}

export interface Concept extends BaseEntity {
  type?: 'Thematic' | 'Geographic' | 'Methodological';
  relatedDatasetIds?: string[];
  relatedPublicationIds?: string[];
  relatedExpeditionIds?: string[];
}

export interface Location {
  id: string;
  name: string;
  coordinates?: [number, number]; // [lat, lng]
  type?: 'Station' | 'Ice Sheet' | 'Ocean' | 'Glacier' | 'Mountain' | 'Vessel';
  region?: string;
  description?: string;
}

export interface Person {
  id: string;
  name: string;
  role?: string;
  affiliation?: string;
  avatarUrl?: string;
  bio?: string;
  expeditionIds?: string[];
  publicationIds?: string[];
}

export interface MediaAsset extends BaseEntity {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  expeditionId?: string;
  datasetId?: string;
  locationName?: string;
  license?: string;
  source?: string;
  credit?: string;
}

export interface SourceRecord {
  id: string;
  repository: 'NPDC/NCPOR' | 'PANGAEA' | 'AADC' | 'NCAR' | 'BAS' | string;
  externalId: string;
  url: string;
  lastSynced?: string;
  status: 'Healthy' | 'Degraded' | 'Offline' | string;
  metadata?: Record<string, unknown>;
}

export interface Dataset extends BaseEntity {
  repository?: string;
  researchTopic?: string;
  locationName?: string;
  doi?: string;
  license?: string;
  status?: 'Active' | 'Archived' | 'Updated' | string;
  format?: string;
  size?: string;
  publicationDate?: string;
  sourceRecordId?: string;
  expeditionId?: string;
  researchActivityId?: string;
  conceptIds?: string[];
  mediaIds?: string[];
}

export interface Publication {
  id: string;
  title: string;
  description?: string;
  authors?: string[];
  personIds?: string[]; // Links to Person entities
  year?: number;
  abstract?: string;
  repository?: string;
  doi?: string;
  journal?: string;
  relatedExpeditionId?: string;
  researchActivityId?: string;
  sourceRecordId?: string;
  conceptIds?: string[];
}

export interface ResearchActivity extends BaseEntity {
  expeditionId?: string;
  leadResearcher?: string;
  personIds?: string[];
  domain?: 'Glaciology' | 'Atmospheric Science' | 'Oceanography' | 'Biology' | 'Geology' | string;
  datasetIds?: string[];
  publicationIds?: string[];
  topics?: string[];
  status?: 'Ongoing' | 'Completed' | 'Published' | string;
}

export interface MythVsMeasurement {
  myth: string;
  measurement: string;
  scientificContext: string;
}

export interface Expedition extends BaseEntity {
  slug: string;
  coverImage?: string;
  location?: string;
  locationId?: string;
  year?: string;
  dates?: string;
  researchFocus?: string[];
  leader?: string;
  englishSummary?: string;
  hindiSummary?: string;
  researchActivities?: ResearchActivity[];
  datasets?: Dataset[];
  publications?: Publication[];
  media?: MediaAsset[];
  sources?: SourceRecord[];
  mythVsMeasurement?: MythVsMeasurement[];
  relatedKnowledge?: string[];
  conceptIds?: string[];
  educationalContentIds?: string[];
}

export interface EducationalContent extends BaseEntity {
  targetAudience?: 'Students' | 'Teachers' | 'Everyone' | string;
  language?: 'English' | 'Hindi' | string;
  readingTime?: string;
  category?: string;
  summaryHindi?: string;
  keyTakeaways?: string[];
  conceptIds?: string[];
  expeditionId?: string;
}

/* =========================================================================
   Graph-RAG Response Support & Claim Verification
   ========================================================================= */

export interface ProvenancePath {
  id: string;
  steps: string[]; // E.g. ["Query", "Concept Extraction", "Graph Traversal: Dataset -> Publication", "Context Assembly"]
  description?: string;
}

export interface Claim {
  id: string;
  text: string;
  verificationStatus: 'SOURCE VERIFIED' | 'UNVERIFIED OFFLINE' | 'STALE SOURCE' | 'ARCHIVED COPY AVAILABLE';
  source?: string;
  repository?: string;
  doi?: string;
  landingUrl?: string;
  lastCheckedAt?: string;
  provenancePath?: ProvenancePath;
}

export interface AssistantResponse {
  id: string;
  query: string;
  answer: string;
  claims?: Claim[];
  sources?: SourceRecord[];
  timestamp?: string;
  mode?: 'ONLINE' | 'OFFLINE_DEMO' | 'ERROR';
}

/* =========================================================================
   Search & Analytics
   ========================================================================= */

export interface SearchResult {
  id: string;
  type: 'Expedition' | 'Dataset' | 'Publication' | 'Person' | 'EducationalContent';
  title: string;
  snippet?: string;
  url: string;
  relevanceScore?: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalHits: number;
  timeTakenMs?: number;
  mode?: 'ONLINE' | 'OFFLINE_DEMO' | 'ERROR';
}

export interface LinkHealthResult {
  id: string;
  repository: string;
  url: string;
  status: 'Healthy' | 'Degraded' | 'Offline' | 'Archived';
  lastChecked: string;
  httpCode?: number;
  responseTimeMs?: number;
}

export interface ZeroHitQuery {
  id: string;
  query: string;
  timestamp: string;
  filtersApplied?: Record<string, unknown>;
  suggestedConcepts?: string[];
}
