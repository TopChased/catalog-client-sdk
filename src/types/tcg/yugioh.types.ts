import type { SharedTcgCardDetails, SharedTcgSealedDetails } from '../shared.types';

export interface YugiohCardDetails extends SharedTcgCardDetails {
  cardType: 'spell' | 'trap' | 'monster';
  elementType?: string;
  attribute?: string;
  level?: number;
  atk?: number;
  def?: number;
  archetype?: string;
  rarityCode?: string;
}

export interface YugiohSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type YugiohDetails = YugiohCardDetails | YugiohSealedDetails;
