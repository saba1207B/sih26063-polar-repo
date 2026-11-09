/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

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
