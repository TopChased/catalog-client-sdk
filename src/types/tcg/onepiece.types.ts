import type { SharedTcgCardDetails, SharedTcgSealedDetails } from '../shared.types';

export interface OnePieceCardDetails extends SharedTcgCardDetails {
  type?: string;
  cost?: number;
  power?: number;
}

export interface OnePieceSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type OnePieceDetails = OnePieceCardDetails | OnePieceSealedDetails;
