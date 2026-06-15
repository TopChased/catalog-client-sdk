// Main SDK entry point
export { default as CatalogClient, SearchQueryBuilder } from './CatalogClient';
export { default as Query } from './Query';

// Export all types (type-only exports)
export type {
  Category,
  TcgBrand,
  TcgProductType,
  SupportedLanguageCode,
  SortBy,
  SortOrder,
  Source,
  SharedTcgCardDetails,
  SharedTcgSealedDetails,
  PokemonCardVariant,
  PokemonCardDetails,
  PokemonSealedDetails,
  YugiohCardDetails,
  YugiohSealedDetails,
  OnePieceCardDetails,
  OnePieceSealedDetails,
  RiftboundCardType,
  RiftboundCardSuperType,
  RiftboundCardDomain,
  RiftboundCardRarity,
  RiftboundCardVariant,
  RiftboundCardDetails,
  RiftboundSealedDetails,
  PokemonDetails,
  YugiohDetails,
  OnePieceDetails,
  RiftboundDetails,
  TcgDetails,
  VideoGameDetails,
  ConsoleDetails,
  BaseCatalogItem,
  PokemonCatalogItem,
  YugiohCatalogItem,
  OnePieceCatalogItem,
  RiftboundCatalogItem,
  VideoGameCatalogItem,
  ConsoleCatalogItem,
  CatalogItem,
  CatalogSearchFilters,
  CatalogSearchResponse,
  AutocompleteSuggestion,
  AutocompleteResponse,
} from './types';

export type {
  Illustrator,
  IllustratorsResponse,
} from './Illustrators/types';

// Export runtime values (type guards, constants, etc.)
export {
  SUPPORTED_LANGUAGE_CODES,
  isPokemonCatalogItem,
  isYugiohCatalogItem,
  isOnePieceCatalogItem,
  isRiftboundCatalogItem,
  isVideoGameCatalogItem,
  isConsoleCatalogItem,
  isTcgCatalogItem,
} from './types';

// Export utilities
export { buildURL, detectContext } from './utils';
