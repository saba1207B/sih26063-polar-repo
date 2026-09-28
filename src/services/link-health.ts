import { LinkHealthResult } from '@/types';
import { fetchFromApi, delay } from './api';

function mapLinkHealth(items: any[]): LinkHealthResult[] {
  return items.map((item, idx) => {
    let status: 'Healthy' | 'Degraded' | 'Offline' | 'Archived' = 'Healthy';
    if (item.status === 'ok') status = 'Healthy';
    else if (item.status === 'stale') status = 'Degraded';
    else if (item.status === 'archived-copy-available') status = 'Archived';
    else if (item.status === 'unverified-offline') status = 'Offline';

    return {
      id: item.id || `lh-${idx + 1}`,
      repository: item.label || item.repository || 'Polar Repository',
      url: item.url,
      status,
      lastChecked: item.lastCheckedAt || item.lastChecked || new Date().toISOString(),
      httpCode: item.httpCode || (status === 'Healthy' ? 200 : status === 'Degraded' ? 503 : 0),
      responseTimeMs: item.responseTimeMs || (status === 'Healthy' ? 120 + idx * 25 : 3400),
    };
  });
}

export async function getLinkHealth(): Promise<LinkHealthResult[]> {
  try {
    const raw = await fetchFromApi<any[]>('/link-health');
    if (raw && raw.length > 0) {
      return mapLinkHealth(raw);
    }
  } catch (err) {
    // fallback to mock on network error
  }
  await delay(400);
  return [
    {
      id: 'lh-1',
      repository: 'National Polar Data Center',
      url: 'https://npdc.ncpor.res.in/',
      status: 'Healthy',
      lastChecked: new Date().toISOString(),
      httpCode: 200,
      responseTimeMs: 145,
    },
    {
      id: 'lh-2',
      repository: 'PANGAEA Data Publisher',
      url: 'https://www.pangaea.de/',
      status: 'Healthy',
      lastChecked: new Date().toISOString(),
      httpCode: 200,
      responseTimeMs: 230,
    },
    {
      id: 'lh-3',
      repository: 'Australian Antarctic Data Centre',
      url: 'https://data.aad.gov.au/',
      status: 'Offline',
      lastChecked: new Date().toISOString(),
      httpCode: 0,
      responseTimeMs: 3500,
    },
    {
      id: 'lh-4',
      repository: 'Illustrative Retired NPDC Record',
      url: 'https://npdc.ncpor.res.in/old-record-demo',
      status: 'Archived',
      lastChecked: new Date().toISOString(),
      httpCode: 200,
      responseTimeMs: 110,
    },
  ];
}

export async function triggerLiveLinkCheck(): Promise<LinkHealthResult[]> {
  const raw = await fetchFromApi<any[]>('/link-health/check', { method: 'POST' });
  return mapLinkHealth(raw);
}
