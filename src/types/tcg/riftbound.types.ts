import type { CardVariant, SharedTcgCardDetails, SharedTcgSealedDetails } from '../shared.types';

// ============ RIFTBOUND DETAILS ============

export type RiftboundCardType = 'Battlefield' | 'Gear' | 'Legend' | 'Rune' | 'Spell' | 'Unit';
export type RiftboundCardSuperType = 'Basic' | 'Champion' | 'Signature' | 'Token';
export type RiftboundCardDomain = 'Body' | 'Calm' | 'Chaos' | 'Colorless' | 'Fury' | 'Mind' | 'Order';
export type RiftboundCardRarity = 'Common' | 'Epic' | 'Promo' | 'Rare' | 'Showcase' | 'Uncommon';

export interface RiftboundCardVariant extends CardVariant {
  // todo: add foil (need to determine source for foil such as holo and normal)
  // note: if all of these are false then it is normal variant
  alternateArt: boolean;
  overnumbered: boolean;
  signature: boolean;
}

export interface RiftboundCardDetails extends SharedTcgCardDetails {
  riftboundId: string;
  attributes?: {
    energy?: number | null;
    might?: number | null;
    power?: number | null;
  };
  cardType: RiftboundCardType;
  superType?: RiftboundCardSuperType;
  domain: RiftboundCardDomain[];
  text?: {
    rich?: string;
    plain?: string;
    flavour?: string | null;
  };
  tags?: string[];
  orientation?: string;
  variants_detailed?: RiftboundCardVariant[];
}

export interface RiftboundSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type RiftboundDetails = RiftboundCardDetails | RiftboundSealedDetails;
