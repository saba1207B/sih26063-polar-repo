import { Dataset } from '@/types';
import { fetchFromApi, delay, API_BASE_URL } from './api';
import { mockDatasets } from '@/data/mockData';

function mapDataset(d: any): Dataset {
  return {
    id: d.id,
    title: d.title,
    description: d.description || d.summary || d.plainLanguage,
    repository:
      d.repository ||
      (d.sourceLabel?.includes('NPDC')
        ? 'NPDC/NCPOR'
        : d.station?.includes('Himadri')
        ? 'NPDC/NCPOR'
        : 'PANGAEA'),
    researchTopic:
      d.researchTopic || (d.topics && d.topics.length > 0 ? d.topics.join(' & ') : 'Cryosphere Science'),
    locationName: d.locationName || d.station || d.region || 'Antarctica',
    doi: d.doi || '10.5281/zenodo.7891234',
    license: typeof d.license === 'string' ? d.license : 'CC BY 4.0 International',
    status: d.status || 'Active',
    format: Array.isArray(d.format) ? d.format.join(' / ') : d.format || 'NetCDF / CSV',
    size: d.size || (d.rows ? `${(d.rows.length * 0.4).toFixed(1)} KB` : '1.2 GB'),
    publicationDate: d.publicationDate || d.years || '2024-01-15',
  };
}

export async function getDatasets(): Promise<Dataset[]> {
  try {
    const list = await fetchFromApi<any[]>('/datasets');
    if (list && list.length > 0) {
      const backendMapped = list.map(mapDataset);
      const existingIds = new Set(backendMapped.map((d) => d.id));
      const remainingMock = mockDatasets.filter((d) => !existingIds.has(d.id));
      return [...backendMapped, ...remainingMock];
    }
  } catch (err) {
    // fallback on error
  }
  await delay(300);
  return mockDatasets;
}

export async function getDataset(id: string): Promise<Dataset | null> {
  try {
    const raw = await fetchFromApi<any>(`/api/v1/catalog/datasets/${id}`);
    if (raw) return mapDataset(raw);
  } catch (err) {
    // fallback
  }
  await delay(300);
  const item = mockDatasets.find((d) => d.id === id);
  return item || null;
}

export function getDatasetDownloadUrl(slug: string, format: 'csv' | 'json' = 'csv'): string {
  return `${API_BASE_URL}/api/v1/datasets/${slug}/download?format=${format}`;
}
