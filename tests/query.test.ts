import { describe, test, expect } from '@jest/globals';
import Query from '../src/Query';

describe('Query builder', () => {
  test('should create an empty query', () => {
    const query = Query.create();
    expect(query.params).toEqual([]);
  });

  test('should chain search method', () => {
    const query = Query.create().search('charizard');
    expect(query.params).toEqual([{ key: 'q', value: 'charizard' }]);
  });

  test('should chain category method', () => {
    const query = Query.create().category('tcg');
    expect(query.params).toEqual([{ key: 'category', value: 'tcg' }]);
  });

  test('should chain brand method', () => {
    const query = Query.create().brand('pokemon');
    expect(query.params).toEqual([{ key: 'brand', value: 'pokemon' }]);
  });

  test('should chain productType method', () => {
    const query = Query.create().productType('card');
    expect(query.params).toEqual([{ key: 'productType', value: 'card' }]);
  });

  test('should chain platform method', () => {
    const query = Query.create().platform('nintendo_switch');
    expect(query.params).toEqual([{ key: 'platform', value: 'nintendo_switch' }]);
  });

  test('should chain language method', () => {
    const query = Query.create().language('en');
    expect(query.params).toEqual([{ key: 'language', value: 'en' }]);
  });

  test('should chain pokemonName method', () => {
    const query = Query.create().pokemonName('Pikachu');
    expect(query.params).toEqual([{ key: 'pokemon', value: 'Pikachu' }]);
  });

  test('should chain setName method', () => {
    const query = Query.create().setName('Base Set');
    expect(query.params).toEqual([{ key: 'setName', value: 'Base Set' }]);
  });

  test('should chain setCode method', () => {
    const query = Query.create().setCode('sm8');
    expect(query.params).toEqual([{ key: 'setCode', value: 'sm8' }]);
  });

  test('should chain illustrator method', () => {
    const query = Query.create().illustrator('Ken Sugimori');
    expect(query.params).toEqual([{ key: 'illustrator', value: 'Ken Sugimori' }]);
  });

  test('should chain limit method', () => {
    const query = Query.create().limit(10);
    expect(query.params).toEqual([{ key: 'limit', value: 10 }]);
  });

  test('should chain offset method', () => {
    const query = Query.create().offset(20);
    expect(query.params).toEqual([{ key: 'offset', value: 20 }]);
  });

  test('should chain paginate method', () => {
    const query = Query.create().paginate(2, 10);
    expect(query.params).toEqual([
      { key: 'offset', value: 10 },
      { key: 'limit', value: 10 },
    ]);
  });

  test('should chain sort method with title asc', () => {
    const query = Query.create().sort('title', 'asc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'title' },
      { key: 'sortOrder', value: 'asc' },
    ]);
  });

  test('should chain sort method with rarity desc', () => {
    const query = Query.create().sort('rarity', 'desc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'rarity' },
      { key: 'sortOrder', value: 'desc' },
    ]);
  });

  test('should chain sort method with cardNumber asc', () => {
    const query = Query.create().sort('cardNumber', 'asc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'cardNumber' },
      { key: 'sortOrder', value: 'asc' },
    ]);
  });

  test('should chain sort method with pokedex desc', () => {
    const query = Query.create().sort('pokedex', 'desc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'pokedex' },
      { key: 'sortOrder', value: 'desc' },
    ]);
  });

  test('should chain sort method with illustrator asc', () => {
    const query = Query.create().sort('illustrator', 'asc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'illustrator' },
      { key: 'sortOrder', value: 'asc' },
    ]);
  });

  test('should chain sort method with createdAt desc', () => {
    const query = Query.create().sort('createdAt', 'desc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'createdAt' },
      { key: 'sortOrder', value: 'desc' },
    ]);
  });

  test('should chain sort method with relevance asc', () => {
    const query = Query.create().sort('relevance', 'asc');
    expect(query.params).toEqual([
      { key: 'sortBy', value: 'relevance' },
      { key: 'sortOrder', value: 'asc' },
    ]);
  });

  test('should support full method chaining', () => {
    const query = Query.create()
      .search('charizard')
      .category('tcg')
      .brand('pokemon')
      .language('en')
      .setName('Base Set')
      .paginate(1, 20)
      .sort('title', 'asc')
      .limit(5);

    expect(query.params).toContainEqual({ key: 'q', value: 'charizard' });
    expect(query.params).toContainEqual({ key: 'category', value: 'tcg' });
    expect(query.params).toContainEqual({ key: 'brand', value: 'pokemon' });
    expect(query.params).toContainEqual({ key: 'language', value: 'en' });
    expect(query.params).toContainEqual({ key: 'setName', value: 'Base Set' });
    expect(query.params).toContainEqual({ key: 'offset', value: 0 });
    expect(query.params).toContainEqual({ key: 'limit', value: 20 });
    expect(query.params).toContainEqual({ key: 'sortBy', value: 'title' });
    expect(query.params).toContainEqual({ key: 'sortOrder', value: 'asc' });
    expect(query.params).toContainEqual({ key: 'limit', value: 5 });
  });

  test('should support multiple calls to the same method', () => {
    const query = Query.create().search('pikachu').search('charizard');
    expect(query.params).toEqual([
      { key: 'q', value: 'pikachu' },
      { key: 'q', value: 'charizard' },
    ]);
  });
});
