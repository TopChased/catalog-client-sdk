/**
 * Response types of omni's read API (`/api/v2`). Every reference is a
 * `publicId` (`prd_…`, `var_…`, `set_…`, `chr_…`); nothing exposes database IDs.
 */

export type TcgGameSlug = 'pokemon' | 'riftbound' | (string & {});
export type LanguageCode = 'en' | 'ja' | 'ko' | 'zh-cn';
export type LifecycleStatus = 'active' | 'hidden' | 'retired' | 'merged';

export interface TcgGameRef {
  publicId: string;
  slug: TcgGameSlug;
  name: string;
}

export interface SeriesRef {
  publicId: string;
  slug: string;
  name: string;
}

export interface IllustratorRef {
  publicId: string;
  slug: string;
  name: string;
}

/** An illustrator in `GET /illustrators`, with what they're credited on. */
export interface IllustratorListItem extends IllustratorRef {
  /** Active products the illustrator is credited on. */
  productCount: number;
  /** Slugs of the games those products belong to. */
  tcgGames: TcgGameSlug[];
}

export interface CatalogSet {
  publicId: string;
  slug: string;
  code: string;
  name: string;
  language: LanguageCode;
  setType: 'main' | 'special' | 'subset' | 'promo';
  releaseDate: string | null;
  printedTotal: number | null;
  total: number | null;
  images: { logo: string | null; symbol: string | null };
  tcgGame: TcgGameRef | null;
  series: SeriesRef | null;
}

export interface CatalogCharacter {
  publicId: string;
  slug: string;
  name: string;
  kind: 'champion' | 'pokemon' | 'trainer' | 'other';
  nationalDex: number | null;
  /** publicId of the species this is a form of, e.g. Alolan Diglett → Diglett. */
  formOf: string | null;
  aliases: string[];
  names: Array<{ language: string; name: string }>;
  portrait: string | null;
  tcgGame: TcgGameRef | null;
}

export type PriceCondition = 'NM' | 'LP' | 'MP' | 'HP' | 'DMG';

export interface ConditionPrice {
  market: number | null;
  lowest: number | null;
  listings: number | null;
}

export interface VariantPricing {
  /** `null` for a condition with no price. */
  tcgplayer: Record<PriceCondition, ConditionPrice | null>;
  updatedAt: string | null;
  /** NM market price, the default sort price. */
  sortPrice: number | null;
}

export interface CatalogVariant {
  publicId: string;
  /** Stable within the product, e.g. `pv:holo:shadowless:standard::["1st-edition"]`. */
  variantKey: string;
  /** e.g. "Holo · Shadowless · 1st Edition". */
  label: string;
  isDefault: boolean;
  status: LifecycleStatus;
  attributes: {
    finish: 'normal' | 'foil' | 'holo' | 'reverse' | null;
    edition: string | null;
    foilPattern: string | null;
    size: 'standard' | 'jumbo' | null;
    stamps: string[];
  };
  images: { high: string | null; low: string | null };
  pricing: VariantPricing;
  tcgplayer: { productId: string | null; skus: Array<{ skuId: string; condition: string | null }> };
}

export interface PokemonCardDetailsV2 {
  cardType?: 'pokemon' | 'trainer' | 'energy' | null;
  pokedex?: number[] | null;
  pokedexSort?: number | null;
  hp?: number | null;
  energyType?: string | null;
  types?: string[] | null;
  evolveFrom?: string | null;
  stage?: string | null;
  suffix?: string | null;
  trainerType?: string | null;
  regulationMark?: string | null;
  attacks?: Array<{ name?: string | null; cost?: string[] | null; damage?: string | null; effect?: string | null }> | null;
  abilities?: Array<{ type?: string | null; name?: string | null; effect?: string | null }> | null;
  weaknesses?: Array<{ type?: string | null; value?: string | null }> | null;
  resistances?: Array<{ type?: string | null; value?: string | null }> | null;
  retreat?: number | null;
  effect?: string | null;
  description?: string | null;
  legal?: { standard?: boolean | null; expanded?: boolean | null };
}

export interface RiftboundCardDetailsV2 {
  riftboundId?: string | null;
  cardType?: string | null;
  superType?: string | null;
  domains?: string[] | null;
  energy?: number | null;
  might?: number | null;
  power?: number | null;
  textPlain?: string | null;
  textFlavour?: string | null;
  tags?: string[] | null;
  orientation?: string | null;
  alternateArt?: boolean | null;
  overnumbered?: boolean | null;
  signature?: boolean | null;
  metal?: boolean | null;
}

export type ProductType =
  | 'pokemonCard'
  | 'pokemonSealedProduct'
  | 'riftboundCard'
  | 'riftboundSealedProduct';

interface ProductBase {
  publicId: string;
  slug: string;
  kind: 'card' | 'sealed' | null;
  status: LifecycleStatus;
  title: string;
  number: string | null;
  rarity: string | null;
  language: LanguageCode | null;
  releaseDate: string | null;
  images: { high: string | null; low: string | null };
  tcgGame: TcgGameRef | null;
  set: CatalogSet | null;
  series: SeriesRef | null;
  illustrators: IllustratorRef[];
  characters: CatalogCharacter[];
  /** Default variant first. */
  variants: CatalogVariant[];
}

export interface PokemonCardProduct extends ProductBase {
  productType: 'pokemonCard';
  details: { pokemonCard?: PokemonCardDetailsV2 };
}

export interface RiftboundCardProduct extends ProductBase {
  productType: 'riftboundCard';
  details: { riftboundCard?: RiftboundCardDetailsV2 };
}

export interface SealedProduct extends ProductBase {
  productType: 'pokemonSealedProduct' | 'riftboundSealedProduct';
  details: Record<string, Record<string, unknown> | undefined>;
}

export type CatalogProduct = PokemonCardProduct | RiftboundCardProduct | SealedProduct;

/** A product in a list: enough to show and link it, without variants or details. */
export interface ProductSummary {
  publicId: string;
  slug: string;
  title: string;
  number: string | null;
  rarity: string | null;
  language: LanguageCode | null;
  images: { high: string | null; low: string | null };
}

export interface VariantPrices {
  publicId: string;
  /** publicId of the variant's product. */
  product: string;
  pricing: VariantPricing;
}

export interface Page<T> {
  docs: T[];
  page: number;
  totalPages: number;
  totalDocs: number;
}

/** Sort fields of `GET /search`; `relevance` ranks by the query. */
export type SearchSort = 'relevance' | 'number' | 'pokedex' | 'price' | 'releaseDate' | 'title' | 'illustrator';

/**
 * Params of `GET /search`. Lists take several values (OR'd). `set`, `series`,
 * `illustrator` and `character` take a publicId, slug or name.
 */
export interface SearchParams {
  /** Text; a card number like "4/102" or "#4" narrows by number. */
  q?: string;
  tcgGame?: TcgGameSlug | TcgGameSlug[];
  language?: LanguageCode | string | Array<LanguageCode | string>;
  set?: string | string[];
  series?: string | string[];
  excludeSeries?: string | string[];
  cardType?: string | string[];
  rarity?: string | string[];
  illustrator?: string | string[];
  character?: string | string[];
  /** `family` (default) includes forms (Mega Charizard X for Charizard); `exact` only the character. */
  characterMatch?: 'family' | 'exact';
  /** Every Pokémon in the character's evolution family. */
  includeEvolutions?: boolean;
  kind?: 'card' | 'sealed';
  sort?: SearchSort;
  order?: 'asc' | 'desc';
  /**
   * `stacked` (default): a doc per product. `split`: a doc per variant, sorted
   * (price above all) and paged by that variant; each doc carries only that
   * variant, so a product can repeat.
   */
  view?: 'stacked' | 'split';
  offset?: number;
  /** 1–100, default 20. */
  limit?: number;
}

export interface SearchPage {
  /** Products; in split view, a product per variant hit with only that variant. */
  docs: CatalogProduct[];
  totalDocs: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  /** The card number the query was narrowed by, if any. */
  cardNumber: { number: string; printedTotal: number | null } | null;
}

export interface SuggestedCharacter {
  publicId: string;
  slug: string;
  name: string;
  kind: CatalogCharacter['kind'];
  /** Game slug. */
  tcgGame: TcgGameSlug | null;
  nationalDex: number | null;
  formOf: string | null;
  portrait: string | null;
}

export interface SuggestedSet {
  publicId: string;
  slug: string;
  code: string;
  name: string;
  language: LanguageCode;
  /** Game slug. */
  tcgGame: TcgGameSlug | null;
  releaseDate: string | null;
  images: { logo: string | null; symbol: string | null };
}

export interface SuggestedProduct {
  publicId: string;
  slug: string;
  title: string;
  number: string | null;
  rarity: string | null;
  language: LanguageCode | null;
  /** Game slug. */
  tcgGame: TcgGameSlug | null;
  setName: string | null;
  setCode: string | null;
  /** The set's printed card count (the `102` in `4/102`). */
  setPrintedTotal: number | null;
  image: string | null;
}

export interface Suggestions {
  characters: SuggestedCharacter[];
  sets: SuggestedSet[];
  products: SuggestedProduct[];
  /** A character whose name or alias equals the query. */
  exactCharacter: SuggestedCharacter | null;
}

export interface ApiErrorBody {
  error: { status: number; message: string };
}

export const isPokemonCardProduct = (product: CatalogProduct): product is PokemonCardProduct =>
  product.productType === 'pokemonCard';

export const isRiftboundCardProduct = (product: CatalogProduct): product is RiftboundCardProduct =>
  product.productType === 'riftboundCard';
