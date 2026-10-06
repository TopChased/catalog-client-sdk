import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import CatalogClientV2, { CatalogApiError } from '../src/v2/CatalogClientV2';

const BASE_URL = 'http://localhost:3000/api/v2';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
CatalogClientV2.fetch = mockFetch;

const respond = (status: number, body: unknown) =>
  mockFetch.mockResolvedValueOnce(
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }),
  );

describe('CatalogClientV2', () => {
  let client: CatalogClientV2;

  beforeEach(() => {
    mockFetch.mockReset();
    client = new CatalogClientV2(`${BASE_URL}/`);
  });

  test('strips a trailing slash from the base URL', () => {
    expect(client.getBaseURL()).toBe(BASE_URL);
  });

  test('getCard encodes each path segment', async () => {
    respond(200, { publicId: 'prd_1', title: 'Charizard' });
    const card = await client.getCard('pokemon', 'en', 'base1', '4/102');
    expect(card).toEqual({ publicId: 'prd_1', title: 'Charizard' });
    expect(mockFetch.mock.calls[0][0]).toBe(`${BASE_URL}/cards/pokemon/en/base1/4%2F102`);
  });

  test('lookups return null on 404', async () => {
    respond(404, { error: { status: 404, message: 'Product not found.' } });
    expect(await client.getProduct('prd_nope')).toBeNull();
  });

  test('other errors throw CatalogApiError with the API message', async () => {
    respond(500, { error: { status: 500, message: 'Internal error.' } });
    await expect(client.getVariantPrices('var_1')).rejects.toEqual(
      new CatalogApiError(500, 'Internal error.'),
    );
  });

  test('a list 404 (unknown game) throws instead of returning null', async () => {
    respond(404, { error: { status: 404, message: 'TCG game "yugioh" not found.' } });
    await expect(client.listSets({ tcgGame: 'yugioh' })).rejects.toBeInstanceOf(CatalogApiError);
  });

  test('list methods send only the given params and unwrap docs', async () => {
    respond(200, { docs: [{ publicId: 'chr_1', name: 'Bulbasaur' }] });
    const characters = await client.listCharacters({ tcgGame: 'pokemon' });
    expect(characters).toEqual([{ publicId: 'chr_1', name: 'Bulbasaur' }]);
    expect(mockFetch.mock.calls[0][0]).toBe(`${BASE_URL}/characters?tcgGame=pokemon`);

    respond(200, { docs: [], page: 2, totalPages: 2, totalDocs: 101 });
    await client.listIllustrators({ q: 'arita', page: 2 });
    expect(mockFetch.mock.calls[1][0]).toBe(`${BASE_URL}/illustrators?q=arita&page=2`);

    respond(200, { docs: [] });
    await client.listSets();
    expect(mockFetch.mock.calls[2][0]).toBe(`${BASE_URL}/sets`);
  });

  test('getProducts batches ids and keeps nulls for unknown products', async () => {
    respond(200, { docs: [{ publicId: 'prd_1' }, null] });
    expect(await client.getProducts(['prd_1', 'prd_x'])).toEqual([{ publicId: 'prd_1' }, null]);
    expect(mockFetch.mock.calls[0][0]).toBe(`${BASE_URL}/products?ids=prd_1%2Cprd_x`);
    expect(await client.getProducts([])).toEqual([]);
  });

  test('listSetProducts unwraps docs and returns null for an unknown set', async () => {
    respond(200, { set: { code: 'base1' }, docs: [{ publicId: 'prd_1' }] });
    expect(await client.listSetProducts('pokemon', 'en', 'base1')).toEqual({
      set: { code: 'base1' },
      products: [{ publicId: 'prd_1' }],
    });
    expect(mockFetch.mock.calls[0][0]).toBe(`${BASE_URL}/sets/pokemon/en/base1/products`);
    respond(404, { error: { status: 404, message: 'Set not found.' } });
    expect(await client.listSetProducts('pokemon', 'en', 'nope')).toBeNull();
  });

  test('search joins list params, keeps booleans and drops empty values', async () => {
    respond(200, { docs: [], totalDocs: 0, offset: 0, limit: 20, hasMore: false, cardNumber: null });
    await client.search({
      q: 'charizard 4/102',
      tcgGame: ['pokemon', 'riftbound'],
      language: [],
      rarity: '',
      includeEvolutions: true,
      offset: 0,
    });
    expect(mockFetch.mock.calls[0][0]).toBe(
      `${BASE_URL}/search?q=charizard+4%2F102&tcgGame=pokemon%2Criftbound&includeEvolutions=true&offset=0`,
    );
  });

  test('suggest calls /search/suggest', async () => {
    respond(200, { characters: [], sets: [], products: [], exactCharacter: null });
    await client.suggest({ q: 'pika', tcgGame: 'pokemon' });
    expect(mockFetch.mock.calls[0][0]).toBe(`${BASE_URL}/search/suggest?q=pika&tcgGame=pokemon`);
  });
});
