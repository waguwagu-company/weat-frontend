import type { GoogleMap, GoogleMapProps } from '@react-google-maps/api';

export type MapPosition = Pick<GoogleMapProps, 'center'>['center'];

export type MapOptions = Pick<GoogleMapProps, 'options'>['options'];

export type MapState = Pick<GoogleMap, 'state'>['state']['map'];
