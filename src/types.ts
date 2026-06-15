// ============ ENUMS & LITERAL TYPES ============

/** Supported catalog categories */
export type Category = 'tcg' | 'video_game' | 'video_game_consoles';

/** Supported TCG brands */
export type TcgBrand = 'pokemon' | 'yugioh' | 'one_piece' | 'riftbound';

/** Supported TCG product types */
export type TcgProductType = 'card' | 'sealed_product';

/** Supported language codes for filtering catalog items */
/*
  en: "English",
  ja: "Japanese",
  'np': 'French',
  "zh-TW": "Traditional Chinese",
  "zh-CN": "Simplified Chinese",
  fr: "French",
  de: "German",
  es: "Spanish",
  "es-mx": "Spanish (Mexico)",
  it: "Italian",
  ko: "Korean",
  th: 'Thai',
  nl: 'Dutch',
  id: 'Indonesian',
  pl: 'Polish',
  pt: "Portguese",
  "pt-br": 'Portugese (Brazil)',
  "pt-pt": 'Portugese (Portgual)',
  ru: "Russian"
*/
export const SUPPORTED_LANGUAGE_CODES = [
  'en', 'ja', 'np', 'zh-TW', 'zh-CN', 'fr', 'de', 'es', 'es-mx',
  'it', 'ko', 'th', 'nl', 'id', 'pl', 'pt', 'pt-br', 'pt-pt', 'ru'
] as const;

/** A supported language code */
export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGE_CODES[number];

/** Sort options for search results */
export type SortBy = 'relevance' | 'title' | 'createdAt' | 'cardNumber' | 'pokedex' | 'illustrator' | 'rarity';

/** Sort order */
export type SortOrder = 'asc' | 'desc';

/** Context **/
export enum Context {
  Browser = 'browser',
  Server = 'server',
}

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
  setOfficialCards: string;
  rarity: string;
  finish?: 'regular' | 'holo' | 'metal' | 'textured';
  language: string;
  firstEdition?: boolean;
  illustrator?: string;
  character?: string[];
}

export interface SharedTcgSealedDetails {
  sealedType: string;
  setName?: string;
  setCode?: string;
  contentsDescription?: string;
  upcSerial?: number;
}

export interface PokemonCardVariant {
  type: string;
  subtype?: string;
  size?: 'standard' | 'jumbo';
  stamp?: string[];
  foil?: string;
  thirdParty?: {
    cardmarket?: number;
    tcgplayer?: number;
  };
  variantId?: string;
}

export interface PokemonCardDetails extends SharedTcgCardDetails {
  cardType: 'energy' | 'trainer' | 'pokemon';
  variants_detailed?: PokemonCardVariant[];
  category: string;
  pokedex?: number[];
  illustrator?: string;
  hp?: number;
  energyType?: string; // Fire, Water, etc.
  evolveFrom?: string;
}

export interface PokemonSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

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

export interface OnePieceCardDetails extends SharedTcgCardDetails {
  type?: string;
  cost?: number;
  power?: number;
}

export interface OnePieceSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

// ============ RIFTBOUND DETAILS ============

export type RiftboundCardType = 'Battlefield' | 'Gear' | 'Legend' | 'Rune' | 'Spell' | 'Unit';
export type RiftboundCardSuperType = 'Basic' | 'Champion' | 'Signature' | 'Token';
export type RiftboundCardDomain = 'Body' | 'Calm' | 'Chaos' | 'Colorless' | 'Fury' | 'Mind' | 'Order';
export type RiftboundCardRarity = 'Common' | 'Epic' | 'Promo' | 'Rare' | 'Showcase' | 'Uncommon';

export interface RiftboundCardVariant {
  alternateArt: boolean;
  overnumbered: boolean;
  signature: boolean;
  thirdParty?: {
    tcgplayer?: number;
  };
}

export interface RiftboundCardDetails extends SharedTcgCardDetails {
  riftboundId: string;
  setCardNumber: number;
  attributes?: {
    energy?: number | null;
    might?: number | null;
    power?: number | null;
  };
  classification?: {
    type: RiftboundCardType;
    supertype?: RiftboundCardSuperType;
    rarity: RiftboundCardRarity;
    domain: RiftboundCardDomain[];
  };
  text?: {
    rich?: string;
    plain?: string;
    flavour?: string | null;
  };
  tags?: string[];
  orientation?: string;
  variants_detailed?: RiftboundCardVariant[];
  releaseDate?: string;
}

export interface RiftboundSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type PokemonDetails = PokemonCardDetails | PokemonSealedDetails;
export type YugiohDetails = YugiohCardDetails | YugiohSealedDetails;
export type OnePieceDetails = OnePieceCardDetails | OnePieceSealedDetails;
export type RiftboundDetails = RiftboundCardDetails | RiftboundSealedDetails;
export type TcgDetails = PokemonDetails | YugiohDetails | OnePieceDetails | RiftboundDetails;

// ============ VIDEO GAME & CONSOLE DETAILS ============

export interface VideoGameDetails {
  edition?: string;
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  region?: string;
  genre?: string[];
  esrbRating?: string;
}

export interface ConsoleDetails {
  model?: string;
  storage?: string;
  color?: string;
  region?: string;
  releaseDate?: string;
  manufacturer?: string;
}

// ============ BASE CATALOG ITEM ============

export interface ImageUrls {
  high?: string;
  low?: string;
}

export interface BaseCatalogItem {
  _id: string;
  publicId: string;
  title: string;
  normalizedTitle: string;
  slug: string;
  category: Category;
  imageUrl?: ImageUrls;
  searchText: string[];
  source: Source;
  createdAt: string;
  updatedAt: string;
  localizedTitles?: Record<string, string>;
}

// ============ BRAND-SPECIFIC CATALOG ITEMS ============

export interface PokemonCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'pokemon';
  productType: TcgProductType;
  details: PokemonDetails;
}

export interface YugiohCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'yugioh';
  productType: TcgProductType;
  details: YugiohDetails;
}

export interface OnePieceCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'one_piece';
  productType: TcgProductType;
  details: OnePieceDetails;
}

export interface RiftboundCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'riftbound';
  productType: TcgProductType;
  details: RiftboundDetails;
}

export interface VideoGameCatalogItem extends BaseCatalogItem {
  category: 'video_game';
  platform: string;
  details: VideoGameDetails;
}

export interface ConsoleCatalogItem extends BaseCatalogItem {
  category: 'video_game_consoles';
  platform: string;
  details: ConsoleDetails;
}

export type CatalogItem =
  | PokemonCatalogItem
  | YugiohCatalogItem
  | OnePieceCatalogItem
  | RiftboundCatalogItem
  | VideoGameCatalogItem
  | ConsoleCatalogItem;

// ============ SEARCH & FILTER TYPES ============

export interface CatalogSearchFilters {
  q?: string;
  category?: Category;
  brand?: TcgBrand;
  productType?: TcgProductType;
  platform?: string;
  language?: string;
  setName?: string;
  setCode?: string;
  illustrator?: string;
  limit?: number;
  offset?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface CatalogSearchResponse {
  items: CatalogItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface AutocompleteSuggestion {
  _id: string;
  title: string;
  normalizedTitle: string;
  slug: string;
  category: Category;
  brand?: TcgBrand;
  imageUrl?: ImageUrls;
  language?: string;
  rarity?: string;
  cardType?: string;
  localizedTitles?: Record<string, string>;
}

export interface AutocompleteResponse {
  suggestions: AutocompleteSuggestion[];
}

// ============ TYPE GUARDS ============

export function isPokemonCatalogItem(item: CatalogItem): item is PokemonCatalogItem {
  return item.category === 'tcg' && 'brand' in item && item.brand === 'pokemon';
}

export function isYugiohCatalogItem(item: CatalogItem): item is YugiohCatalogItem {
  return item.category === 'tcg' && 'brand' in item && item.brand === 'yugioh';
}

export function isOnePieceCatalogItem(item: CatalogItem): item is OnePieceCatalogItem {
  return item.category === 'tcg' && 'brand' in item && item.brand === 'one_piece';
}

export function isRiftboundCatalogItem(item: CatalogItem): item is RiftboundCatalogItem {
  return item.category === 'tcg' && 'brand' in item && item.brand === 'riftbound';
}

export function isVideoGameCatalogItem(item: CatalogItem): item is VideoGameCatalogItem {
  return item.category === 'video_game';
}

export function isConsoleCatalogItem(item: CatalogItem): item is ConsoleCatalogItem {
  return item.category === 'video_game_consoles';
}

export function isTcgCatalogItem(item: CatalogItem): item is PokemonCatalogItem | YugiohCatalogItem | OnePieceCatalogItem | RiftboundCatalogItem {
  return item.category === 'tcg';
}
