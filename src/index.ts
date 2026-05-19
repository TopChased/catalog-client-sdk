// Main SDK entry point
export { default as CatalogClient, SearchQueryBuilder } from './CatalogClient';
export { default as Query } from './Query';

// Export all types (type-only exports)
export type {
  Category,
  TcgBrand,
  TcgProductType,
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
  PokemonDetails,
  YugiohDetails,
  OnePieceDetails,
  TcgDetails,
  VideoGameDetails,
  ConsoleDetails,
  BaseCatalogItem,
  PokemonCatalogItem,
  YugiohCatalogItem,
  OnePieceCatalogItem,
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

// Export runtime values (type guards, etc.)
export {
  isPokemonCatalogItem,
  isYugiohCatalogItem,
  isOnePieceCatalogItem,
  isVideoGameCatalogItem,
  isConsoleCatalogItem,
  isTcgCatalogItem,
} from './types';

// Export utilities
export { buildURL, detectContext } from './utils';
