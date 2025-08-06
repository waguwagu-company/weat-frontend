'use client';

import { useRef, useState, useEffect } from 'react';
import { LoadScriptNext, GoogleMap, MarkerF } from '@react-google-maps/api';
import { LoaderCircle } from 'lucide-react';
import MapGPS from '@/assets/images/button-map-gps.svg';

import type { CSSProperties } from 'react';
import type { GoogleMapProps } from '@react-google-maps/api';

type MapPosition = Pick<GoogleMapProps, 'center'>['center'];
type MapOptions = Pick<GoogleMapProps, 'options'>['options'];
type MapState = Pick<GoogleMap, 'state'>['state']['map'];

const mapContainerStyle: CSSProperties = {
  width: '100%',
  height: 'inherit',
};

const defaultPosition: MapPosition = {
  lat: 37.564,
  lng: 127.002,
};

const defaultZoom: number = 15;

const mapOptions: MapOptions = {
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
};

export default function Map() {
  const mapRef = useRef<MapState>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<MapPosition>(defaultPosition);
  const [markerPosition, setMarkerPosition] = useState<MapPosition>(defaultPosition);

  const onMapLoad = (map: MapState) => {
    mapRef.current = map;
    setIsLoaded(true);
  };

  const onMapUnmount = () => {
    mapRef.current = null;
    setIsLoaded(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng: MapPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(latLng);
        setMarkerPosition(latLng);
      },
      (error) => {
        console.warn('Geolocation error:', error);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <>
        {!isLoaded && <LoaderCircle className="animate-spin text-muted-medium cursor-progress" />}
        <button
          type="button"
          className="absolute top-6 right-5 z-1 cursor-pointer"
          onClick={getCurrentLocation}
        >
          <MapGPS width="48" height="49" />
        </button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || defaultPosition}
          zoom={defaultZoom}
          options={mapOptions}
          onLoad={onMapLoad}
          onClick={(e) => setMarkerPosition(e.latLng || defaultPosition)}
          onUnmount={onMapUnmount}
        >
          {markerPosition && (
            <MarkerF position={markerPosition} icon={{ url: '/images/map-marker.svg' }} />
          )}
        </GoogleMap>
      </>
    </LoadScriptNext>
  );
}
