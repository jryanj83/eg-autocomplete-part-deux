'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { UserData } from "@/app/types";
import Loading from '@/components/loading/loading';

const AddressLookupSection = dynamic(() => import("./address-lookup-section"), {
  ssr: false,
  loading: () => <Loading />
});

export default function AddressLookupWrapper({ initialData }: { initialData: UserData[] }) {
  return (
    <Suspense fallback={<Loading />}>
      <AddressLookupSection initialData={initialData} />
    </Suspense>
  );
} 