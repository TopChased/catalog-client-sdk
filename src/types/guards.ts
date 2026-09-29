import type {
  CatalogItem,
  CatalogSearchItem,
  CatalogVariantSearchItem,
  ConsoleCatalogItem,
  OnePieceCatalogItem,
  PokemonCardCatalogItem,
  PokemonCatalogItem,
  PokemonSealedCatalogItem,
  RiftboundCardCatalogItem,
  RiftboundCatalogItem,
  RiftboundSealedCatalogItem,
  VideoGameCatalogItem,
  YugiohCatalogItem,
} from './catalog.types';

// ============ TYPE GUARDS ============

/*
 * These guards operate on full catalog items (`CatalogItem`), which always carry
 * a `details` payload. Split-view rows (`CatalogVariantSearchItem`) are a flat
 * projection without `details` — narrow those with `isCatalogVariantSearchItem`
 * and read the flattened fields (brand, productType, setName, …) directly.
 */

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

/**
 * Narrow by product type. Like the brand guards above, these also narrow
 * `details` (card vs. sealed) and therefore require a full `CatalogItem`.
 */
export function isRiftboundCardCatalogItem(item: CatalogItem): item is RiftboundCardCatalogItem {
  return isRiftboundCatalogItem(item) && item.productType === 'card';
}

export function isRiftboundSealedCatalogItem(item: CatalogItem): item is RiftboundSealedCatalogItem {
  return isRiftboundCatalogItem(item) && item.productType === 'sealed_product';
}

export function isPokemonCardCatalogItem(item: CatalogItem): item is PokemonCardCatalogItem {
  return isPokemonCatalogItem(item) && item.productType === 'card';
}

export function isPokemonSealedCatalogItem(item: CatalogItem): item is PokemonSealedCatalogItem {
  return isPokemonCatalogItem(item) && item.productType === 'sealed_product';
}

export function isVideoGameCatalogItem(item: CatalogItem): item is VideoGameCatalogItem {
  return item.category === 'video_game';
}

export function isConsoleCatalogItem(item: CatalogItem): item is ConsoleCatalogItem {
  return item.category === 'video_game_consoles';
}

export function isTcgCatalogItem(item: CatalogItem): item is PokemonCardCatalogItem | PokemonSealedCatalogItem | RiftboundCardCatalogItem | YugiohCatalogItem | OnePieceCatalogItem {
  return item.category === 'tcg';
}

/**
 * Narrow a search result to a split-view variant row. Split rows come from the
 * derived catalog_variants projection and carry a `variantKey`/`variantLabel`
 * plus their own `pricing` (unlike full CatalogItems which nest variants).
 */
export function isCatalogVariantSearchItem(item: CatalogSearchItem): item is CatalogVariantSearchItem {
  return (item as CatalogVariantSearchItem).variantKey !== undefined;
}
