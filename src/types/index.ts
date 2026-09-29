/**
 * Barrel for the SDK type system. `'./types'` and `'../src/types'` resolve here,
 * so this file is the single stable specifier for every type in the SDK.
 *
 * Layout mirrors catalog-engine:
 *   enums.ts / shared.types.ts  — leaves, import nothing local
 *   tcg/*, gaming/*             — brand leaves, import only the two above
 *   catalog.types.ts            — item shapes + search DTOs, imports the leaves
 *   guards.ts                   — narrowing helpers over catalog.types.ts
 *
 * Re-exports are explicit (not `export *`) so that a duplicate name across
 * modules is a compile error rather than a silently dropped export.
 */

// ============ ENUMS & LITERAL TYPES ============
export type {
  Category,
  TcgBrand,
  TcgProductType,
  SupportedLanguageCode,
  SortBy,
  SortOrder,
  CatalogView,
} from './enums';
export { SUPPORTED_LANGUAGE_CODES, Context } from './enums';

// ============ SOURCE, SHARED TCG DETAILS & VARIANTS ============
export type {
  Source,
  SharedTcgCardDetails,
  SharedTcgSealedDetails,
  TcgPlayerSku,
  TcgPlayerThirdParty,
  CardVariant,
} from './shared.types';

// ============ TCG BRAND DETAILS ============
export type {
  PokemonCardVariant,
  PokemonCardDetails,
  PokemonSealedDetails,
  PokemonDetails,
} from './tcg/pokemon.types';

export type {
  YugiohCardDetails,
  YugiohSealedDetails,
  YugiohDetails,
} from './tcg/yugioh.types';

export type {
  OnePieceCardDetails,
  OnePieceSealedDetails,
  OnePieceDetails,
} from './tcg/onepiece.types';

export type {
  RiftboundCardType,
  RiftboundCardSuperType,
  RiftboundCardDomain,
  RiftboundCardRarity,
  RiftboundCardVariant,
  RiftboundCardDetails,
  RiftboundSealedDetails,
  RiftboundDetails,
} from './tcg/riftbound.types';

// ============ VIDEO GAME & CONSOLE DETAILS ============
export type { VideoGameDetails } from './gaming/videogame.types';
export type { ConsoleDetails } from './gaming/console.types';

// ============ CATALOG ITEMS, SEARCH & FILTER TYPES ============
export type {
  ImageUrls,
  VariantPriceSnapshot,
  PriceSnapshot,
  BaseCatalogItem,
  TcgDetails,
  PokemonCatalogItem,
  PokemonCardCatalogItem,
  PokemonSealedCatalogItem,
  YugiohCatalogItem,
  OnePieceCatalogItem,
  RiftboundCardCatalogItem,
  RiftboundSealedCatalogItem,
  RiftboundCatalogItem,
  VideoGameCatalogItem,
  ConsoleCatalogItem,
  CatalogItem,
  CatalogSearchFilters,
  CatalogVariantSearchItem,
  CatalogSearchItem,
  CatalogSearchResponse,
  AutocompleteSuggestion,
  AutocompleteResponse,
} from './catalog.types';

// ============ TYPE GUARDS ============
export {
  isPokemonCatalogItem,
  isPokemonCardCatalogItem,
  isPokemonSealedCatalogItem,
  isYugiohCatalogItem,
  isOnePieceCatalogItem,
  isRiftboundCatalogItem,
  isRiftboundCardCatalogItem,
  isRiftboundSealedCatalogItem,
  isVideoGameCatalogItem,
  isConsoleCatalogItem,
  isTcgCatalogItem,
  isCatalogVariantSearchItem,
} from './guards';
