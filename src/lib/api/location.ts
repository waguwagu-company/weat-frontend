import axios from 'axios';

import type {
  MapGeocoderResponse,
  AutocompleteRequest,
  AutocompleteResponse,
} from '@/types/googlemaps';

/** Google Geocoding API - 역 지오코딩 */
export const geocodeAddress = async (latlng: string) => {
  const response = await axios.get<MapGeocoderResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ko&result_type=street_address|sublocality|premise|point_of_interest`
  );

  return response.data.results;
};

/** Google Places API - 자동 완성 */
export const autocompletePlace = async (query: string) => {
  const request: AutocompleteRequest = {
    input: query,
    includedRegionCodes: ['kr'],
  };

  const response = await axios.post<AutocompleteResponse>(
    `https://places.googleapis.com/v1/places:autocomplete`,
    request,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'ko',
        'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    }
  );

  return response.data.suggestions;
};
