// ============ ENUMS & LITERAL TYPES ============

/** Supported catalog categories */
export type Category = 'tcg' | 'video_game' | 'video_game_consoles';

/** Supported TCG brands */
export type TcgBrand = 'pokemon' | 'yugioh' | 'one_piece';

/** Supported TCG product types */
export type TcgProductType = 'card' | 'sealed_product';

/** Sort options for search results */
export type SortBy = 'relevance' | 'title' | 'createdAt';

/** Sort order */
export type SortOrder = 'asc' | 'desc';

/** Context **/
export enum Context {
  Browser = 'browser',
  Server = 'server',
}

// ============ SOURCE ============

export interface Source {
  provider: 'tcgdex' | 'igdb' | 'manual' | 'csv' | 'other';
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
  pokemon?: string[];
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
  character?: string;
  type?: string;
  cost?: number;
  power?: number;
}

export interface OnePieceSealedDetails extends SharedTcgSealedDetails {
  variant?: string;
}

export type PokemonDetails = PokemonCardDetails | PokemonSealedDetails;
export type YugiohDetails = YugiohCardDetails | YugiohSealedDetails;
export type OnePieceDetails = OnePieceCardDetails | OnePieceSealedDetails;
export type TcgDetails = PokemonDetails | YugiohDetails | OnePieceDetails;

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

export function isVideoGameCatalogItem(item: CatalogItem): item is VideoGameCatalogItem {
  return item.category === 'video_game';
}

export function isConsoleCatalogItem(item: CatalogItem): item is ConsoleCatalogItem {
  return item.category === 'video_game_consoles';
}

export function isTcgCatalogItem(item: CatalogItem): item is PokemonCatalogItem | YugiohCatalogItem | OnePieceCatalogItem {
  return item.category === 'tcg';
}
