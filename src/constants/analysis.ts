export const ANALYSIS_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export const BASIS_TYPE = {
  REVIEW: 'REVIEW',
} as const;

export const LOADING_TEXT: string[] = [
  '당신의 위치를 반영 중이에요...',
  '당신의 취향을 반영 중이에요...',
  'Google Map 리뷰를 분석 중이에요...',
  'CLOVA가 진정한 맛집을 고민 중이에요...',
] as const;
