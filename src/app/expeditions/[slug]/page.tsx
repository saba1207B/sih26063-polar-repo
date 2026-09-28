import { mockExpeditions } from '@/data/mockData';
import ExpeditionDetailClient from './ExpeditionDetailClient';

export function generateStaticParams() {
  const slugs = [
    ...mockExpeditions.map((e) => ({ slug: e.slug })),
    { slug: 'maitri-2023-climate-expedition' },
  ];
  return slugs;
}

export default async function ExpeditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return <ExpeditionDetailClient slug={slug} />;
}
