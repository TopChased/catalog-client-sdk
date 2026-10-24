import { describe, test, expect } from '@jest/globals';
import {
  SUPPORTED_LANGUAGE_CODES,
  isCatalogVariantSearchItem,
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
} from '../src/types';
import type { CatalogItem, CatalogVariantSearchItem, ConsoleCatalogItem, ConsoleDetails, OnePieceCardDetails, OnePieceCatalogItem, PokemonCardCatalogItem, PokemonCardDetails, PokemonCatalogItem, PokemonSealedCatalogItem, PokemonSealedDetails, RiftboundCardDetails, RiftboundCatalogItem, RiftboundSealedCatalogItem, RiftboundSealedDetails, VideoGameDetails, YugiohCardDetails, YugiohCatalogItem } from '../src/types';

describe('SUPPORTED_LANGUAGE_CODES', () => {
  test('should contain all expected language codes', () => {
    expect(SUPPORTED_LANGUAGE_CODES).toContain('en');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('ja');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('np');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('zh-TW');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('zh-CN');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('fr');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('de');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('es');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('es-mx');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('it');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('ko');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('th');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('nl');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('id');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('pl');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('pt');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('pt-br');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('pt-pt');
    expect(SUPPORTED_LANGUAGE_CODES).toContain('ru');
  });

  test('should have exactly 19 language codes', () => {
    expect(SUPPORTED_LANGUAGE_CODES).toHaveLength(19);
  });

  test('should be defined as a const array', () => {
    expect(Array.isArray(SUPPORTED_LANGUAGE_CODES)).toBe(true);
  });
});

describe('type guards', () => {
  const pokemonCard = {
    _id: '1',
    publicId: 'pokemon-base1-4-en',
    title: 'Charizard',
    normalizedTitle: 'charizard',
    slug: 'charizard',
    category: 'tcg' as const,
    brand: 'pokemon' as const,
    productType: 'card' as const,
    details: {
      series: 'base',
      setName: 'Base Set',
      setCode: 'base1',
      cardNumber: '4',
      cardSetNumber: 4,
      setOfficialCards: '102',
      rarity: 'Rare',
      language: 'en',
      cardType: 'pokemon' as const,
      category: 'pokemon',
    } satisfies PokemonCardDetails,
    searchText: ['charizard'],
    source: { provider: 'tcgdex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies PokemonCatalogItem;

  const yugiohCard = {
    _id: '2',
    publicId: 'yugioh-lob-1-100-en',
    title: 'Dark Magician',
    normalizedTitle: 'dark magician',
    slug: 'dark-magician',
    category: 'tcg' as const,
    brand: 'yugioh' as const,
    productType: 'card' as const,
    details: {
      setName: 'Legend of Blue Eyes',
      setCode: 'lob',
      cardNumber: '1',
      cardSetNumber: 1,
      setOfficialCards: '100',
      rarity: 'Ultra Rare',
      language: 'en',
      cardType: 'monster' as const,
    },
    searchText: ['dark magician'],
    source: { provider: 'tcgdex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies YugiohCatalogItem;

  const onePieceCard = {
    _id: '3',
    publicId: 'op-op01-1-100-en',
    title: 'Monkey D. Luffy',
    normalizedTitle: 'monkey d luffy',
    slug: 'monkey-d-luffy',
    category: 'tcg' as const,
    brand: 'one_piece' as const,
    productType: 'card' as const,
    details: {
      setName: 'Romance Dawn',
      setCode: 'op01',
      cardNumber: '1',
      cardSetNumber: 1,
      setOfficialCards: '100',
      rarity: 'Common',
      language: 'en',
    } satisfies OnePieceCardDetails,
    searchText: ['monkey d luffy'],
    source: { provider: 'tcgdex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies OnePieceCatalogItem;

  const videoGame = {
    _id: '4',
    publicId: 'videogame-pokemon-scarlet-nintendo-usa',
    title: 'Pokemon Scarlet',
    normalizedTitle: 'pokemon scarlet',
    slug: 'pokemon-scarlet',
    category: 'video_game' as const,
    platform: 'nintendo_switch',
    details: {
      publisher: 'Nintendo',
      developer: 'Game Freak',
      genre: ['RPG'],
    } satisfies VideoGameDetails,
    searchText: ['pokemon scarlet'],
    source: { provider: 'igdb' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies CatalogItem;

  const console = {
    _id: '5',
    publicId: 'console-switch1-usa',
    title: 'Nintendo Switch',
    normalizedTitle: 'nintendo switch',
    slug: 'nintendo-switch',
    category: 'video_game_consoles' as const,
    platform: 'nintendo_switch',
    details: {
      manufacturer: 'Nintendo',
      model: 'OLED',
    } satisfies ConsoleDetails,
    searchText: ['nintendo switch'],
    source: { provider: 'manual' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies ConsoleCatalogItem;

  const riftboundCard = {
    _id: '6',
    publicId: 'tcg-riftbound-opp-009-221-en',
    title: 'Ahri 009/221',
    normalizedTitle: 'ahri 009 221',
    slug: 'card-riftbound-opp-009-221-ahri',
    category: 'tcg' as const,
    brand: 'riftbound' as const,
    productType: 'card' as const,
    details: {
      riftboundId: 'opp-009-221',
      setName: 'Opposition',
      setCode: 'opp',
      cardNumber: 'opp-009-221',
      cardSetNumber: 9,
      setOfficialCards: '221',
      rarity: 'Rare',
      language: 'en',
      cardType: 'Unit' as const,
      domain: ['Fury'] as const,
    } satisfies RiftboundCardDetails,
    searchText: ['ahri 009 221'],
    source: { provider: 'riftcodex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies RiftboundCatalogItem;

  const riftboundSealed = {
    _id: '7',
    publicId: 'sealed-riftbound-opp-booster-box-en',
    title: 'Opposition Booster Box',
    normalizedTitle: 'opposition booster box',
    slug: 'sealed-riftbound-opp-booster-box-opposition',
    category: 'tcg' as const,
    brand: 'riftbound' as const,
    productType: 'sealed_product' as const,
    details: {
      sealedType: 'Booster Box',
      setName: 'Opposition',
      setCode: 'opp',
    } satisfies RiftboundSealedDetails,
    searchText: ['opposition booster box'],
    source: { provider: 'riftcodex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies RiftboundSealedCatalogItem;

  const pokemonSealed = {
    _id: '8',
    publicId: 'sealed-pokemon-base1-booster-box-en',
    title: 'Base Set Booster Box',
    normalizedTitle: 'base set booster box',
    slug: 'sealed-pokemon-base1-booster-box',
    category: 'tcg' as const,
    brand: 'pokemon' as const,
    productType: 'sealed_product' as const,
    details: {
      sealedType: 'Booster Box',
      setName: 'Base Set',
      setCode: 'base1',
    } satisfies PokemonSealedDetails,
    searchText: ['base set booster box'],
    source: { provider: 'tcgdex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies PokemonSealedCatalogItem;

  const pokemonCardOnly = pokemonCard as PokemonCardCatalogItem;

  test('isPokemonCatalogItem should return true for pokemon items', () => {
    expect(isPokemonCatalogItem(pokemonCard)).toBe(true);
  });

  test('isPokemonCatalogItem should return false for non-pokemon items', () => {
    expect(isPokemonCatalogItem(yugiohCard)).toBe(false);
    expect(isPokemonCatalogItem(videoGame)).toBe(false);
  });

  test('isPokemonCardCatalogItem should return true for pokemon cards only', () => {
    expect(isPokemonCardCatalogItem(pokemonCard)).toBe(true);
    expect(isPokemonCardCatalogItem(pokemonSealed)).toBe(false);
    expect(isPokemonCardCatalogItem(yugiohCard)).toBe(false);
  });

  test('isPokemonSealedCatalogItem should return true for pokemon sealed products only', () => {
    expect(isPokemonSealedCatalogItem(pokemonSealed)).toBe(true);
    expect(isPokemonSealedCatalogItem(pokemonCard)).toBe(false);
    expect(isPokemonSealedCatalogItem(riftboundSealed)).toBe(false);
  });

  test('isPokemonCardCatalogItem should narrow details to pokemon card details', () => {
    const item: CatalogItem = pokemonCardOnly;

    if (isPokemonCardCatalogItem(item)) {
      // Would not compile if `details` were the sealed/riftbound shape.
      expect(item.details.series).toBe('base');
      expect(item.details.cardType).toBe('pokemon');
    } else {
      throw new Error('expected a pokemon card catalog item');
    }
  });

  test('isPokemonSealedCatalogItem should narrow details to pokemon sealed details', () => {
    const item: CatalogItem = pokemonSealed;

    if (isPokemonSealedCatalogItem(item)) {
      expect(item.details.sealedType).toBe('Booster Box');
    } else {
      throw new Error('expected a pokemon sealed catalog item');
    }
  });

  test('isYugiohCatalogItem should return true for yugioh items', () => {
    expect(isYugiohCatalogItem(yugiohCard)).toBe(true);
  });

  test('isYugiohCatalogItem should return false for non-yugioh items', () => {
    expect(isYugiohCatalogItem(pokemonCard)).toBe(false);
    expect(isYugiohCatalogItem(videoGame)).toBe(false);
  });

  test('isOnePieceCatalogItem should return true for one piece items', () => {
    expect(isOnePieceCatalogItem(onePieceCard)).toBe(true);
  });

  test('isOnePieceCatalogItem should return false for non-one-piece items', () => {
    expect(isOnePieceCatalogItem(pokemonCard)).toBe(false);
    expect(isOnePieceCatalogItem(videoGame)).toBe(false);
  });

  test('isRiftboundCatalogItem should return true for riftbound items', () => {
    expect(isRiftboundCatalogItem(riftboundCard)).toBe(true);
  });

  test('isRiftboundCatalogItem should return false for non-riftbound items', () => {
    expect(isRiftboundCatalogItem(pokemonCard)).toBe(false);
    expect(isRiftboundCatalogItem(videoGame)).toBe(false);
  });

  test('isRiftboundCardCatalogItem should return true for riftbound cards only', () => {
    expect(isRiftboundCardCatalogItem(riftboundCard)).toBe(true);
    expect(isRiftboundCardCatalogItem(riftboundSealed)).toBe(false);
  });

  test('isRiftboundSealedCatalogItem should return true for riftbound sealed products only', () => {
    expect(isRiftboundSealedCatalogItem(riftboundSealed)).toBe(true);
    expect(isRiftboundSealedCatalogItem(riftboundCard)).toBe(false);
  });

  test('isRiftboundCardCatalogItem should narrow details to card details', () => {
    const item: CatalogItem = riftboundCard;

    if (isRiftboundCardCatalogItem(item)) {
      // Would not compile if `details` were still the card | sealed union.
      expect(item.details.cardType).toBe('Unit');
      expect(item.details.domain).toContain('Fury');
    } else {
      throw new Error('expected a riftbound card catalog item');
    }
  });

  test('isVideoGameCatalogItem should return true for video game items', () => {
    expect(isVideoGameCatalogItem(videoGame)).toBe(true);
  });

  test('isVideoGameCatalogItem should return false for non-video-game items', () => {
    expect(isVideoGameCatalogItem(pokemonCard)).toBe(false);
    expect(isVideoGameCatalogItem(console)).toBe(false);
  });

  test('isConsoleCatalogItem should return true for console items', () => {
    expect(isConsoleCatalogItem(console)).toBe(true);
  });

  test('isConsoleCatalogItem should return false for non-console items', () => {
    expect(isConsoleCatalogItem(videoGame)).toBe(false);
    expect(isConsoleCatalogItem(pokemonCard)).toBe(false);
  });

  test('isTcgCatalogItem should return true for any TCG item', () => {
    expect(isTcgCatalogItem(pokemonCard)).toBe(true);
    expect(isTcgCatalogItem(yugiohCard)).toBe(true);
    expect(isTcgCatalogItem(onePieceCard)).toBe(true);
    expect(isTcgCatalogItem(riftboundCard)).toBe(true);
  });

  test('isTcgCatalogItem should return false for non-TCG items', () => {
    expect(isTcgCatalogItem(videoGame)).toBe(false);
    expect(isTcgCatalogItem(console)).toBe(false);
  });

  // Split-view rows are a flat projection (no `details`), so they are matched
  // only by `isCatalogVariantSearchItem` — never by the brand/product guards.
  const variantRow = {
    catalogItemId: '1',
    catalogPublicId: 'pokemon-base1-4-en',
    publicId: 'pokemon-base1-4-en:pv:holo',
    title: 'Charizard',
    variantKey: 'pv:holo::',
    variantLabel: 'Holo',
    variantName: 'Charizard 4/102 · Holo',
    slug: 'charizard',
    category: 'tcg' as const,
    brand: 'pokemon' as const,
    productType: 'card' as const,
    pricing: { marketPrice: 12.5, condition: 'NM' },
  } satisfies CatalogVariantSearchItem;

  test('isCatalogVariantSearchItem should match a flat split-view row', () => {
    expect(isCatalogVariantSearchItem(variantRow)).toBe(true);
  });

  test('isCatalogVariantSearchItem should not match a full catalog item', () => {
    expect(isCatalogVariantSearchItem(pokemonCard)).toBe(false);
  });
});
