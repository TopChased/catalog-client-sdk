import type {
  CatalogItem,
  CatalogSearchItem,
  CatalogVariantSearchItem,
  ConsoleCatalogItem,
  OnePieceCatalogItem,
  PokemonCatalogItem,
  RiftboundCardCatalogItem,
  RiftboundCatalogItem,
  RiftboundSealedCatalogItem,
  VideoGameCatalogItem,
  YugiohCatalogItem,
} from './catalog.types';

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

export function isRiftboundCatalogItem(item: CatalogItem | CatalogVariantSearchItem): item is RiftboundCatalogItem {
  return item.category === 'tcg' && 'brand' in item && item.brand === 'riftbound';
}

/**
 * Narrow a Riftbound item to a single card. Unlike `isRiftboundCatalogItem`,
 * this also narrows `details` to `RiftboundCardDetails`.
 */
export function isRiftboundCardCatalogItem(item: CatalogItem | CatalogVariantSearchItem): item is RiftboundCardCatalogItem {
  return isRiftboundCatalogItem(item) && item.productType === 'card';
}

/**
 * Narrow a Riftbound item to a sealed product (pack, box, bundle, …), which
 * narrows `details` to `RiftboundSealedDetails`.
 */
export function isRiftboundSealedCatalogItem(item: CatalogItem | CatalogVariantSearchItem): item is RiftboundSealedCatalogItem {
  return isRiftboundCatalogItem(item) && item.productType === 'sealed_product';
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

/**
 * Narrow a search result to a split-view variant row. Split rows come from the
 * derived catalog_variants projection and carry a `variantKey`/`variantLabel`
 * plus their own `pricing` (unlike full CatalogItems which nest variants).
 */
export function isCatalogVariantSearchItem(item: CatalogSearchItem): item is CatalogVariantSearchItem {
  return (item as CatalogVariantSearchItem).variantKey !== undefined;
}
