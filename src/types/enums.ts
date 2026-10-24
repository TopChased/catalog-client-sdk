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
export type SortBy = 'relevance' | 'title' | 'createdAt' | 'cardNumber' | 'pokedex' | 'illustrator' | 'rarity' | 'releaseDate' | 'price';


/** Sort order */
export type SortOrder = 'asc' | 'desc';

/**
 * Catalog read mode. 'stacked' queries the canonical catalog_products and
 * returns one item per card (sorted by the card's min market price). 'split'
 * queries the disposable catalog_variants projection and returns one row per
 * variant, sorted/paginated server-side by that variant's own price.
 */
export type CatalogView = 'stacked' | 'split';

/** Context **/
export enum Context {
  Browser = 'browser',
  Server = 'server',
}
