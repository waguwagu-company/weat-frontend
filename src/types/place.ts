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
