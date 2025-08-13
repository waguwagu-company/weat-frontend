import { useQuery } from '@tanstack/react-query';
import { geocodeAddress } from '@/lib/api/location';
import { getRoadNameAddress } from '@/lib/utils';

import type { MapLatLng } from '@/types/googlemaps';

export const useGeocoding = (position: MapLatLng) => {
  const latlng: string = Object.values(position).join(',');

  return useQuery({
    queryKey: ['geocodeAddress', latlng],
    queryFn: () => geocodeAddress(latlng),
    select: (data) => {
      return getRoadNameAddress(data[0]);
    },
    enabled: false,
    staleTime: 0,
  });
};
