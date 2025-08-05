'use client';

import { useRef, useState, useEffect } from 'react';
import { LoadScriptNext, GoogleMap, Marker } from '@react-google-maps/api';

import type { CSSProperties } from 'react';
import type { GoogleMapProps } from '@react-google-maps/api';

type MapPosition = Pick<GoogleMapProps, 'center'>['center'];
type MapOptions = Pick<GoogleMapProps, 'options'>['options'];
type MapState = Pick<GoogleMap, 'state'>['state']['map'];

const mapContainerStyle: CSSProperties = {
  width: '100%',
  height: '100vh',
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

  const onMapLoad = (map: MapState) => {
    mapRef.current = map;
    setIsLoaded(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <>
        {!isLoaded && <div>Loading Map...</div>}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || defaultPosition}
          zoom={defaultZoom}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {currentPosition && <Marker position={currentPosition} />}
        </GoogleMap>
      </>
    </LoadScriptNext>
  );
}
