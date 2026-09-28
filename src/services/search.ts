import { SearchResponse } from '@/types';
import { fetchFromApi, delay } from './api';
import { mockDatasets, mockExpeditions, mockPublications } from '@/data/mockData';

export async function searchKnowledge(query: string, filters?: Record<string, unknown>): Promise<SearchResponse> {
  const startTime = Date.now();
  try {
    const searchParams = new URLSearchParams({ q: query });
    if (filters) {
      if (typeof filters.type === 'string') {
        searchParams.append('entity_type', filters.type);
      }
      if (typeof filters.topic === 'string') {
        searchParams.append('topic', filters.topic);
      }
    }
    const raw = await fetchFromApi<any>(`/search?${searchParams.toString()}`);
    if (raw && Array.isArray(raw.results)) {
      const results = raw.results.map((item: any) => {
        const rawType = item.type || item.entityType || 'Record';
        const type = rawType.charAt(0).toUpperCase() + rawType.slice(1);
        const slug = item.slug || item.id;
        let url = item.url;
        if (!url) {
          if (type.toLowerCase() === 'expedition') url = `/expeditions/${slug}`;
          else if (type.toLowerCase() === 'dataset') url = `/datasets/${slug}`;
          else if (type.toLowerCase() === 'publication') url = `/publications/${slug}`;
          else url = `/explore`;
        }
        return {
          id: item.id || slug,
          type,
          title: item.title || 'Untitled Result',
          snippet: item.snippet || item.summary || item.abstract || '',
          url,
          relevanceScore: typeof item.relevanceScore === 'number' ? item.relevanceScore : (item.relevance || 1.0),
        };
      });

      return {
        query,
        results,
        totalHits: raw.totalHits ?? raw.count ?? results.length,
        timeTakenMs: Date.now() - startTime,
        mode: 'ONLINE',
      };
    }
    throw new Error('Invalid backend search response structure');
  } catch (err) {
    await delay(300);
    
    // Offline demo fallback
    const lowerQuery = query.toLowerCase();
    
    const dMatches = mockDatasets
      .filter((d) => d.title.toLowerCase().includes(lowerQuery) || d.description?.toLowerCase().includes(lowerQuery))
      .map(d => ({ id: d.id, type: 'Dataset' as const, title: d.title, snippet: d.description, url: `/datasets/${d.id}` }));
      
    const pMatches = mockPublications
      .filter((p) => p.title.toLowerCase().includes(lowerQuery))
      .map(p => ({ id: p.id, type: 'Publication' as const, title: p.title, snippet: p.abstract, url: `/publications/${p.id}` }));
      
    const eMatches = mockExpeditions
      .filter((e) => e.title.toLowerCase().includes(lowerQuery))
      .map(e => ({ id: e.id, type: 'Expedition' as const, title: e.title, snippet: e.description, url: `/expeditions/${e.slug}` }));

    const results = [...eMatches, ...dMatches, ...pMatches];
    
    return {
      query,
      results,
      totalHits: results.length,
      timeTakenMs: Date.now() - startTime,
      mode: 'OFFLINE_DEMO',
    };
  }
}
