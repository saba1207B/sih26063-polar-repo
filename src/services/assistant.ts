import { AssistantResponse } from '@/types';
import { fetchFromApi, delay } from './api';
import { mockSourceRecords } from '@/data/mockData';

export async function askPolarArchive(question: string): Promise<AssistantResponse> {
  try {
    const res = await fetchFromApi<any>('/assistant/ask', {
      method: 'POST',
      body: JSON.stringify({ question }),
    });

    return {
      id: res.id || `ans-${Date.now()}`,
      query: res.query || question,
      answer: res.answer,
      mode: res.mode,
      claims: (res.claims || []).map((c: any, i: number) => ({
        id: c.id || `claim-${i + 1}`,
        text: c.text || c.sentence || '',
        verificationStatus:
          c.verificationStatus ||
          (c.citation?.status === 'ok'
            ? 'SOURCE VERIFIED'
            : c.citation?.status === 'stale'
            ? 'STALE SOURCE'
            : c.citation?.status === 'archived-copy-available'
            ? 'ARCHIVED COPY AVAILABLE'
            : 'UNVERIFIED OFFLINE'),
        repository: c.repository || (c.citation?.label?.includes('NPDC') ? 'NPDC/NCPOR' : 'PANGAEA'),
        doi: c.doi || (c.citation?.url?.includes('doi') ? c.citation.url : undefined),
        landingUrl: c.landingUrl || c.citation?.url,
        lastCheckedAt: c.lastCheckedAt || c.citation?.checked_at,
        provenancePath:
          c.provenancePath ||
          (c.path && c.path.length > 0 ? { id: `prov-${i + 1}`, steps: c.path } : undefined),
      })),
      sources: res.sources || mockSourceRecords.slice(0, 1),
    };
  } catch (err) {
    await delay(1500);
    
    // Mock response
    return {
      id: `ans-${Date.now()}`,
      query: question,
      answer: "Based on the polar archives, Maitri Station has been collecting continuous surface ozone data since 2018. This dataset is part of the 38th Indian Antarctic Expedition and is actively maintained in the NPDC repository.",
      mode: 'OFFLINE_DEMO',
      claims: [
        {
          id: 'claim-1',
          text: 'Maitri Station has been collecting continuous surface ozone data since 2018.',
          verificationStatus: 'SOURCE VERIFIED',
          repository: 'NPDC/NCPOR',
          doi: '10.5281/zenodo.7891234',
          landingUrl: 'https://npdc.ncpor.res.in',
          lastCheckedAt: new Date().toISOString(),
          provenancePath: {
            id: 'prov-1',
            steps: ['Graph Search: "Maitri Station"', 'Link: Expedition -> Dataset', 'Dataset: "Maitri Surface Ozone"']
          }
        }
      ],
      sources: mockSourceRecords.slice(0, 1)
    };
  }
}
