import { MediaAsset } from '@/types';
import { fetchFromApi, delay } from './api';

// mockMedia isn't exported directly in mockData.ts right now, so we will extract it from mockExpeditions or create a mock.
import { mockExpeditions } from '@/data/mockData';

export async function getMediaAssets(): Promise<MediaAsset[]> {
  try {
    return await fetchFromApi<MediaAsset[]>('/media');
  } catch (err) {
    await delay(300);
    // Combine media from all expeditions
    const allMedia = mockExpeditions.flatMap((e) => e.media || []);
    return allMedia;
  }
}
