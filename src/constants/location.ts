import type { MapLatLng } from '@/types/googlemaps';
import type { LocationSetting } from '@/types/analysis';

export const DEFAULT_POSITION: MapLatLng = {
  lat: 37.566571,
  lng: 126.9776507,
} as const;

export const DEFAULT_LOCATION: LocationSetting = {
  roadnameAddress: '',
  xPosition: 0,
  yPosition: 0,
} as const;

export const FALLBACK_LOCATION: LocationSetting = {
  roadnameAddress: '서울특별시 중구 세종대로 110',
  xPosition: DEFAULT_POSITION.lat,
  yPosition: DEFAULT_POSITION.lng,
} as const;
