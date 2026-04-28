import { describe, it, expect } from 'vitest';
import {
  isPokemonCatalogItem,
  isYugiohCatalogItem,
  isOnePieceCatalogItem,
  isVideoGameCatalogItem,
  isConsoleCatalogItem,
  isTcgCatalogItem,
} from '../src';
import type { CatalogItem } from '../src';

describe('type guards', () => {
  const pokemonItem = {
    _id: '1',
    title: 'Charizard',
    normalizedTitle: 'charizard',
    slug: 'charizard',
    category: 'tcg' as const,
    brand: 'pokemon' as const,
    productType: 'card' as const,
    searchText: ['charizard'],
    source: { provider: 'tcgdex' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: {
      setName: 'Base Set',
      setCode: 'base1',
      cardNumber: '4',
      setOfficialCards: '102',
      rarity: 'Rare',
      language: 'en',
      category: 'Pokemon',
    },
  } as unknown as CatalogItem;

  const yugiohItem = {
    _id: '2',
    title: 'Dark Magician',
    normalizedTitle: 'dark magician',
    slug: 'dark-magician',
    category: 'tcg' as const,
    brand: 'yugioh' as const,
    productType: 'card' as const,
    searchText: ['dark magician'],
    source: { provider: 'manual' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: {
      setName: 'LOB',
      setCode: 'lob',
      cardNumber: '1',
      setOfficialCards: '100',
      rarity: 'Ultra Rare',
      language: 'en',
      cardType: 'monster' as const,
    },
  } as unknown as CatalogItem;

  const onePieceItem = {
    _id: '3',
    title: 'Monkey D. Luffy',
    normalizedTitle: 'monkey d luffy',
    slug: 'monkey-d-luffy',
    category: 'tcg' as const,
    brand: 'one_piece' as const,
    productType: 'card' as const,
    searchText: ['luffy'],
    source: { provider: 'manual' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: {
      setName: 'OP-01',
      setCode: 'op1',
      cardNumber: '1',
      setOfficialCards: '100',
      rarity: 'Common',
      language: 'en',
    },
  } as unknown as CatalogItem;

  const videoGameItem = {
    _id: '4',
    title: 'The Legend of Zelda',
    normalizedTitle: 'the legend of zelda',
    slug: 'the-legend-of-zelda',
    category: 'video_game' as const,
    platform: 'nintendo-switch',
    searchText: ['zelda'],
    source: { provider: 'igdb' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: { publisher: 'Nintendo' },
  } as unknown as CatalogItem;

  const consoleItem = {
    _id: '5',
    title: 'Nintendo Switch',
    normalizedTitle: 'nintendo switch',
    slug: 'nintendo-switch',
    category: 'video_game_consoles' as const,
    platform: 'nintendo-switch',
    searchText: ['switch'],
    source: { provider: 'manual' as const },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: { manufacturer: 'Nintendo' },
  } as unknown as CatalogItem;

  it('should identify Pokemon catalog items', () => {
    expect(isPokemonCatalogItem(pokemonItem)).toBe(true);
    expect(isPokemonCatalogItem(yugiohItem)).toBe(false);
    expect(isPokemonCatalogItem(videoGameItem)).toBe(false);
  });

  it('should identify Yugioh catalog items', () => {
    expect(isYugiohCatalogItem(yugiohItem)).toBe(true);
    expect(isYugiohCatalogItem(pokemonItem)).toBe(false);
  });

  it('should identify One Piece catalog items', () => {
    expect(isOnePieceCatalogItem(onePieceItem)).toBe(true);
    expect(isOnePieceCatalogItem(pokemonItem)).toBe(false);
  });

  it('should identify video game catalog items', () => {
    expect(isVideoGameCatalogItem(videoGameItem)).toBe(true);
    expect(isVideoGameCatalogItem(consoleItem)).toBe(false);
    expect(isVideoGameCatalogItem(pokemonItem)).toBe(false);
  });

  it('should identify console catalog items', () => {
    expect(isConsoleCatalogItem(consoleItem)).toBe(true);
    expect(isConsoleCatalogItem(videoGameItem)).toBe(false);
  });

  it('should identify TCG catalog items', () => {
    expect(isTcgCatalogItem(pokemonItem)).toBe(true);
    expect(isTcgCatalogItem(yugiohItem)).toBe(true);
    expect(isTcgCatalogItem(onePieceItem)).toBe(true);
    expect(isTcgCatalogItem(videoGameItem)).toBe(false);
    expect(isTcgCatalogItem(consoleItem)).toBe(false);
  });
});
