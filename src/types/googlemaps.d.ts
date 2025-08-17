/* eslint-disable no-undef */
/// <reference types="google.maps" />

export type MapState = google.maps.Map;
export type MapOptions = google.maps.MapOptions;
export type MapLatLng = google.maps.LatLngLiteral;
export type MapGeocoderResponse = google.maps.GeocoderResponse;
export type MapGeocodingResult = google.maps.GeocoderResult;
export type MapMouseEvent = google.maps.MapMouseEvent;

interface PlacePrediction extends google.maps.places.PlacePrediction {
  structuredFormat: {
    mainText: {
      text: string;
      matches: [
        {
          startOffset: number;
          endOffset: number;
        },
      ];
    };
    secondaryText: {
      text: string;
    };
  };
}
export type AutocompleteResponse = { suggestions: { placePrediction: PlacePrediction }[] };
export type AutocompleteRequest = google.maps.places.AutocompleteRequest;
