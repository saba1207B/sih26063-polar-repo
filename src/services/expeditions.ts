import { Expedition } from '@/types';
import { fetchFromApi, delay } from './api';
import { mockExpeditions } from '@/data/mockData';

export async function getExpeditions(): Promise<Expedition[]> {
  try {
    const list = await fetchFromApi<any[]>('/expeditions');
    if (list && list.length > 0) {
      const backendMapped: Expedition[] = list.map((e) => ({
        id: e.id,
        slug: e.slug,
        title: e.title,
        description: e.summary || e.description || e.plainLanguageSummary,
        coverImage: e.coverImage || '/images/polar-station.jpg',
        location: e.region || 'Antarctica',
        year: String(e.year || '2023'),
        dates: e.dates || 'Summer Observation Window',
        leader: e.leader || 'Dr. M. Javed Beg (NCPOR)',
        researchFocus: e.researchFocus || ['Glaciology', 'Atmospheric Science', 'Carbon Monitoring'],
      }));
      const existingSlugs = new Set(backendMapped.map((e) => e.slug));
      const remainingMock = mockExpeditions.filter((m) => !existingSlugs.has(m.slug));
      return [...backendMapped, ...remainingMock];
    }
    return mockExpeditions;
  } catch (err) {
    await delay(300);
    return mockExpeditions;
  }
}

export async function getExpedition(slug: string): Promise<Expedition | null> {
  try {
    const raw = await fetchFromApi<any>(`/expeditions/${slug}`);
    if (!raw) return null;
    return {
      id: raw.id,
      title: raw.title,
      slug: raw.slug,
      description: raw.description || raw.plainLanguageSummary || raw.summary,
      coverImage: raw.coverImage || '/images/polar-station.jpg',
      location: raw.location || 'Maitri Station, Antarctica',
      year: String(raw.year || '2023'),
      dates: raw.dates || 'December 2022 – April 2023',
      leader: raw.leader || 'Dr. M. Javed Beg (NCPOR)',
      englishSummary: raw.englishSummary || raw.plainLanguageSummary,
      hindiSummary: raw.hindiSummary,
      researchActivities: raw.researchActivities || raw.research || [],
      datasets: raw.datasets || [],
      publications: raw.publications || [],
      media: raw.media || [],
      sources: raw.sources || [],
      mythVsMeasurement: raw.mythVsMeasurement || (raw.myths || []).map((m: any) => ({
        myth: m.claim || m.myth,
        measurement: m.rebuttal || m.measurement,
        scientificContext: m.concept || m.scientificContext,
      })),
    };
  } catch (err) {
    await delay(300);
    const exp = mockExpeditions.find((e) => e.slug === slug);
    return exp || null;
  }
}
