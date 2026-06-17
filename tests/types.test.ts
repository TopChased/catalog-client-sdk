import { describe, test, expect } from '@jest/globals';
import {
  SUPPORTED_LANGUAGE_CODES,
  isPokemonCatalogItem,
  isYugiohCatalogItem,
  isOnePieceCatalogItem,
  isRiftboundCatalogItem,
  isVideoGameCatalogItem,
  isConsoleCatalogItem,
  isTcgCatalogItem,
} from '../src/types';
import type { CatalogItem, ConsoleCatalogItem, ConsoleDetails, OnePieceCardDetails, OnePieceCatalogItem, PokemonCardDetails, PokemonCatalogItem, RiftboundCardDetails, RiftboundCatalogItem, VideoGameDetails, YugiohCardDetails, YugiohCatalogItem } from '../src/types';

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
      setCardNumber: 9,
      rarity: 'Rare',
      language: 'en',
      classification: {
        type: 'Unit' as const,
        rarity: 'Rare' as const,
        domain: ['Fury'] as const,
      },
    } satisfies RiftboundCardDetails,
    searchText: ['ahri 009 221'],
    source: { provider: 'riftcodex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  } satisfies RiftboundCatalogItem;

  test('isPokemonCatalogItem should return true for pokemon items', () => {
    expect(isPokemonCatalogItem(pokemonCard)).toBe(true);
  });

  test('isPokemonCatalogItem should return false for non-pokemon items', () => {
    expect(isPokemonCatalogItem(yugiohCard)).toBe(false);
    expect(isPokemonCatalogItem(videoGame)).toBe(false);
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
});
