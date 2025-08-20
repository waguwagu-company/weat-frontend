import { ANALYSIS_STATUS } from '@/constants/analysis';

import type { CategoryTag } from '@/types/category';

export type AnalysisStatus = (typeof ANALYSIS_STATUS)[keyof typeof ANALYSIS_STATUS];

export type LocationSetting = {
  roadnameAddress: string;
  xPosition?: number;
  yPosition?: number;
};

export type CategorySetting = Pick<CategoryTag, 'categoryTagId'> & { isPreferred: boolean };

export interface AnalysisSettings {
  memberId: number;
  locationSetting: LocationSetting;
  categorySettingList: CategorySetting[];
  textInputSetting: { inputText: string };
}

export interface PlaceResult {
  analysisResultDetailId: number;
  placeId: number;
  placeName: string;
  placeAddress: string;
  placeUrl: string;
  keywordList: string[];
  analysisBasisType: string;
  analysisBasisContent: string;
  analysisScore: number;
  imageUrl: string;
}
