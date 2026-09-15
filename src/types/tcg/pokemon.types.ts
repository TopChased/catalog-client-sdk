import type { CardVariant, SharedTcgCardDetails, SharedTcgSealedDetails } from '../shared.types';

export interface PokemonCardVariant extends CardVariant {
  type: string;
  subtype?: string;
  size?: 'standard' | 'jumbo';
  stamp?: string[];
  foil?: string;
  variantId?: string;
}

export interface PokemonCardDetails extends SharedTcgCardDetails {
  series: string;
  cardSetNumber: number;
  cardType: 'energy' | 'trainer' | 'pokemon';
  variants_detailed?: PokemonCardVariant[];
  category: string;
  pokedex?: number[];
  pokedexSort?: number;
  illustrator?: string;
  hp?: number;
  energyType?: string; // Fire, Water, etc.
  evolveFrom?: string;
}

export interface PokemonSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type PokemonDetails = PokemonCardDetails | PokemonSealedDetails;
