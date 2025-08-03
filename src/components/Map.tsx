'use client';

import { LoadScriptNext, GoogleMap, Marker } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultPosition: google.maps.LatLngLiteral = {
  lat: 37.564,
  lng: 127.002,
};

const defaultZoom = 15;

const mapOptions: google.maps.MapOptions = {
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
};

export default function Map() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral>(defaultPosition);

  const onMapLoad = (map: google.maps.Map) => {
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
