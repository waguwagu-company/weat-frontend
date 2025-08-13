'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LoadScriptNext, GoogleMap, MarkerF } from '@react-google-maps/api';
import { toast } from 'sonner';
import { useGroupStore, useAnalysisStore } from '@/stores';
import { useGeocoding } from '@/hooks/useLocation';
import { DEFAULT_POSITION } from '@/constants/location';

import LoadingSpinner from '@/components/LoadingSpinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import MapGPS from '@/assets/images/button-map-gps.svg';

import type { CSSProperties } from 'react';
import type { MapState, MapOptions, MapLatLng } from '@/types/googlemaps';

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
  const { isSingle } = useGroupStore();
  const { setLocation } = useAnalysisStore();

  const mapRef = useRef<MapState>(null);
  const [currentPosition, setCurrentPosition] = useState<MapLatLng>(DEFAULT_POSITION);
  const [markerPosition, setMarkerPosition] = useState<MapLatLng>(DEFAULT_POSITION);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const {
    data: geocodingData,
    isSuccess: isSuccessGeocoding,
    refetch: refetchGeocoding,
  } = useGeocoding(markerPosition);

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
        const latLng: MapLatLng = {
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

  useEffect(() => {
    if (isSuccessGeocoding && geocodingData.length) {
      setOpenAlert(true);

      if (isSingle) {
        toast('반경 1km 이내의 가게들만 검색돼요.', {
          duration: 3000,
          style: { marginBottom: '220px' },
        });
      }
    }
  }, [isSuccessGeocoding, geocodingData?.length]);

  return (
    <>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        loadingElement={<LoadingSpinner />}
      >
        <>
          <button
            type="button"
            className="absolute top-6 right-4 z-1 cursor-pointer hover:scale-110 transition ease-in-out duration-300"
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
            onClick={(e) => {
              setMarkerPosition(
                !e.latLng ? DEFAULT_POSITION : { lat: e.latLng?.lat(), lng: e.latLng?.lng() }
              );
            }}
            onUnmount={onMapUnmount}
          >
            {markerPosition && (
              <MarkerF position={markerPosition} icon={{ url: '/images/map-marker.svg' }} />
            )}
          </GoogleMap>
        </>
      </LoadScriptNext>

      <AlertDialog open={openAlert}>
        <AlertDialogTrigger asChild>
          <Button
            variant="primary"
            size="round"
            className="absolute bottom-15 left-[calc(200px-36px)] z-1"
            onClick={() => refetchGeocoding()}
          >
            OK
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isSingle ? '이 위치가 맞을까요?' : '나의 출발 위치'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {geocodingData || Object.values(markerPosition).join(', ')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>취소</AlertDialogCancel>
            <AlertDialogAction onClick={savePosition}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
