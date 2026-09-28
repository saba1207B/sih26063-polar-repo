import { ZeroHitQuery } from '@/types';
import { fetchFromApi, delay } from './api';

export async function getZeroHitAnalytics(): Promise<ZeroHitQuery[]> {
  try {
    return await fetchFromApi<ZeroHitQuery[]>('/analytics/zero-hits');
  } catch (err) {
    await delay(300);
    return [
      {
        id: 'zh-1',
        query: 'penguin population genetics 1990',
        timestamp: new Date().toISOString(),
        suggestedConcepts: ['Biology', 'Ecology']
      },
      {
        id: 'zh-2',
        query: 'ross ice shelf core drilling logs',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        suggestedConcepts: ['Glaciology']
      }
    ];
  }
}
