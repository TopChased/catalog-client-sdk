// ============ SOURCE ============

export interface Source {
  provider: 'tcgdex' | 'riftcodex' | 'igdb' | 'manual' | 'csv' | 'other';
  externalId?: string;
  lastSyncedAt?: string;
}

// ============ TCG DETAILS ============

export interface SharedTcgCardDetails {
  setName: string;
  setCode: string;
  cardNumber: string;
  cardSetNumber: number;
  setOfficialCards: string;
  rarity: string;
  finish?: string;
  language: string;
  firstEdition?: boolean;
  illustrator?: string;
  releaseDate?: string;
  character?: string[];
}

export interface SharedTcgSealedDetails {
  sealedType: string;
  setName?: string;
  setCode?: string;
  contentsDescription?: string;
  upcSerial?: number;
}

export interface TcgPlayerSku {
  skuId: number;
  condition: 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';
  variant: string;
}

export interface TcgPlayerThirdParty {
  id: number;
  skus: TcgPlayerSku[];
}

// ============ CARD VARIANTS ============

/**
 * Base contract shared by every brand's card variant. Brand-specific variants
 * live in `types/tcg/<brand>.types.ts` and extend this.
 */
export interface CardVariant {
  thirdParty?: {
    cardmarket?: number;
    tcgplayer?: TcgPlayerThirdParty;
  };
}
