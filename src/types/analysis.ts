import type { Category, Tag } from '@/types/category';

export type LocationSetting = {
  xPosition: number;
  yPosition: number;
};

export type CategorySetting = Pick<Category, 'categoryId'> &
  Pick<Tag, 'categoryTagId'> & { isPreferred: boolean };

export interface AnalysisSettings {
  memberId: number;
  locationSetting: LocationSetting;
  categorySettingList: CategorySetting[];
  textInputSetting: { inputText: string };
}

interface AnalysisBasis {
  analysisBasisType: string;
  analysisBasisContent: string;
}

interface PlaceImage {
  imageUrl: string;
}

export interface PlaceResult {
  placeId: number;
  placeName: string;
  placeAddress: string;
  analysisResultContent: string;
  analysisBasisList: AnalysisBasis[];
  placeImageList: PlaceImage[];
}
