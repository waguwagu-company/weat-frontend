import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { MapGeocodingResult } from '@/types/googlemaps';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRoadNameAddress(result: MapGeocodingResult) {
  const components = result.address_components;
  const parts = components
    .filter(
      (comp) =>
        !comp.types.includes('country') && // 국가 제외
        !comp.types.includes('postal_code') // 우편번호 제외
    )
    .map((comp) => comp.long_name);

  return parts.reverse().join(' ');
}
