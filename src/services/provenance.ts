import { ProvenancePath } from '@/types';
import { fetchFromApi, delay } from './api';

export async function getProvenance(answerId: string): Promise<ProvenancePath | null> {
  try {
    return await fetchFromApi<ProvenancePath>(`/provenance/${answerId}`);
  } catch (err) {
    await delay(400);
    return {
      id: `prov-${answerId}`,
      steps: [
        'Query parsed for intent',
        'Graph Traversal: matched Concept to Dataset',
        'Graph Traversal: matched Dataset to ResearchActivity',
        'Source validation checked'
      ],
      description: 'Mock provenance trace for OFFLINE_DEMO mode'
    };
  }
}
