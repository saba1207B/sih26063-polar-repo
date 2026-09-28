import { Publication } from '@/types';
import { fetchFromApi, delay } from './api';
import { mockPublications } from '@/data/mockData';

export function normalizePublication(raw: any): Publication {
  const entityType = raw.entityType || 'publication';
  const id = raw.id || raw.slug || `pub-${Date.now()}`;
  return {
    id,
    title: raw.title || 'Untitled Publication',
    description: raw.summary || raw.description || raw.abstract,
    authors: Array.isArray(raw.authors) ? raw.authors : (raw.authors ? [raw.authors] : []),
    personIds: raw.personIds || [],
    year: typeof raw.year === 'number' ? raw.year : new Date().getFullYear(),
    abstract: raw.abstract || raw.summary || '',
    repository: raw.repository || raw.sourceLabel || 'NCPOR Polar Archive',
    doi: raw.doi || (raw.slug ? `10.5281/zenodo.${raw.slug}` : '10.5281/zenodo.polar.archive'),
    journal: raw.journal || raw.sourceLabel || 'Polar Science Communications',
    relatedExpeditionId: raw.relatedExpeditionId || (Array.isArray(raw.related) ? raw.related.find((r: string) => r.includes('expedition') || r.includes('maitri') || r.includes('bharati')) : undefined),
    researchActivityId: raw.researchActivityId,
    sourceRecordId: raw.sourceRecordId || raw.sourceUrl,
    conceptIds: raw.conceptIds || raw.topics || [],
  };
}

export async function getPublications(): Promise<Publication[]> {
  try {
    const data = await fetchFromApi<any>('/publications');
    const rawList = Array.isArray(data) ? data : (data?.results || data?.items || []);
    if (rawList.length > 0) {
      const liveItems: Publication[] = rawList.map(normalizePublication);
      const existingIds = new Set(liveItems.map((p: Publication) => p.id));
      const combined = [...liveItems];
      for (const m of mockPublications) {
        if (!existingIds.has(m.id)) {
          combined.push(m);
        }
      }
      return combined;
    }
    return mockPublications;
  } catch (err) {
    await delay(200);
    return mockPublications;
  }
}

export async function getPublication(id: string): Promise<Publication | null> {
  try {
    const raw = await fetchFromApi<any>(`/publications/${id}`);
    if (raw && (raw.title || raw.id)) {
      return normalizePublication(raw);
    }
    const item = mockPublications.find((p) => p.id === id || p.title.toLowerCase().includes(id.toLowerCase()));
    return item || null;
  } catch (err) {
    await delay(200);
    const item = mockPublications.find((p) => p.id === id);
    return item || null;
  }
}

