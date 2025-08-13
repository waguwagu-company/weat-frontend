import axios from 'axios';

import type { MapGeocoderResponse } from '@/types/googlemaps';

export const geocodeAddress = async (latlng: string) => {
  const response = await axios.get<MapGeocoderResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ko&result_type=street_address|sublocality|premise|point_of_interest`
  );

  return response.data.results;
};
