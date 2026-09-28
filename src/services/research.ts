import { ResearchActivity } from '@/types';
import { fetchFromApi, delay } from './api';
import { mockResearchActivities } from '@/data/mockData'; // we'll need to export mockResearchActivities from mockData if it doesn't exist

export async function getResearchActivities(): Promise<ResearchActivity[]> {
  try {
    return await fetchFromApi<ResearchActivity[]>('/research');
  } catch (err) {
    await delay(300);
    return mockResearchActivities || [];
  }
}

export async function getResearchActivity(id: string): Promise<ResearchActivity | null> {
  try {
    return await fetchFromApi<ResearchActivity>(`/research/${id}`);
  } catch (err) {
    await delay(300);
    const act = (mockResearchActivities || []).find((r) => r.id === id);
    return act || null;
  }
}
