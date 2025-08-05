'use client';

import { useParams } from 'next/navigation';

export default function MeetingPage() {
  const params = useParams<{ uuid: string }>();

  return <section>{params.uuid}</section>;
}
