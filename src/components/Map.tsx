'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LoadScriptNext, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useAnalysisStore } from '@/stores';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import MapGPS from '@/assets/images/button-map-gps.svg';
import { DEFAULT_POSITION } from '@/constants/location';

import type { CSSProperties } from 'react';
import type { MapState, MapPosition, MapOptions } from '@/types/location';

const mapContainerStyle: CSSProperties = {
  width: '100%',
  height: 'inherit',
};

const defaultZoom: number = 15;

const mapOptions: MapOptions = {
  cameraControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
};

export default function Map() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { setLocation } = useAnalysisStore();

  const mapRef = useRef<MapState>(null);
  const [currentPosition, setCurrentPosition] = useState<MapPosition>(DEFAULT_POSITION);
  const [markerPosition, setMarkerPosition] = useState<MapPosition>(DEFAULT_POSITION);

  const onMapLoad = (map: MapState) => {
    mapRef.current = map;
  };

  const onMapUnmount = () => {
    mapRef.current = null;
  };

  const getCurrent = () => {
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

  const savePosition = () => {
    setLocation(markerPosition);
    router.push(`/${params.id}/like`);
  };

  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      loadingElement={<Loading />}
    >
      <>
        <button
          type="button"
          className="absolute top-6 right-4 z-1 cursor-pointer"
          onClick={getCurrent}
        >
          <MapGPS width="48" height="49" />
        </button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentPosition || DEFAULT_POSITION}
          zoom={defaultZoom}
          options={mapOptions}
          onLoad={onMapLoad}
          onClick={(e) => setMarkerPosition(e.latLng || DEFAULT_POSITION)}
          onUnmount={onMapUnmount}
        >
          {markerPosition && (
            <MarkerF position={markerPosition} icon={{ url: '/images/map-marker.svg' }} />
          )}
        </GoogleMap>
        <Button
          variant="primary"
          size="round"
          className="absolute bottom-15 left-[calc(200px-36px)] z-1"
          onClick={savePosition}
        >
          OK
        </Button>
      </>
    </LoadScriptNext>
  );
}
