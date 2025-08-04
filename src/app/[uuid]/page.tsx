'use client';

import { useParams } from 'next/navigation';

export default function Meeting() {
  const params = useParams<{ uuid: string }>();

  return <main>{params.uuid}</main>;
}
