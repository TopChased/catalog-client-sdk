import type {
  Category,
  CatalogView,
  SortBy,
  SortOrder,
  TcgBrand,
  TcgProductType,
} from './enums';
import type { Source } from './shared.types';
import type { ConsoleDetails } from './gaming/console.types';
import type { VideoGameDetails } from './gaming/videogame.types';
import type { OnePieceDetails } from './tcg/onepiece.types';
import type { PokemonCardDetails, PokemonDetails, PokemonSealedDetails } from './tcg/pokemon.types';
import type { RiftboundCardDetails, RiftboundDetails, RiftboundSealedDetails } from './tcg/riftbound.types';
import type { YugiohDetails } from './tcg/yugioh.types';

// ============ DETAILS UNIONS ============

export type TcgDetails = PokemonDetails | YugiohDetails | OnePieceDetails | RiftboundDetails;

// ============ BASE CATALOG ITEM ============

export interface ImageUrls {
  high?: string;
  low?: string;
}

/** Denormalized market price snapshot (NM market price for cards). */
/** A per-variant market price snapshot, keyed by the composite variant key. */
export interface VariantPriceSnapshot {
  variantKey: string;
  marketPrice: number | null;
  condition: string;
}


export interface PriceSnapshot {
  priceUnits: 'USD';
  // The card's "from"/entry market price = the min of the variant market prices.
  // Stored as a number so it can be indexed and sorted on (asc/desc) efficiently.
  marketPrice?: number | null;
  variants?: VariantPriceSnapshot[];
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
  price?: PriceSnapshot;
}


// ============ BRAND-SPECIFIC CATALOG ITEMS ============

export interface PokemonCardCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'pokemon';
  productType: 'card';
  details: PokemonCardDetails;
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

/**
 * A Riftbound single card.
 *
 * `productType` is a literal so that a `RiftboundCatalogItem` narrows to card
 * vs. sealed details via `isRiftboundCardCatalogItem`.
 */
export interface RiftboundCardCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'riftbound';
  productType: 'card';
  details: RiftboundCardDetails;
}

/** A Pokemon sealed product (booster pack, box, bundle, …). */
export interface PokemonSealedCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'pokemon';
  productType: 'sealed_product';
  details: PokemonSealedDetails;
}

/** A Riftbound sealed product (pack, box, bundle, …). */
export interface RiftboundSealedCatalogItem extends BaseCatalogItem {
  category: 'tcg';
  brand: 'riftbound';
  productType: 'sealed_product';
  details: RiftboundSealedDetails;
}

/**
 * @deprecated Prefer `PokemonCardCatalogItem` / `PokemonSealedCatalogItem`.
 * This alias stays assignable to both so existing callers keep compiling, but it
 * cannot discriminate on `details` — narrow with `isPokemonCardCatalogItem` or
 * `isPokemonSealedCatalogItem` first.
 */
export type PokemonCatalogItem = PokemonCardCatalogItem | PokemonSealedCatalogItem;

/**
 * @deprecated Prefer `RiftboundCardCatalogItem` / `RiftboundSealedCatalogItem`.
 * This alias stays assignable to both so existing callers keep compiling, but it
 * cannot discriminate on `details` — narrow with `isRiftboundCardCatalogItem` or
 * `isRiftboundSealedCatalogItem` first.
 */
export type RiftboundCatalogItem = RiftboundCardCatalogItem | RiftboundSealedCatalogItem;

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
  | RiftboundCardCatalogItem
  | RiftboundSealedCatalogItem
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
  character?: string;
  series?: string;
  setName?: string;
  setCode?: string;
  illustrator?: string;
  cardType?: string;
  energyType?: string;
  rarity?: string;
  includeEvolutions?: string;
  /** Read mode: 'stacked' (one item per card) or 'split' (one row per variant). */
  view?: CatalogView;
  limit?: number;
  offset?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

/**
 * A single variant row returned by the catalog API when `view=split`.
 * Mirrors the server's CatalogVariant projection DTO. It is a derived,
 * disposable read model — its identity is always `catalogItemId + variantKey`,
 * never a catalogVariant _id.
 */
export interface CatalogVariantSearchItem {
  catalogItemId: string;
  catalogPublicId: string;
  publicId: string;
  title: string;
  variantKey: string;
  variantLabel: string;
  /** Convenience display name, e.g. "Charizard 4/102 · Holo". */
  variantName: string;
  slug: string;
  category: Category;
  brand?: TcgBrand;
  productType?: TcgProductType;
  imageUrl?: ImageUrls;
  language?: string;
  setId?: string;
  setCode?: string;
  setName?: string;
  cardType?: string;
  rarity?: string;
  cardNumber?: string;
  pricing?: {
    marketPrice?: number | null;
    condition?: string;
  };
}

/** A search result is either a full catalog item (stacked) or a variant row (split). */
export type CatalogSearchItem = CatalogItem | CatalogVariantSearchItem;

export interface CatalogSearchResponse {
  items: CatalogSearchItem[];
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
