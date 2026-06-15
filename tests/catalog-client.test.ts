import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import CatalogClient, { SearchQueryBuilder } from '../src/CatalogClient';

const BASE_URL = 'http://localhost:3001/api/v1';

// Mock fetch on CatalogClient's static property
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
(CatalogClient as { fetch: typeof fetch }).fetch = mockFetch;

describe('CatalogClient', () => {
  let client: CatalogClient;

  beforeEach(() => {
    mockFetch.mockReset();
    client = new CatalogClient(BASE_URL);
  });

  describe('constructor', () => {
    test('should create a client with the given base URL', () => {
      expect(client.getBaseURL()).toBe(BASE_URL);
    });

    test('should strip trailing slash from base URL', () => {
      const c = new CatalogClient('http://localhost:3001/api/v1/');
      expect(c.getBaseURL()).toBe('http://localhost:3001/api/v1');
    });
  });

  describe('setBaseURL', () => {
    test('should update the base URL', () => {
      client.setBaseURL('http://localhost:3002/api/v2');
      expect(client.getBaseURL()).toBe('http://localhost:3002/api/v2');
    });

    test('should strip trailing slash from new base URL', () => {
      client.setBaseURL('http://localhost:3001/api/v1/');
      expect(client.getBaseURL()).toBe('http://localhost:3001/api/v1');
    });
  });

  describe('search', () => {
    test('should return a SearchQueryBuilder', () => {
      const builder = client.search();
      expect(builder).toBeInstanceOf(SearchQueryBuilder);
    });
  });

  describe('searchWithFilters', () => {
    test('should send a GET request to /catalog/search with filters', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ items: [], total: 0, page: 1, limit: 20, hasMore: false }),
      } as Response);

      const result = await client.searchWithFilters({
        q: 'charizard',
        category: 'tcg',
        brand: 'pokemon',
        limit: 20,
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('/catalog/search');
      expect(url).toContain('q=charizard');
      expect(url).toContain('category=tcg');
      expect(url).toContain('brand=pokemon');
      expect(url).toContain('limit=20');
      expect(result).toEqual({ items: [], total: 0, page: 1, limit: 20, hasMore: false });
    });

    test('should omit undefined and empty filters', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ items: [], total: 0, page: 1, limit: 10, hasMore: false }),
      } as Response);

      await client.searchWithFilters({
        q: 'pikachu',
        category: undefined,
        brand: '',
      });

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('q=pikachu');
      expect(url).not.toContain('category');
      expect(url).not.toContain('brand');
    });
  });

  describe('getItem', () => {
    test('should send a GET request to /catalog/:id', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ _id: 'abc123', title: 'Charizard' }),
      } as Response);

      const result = await client.getItem('abc123');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toBe(`${BASE_URL}/catalog/abc123`);
      expect(result).toEqual({ _id: 'abc123', title: 'Charizard' });
    });

    test('should return null on 404', async () => {
      mockFetch.mockResolvedValue({
        status: 404,
        json: async () => ({}),
      } as Response);

      const result = await client.getItem('nonexistent');
      expect(result).toBeNull();
    });

    test('should return undefined on other non-200 status', async () => {
      mockFetch.mockResolvedValue({
        status: 400,
        json: async () => ({}),
      } as Response);

      const result = await client.getItem('bad-request');
      expect(result).toBeUndefined();
    });
  });

  describe('getCard', () => {
    test('should send a GET request to /catalog/card/:language/:setCode/:cardNumber', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ _id: 'abc', title: 'Charizard' }),
      } as Response);

      const result = await client.getCard('en', 'sm8', '1');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toBe(`${BASE_URL}/catalog/card/en/sm8/1`);
      expect(result).toEqual({ _id: 'abc', title: 'Charizard' });
    });

    test('should URL-encode special characters in parameters', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ _id: 'abc', title: 'Test' }),
      } as Response);

      await client.getCard('en', 'swsh1', '1/2');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('/catalog/card/en/swsh1/1%2F2');
    });
  });

  describe('listItems', () => {
    test('should send a GET request to /catalog with filters', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ items: [], total: 0, page: 1, limit: 50, hasMore: false }),
      } as Response);

      const result = await client.listItems({ category: 'tcg', brand: 'pokemon', limit: 50 });

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('/catalog');
      expect(url).not.toContain('/search');
      expect(url).toContain('category=tcg');
      expect(url).toContain('brand=pokemon');
      expect(url).toContain('limit=50');
      expect(result).toEqual({ items: [], total: 0, page: 1, limit: 50, hasMore: false });
    });

    test('should work without filters', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ items: [], total: 0, page: 1, limit: 10, hasMore: false }),
      } as Response);

      const result = await client.listItems();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toBe(`${BASE_URL}/catalog`);
      expect(result).toEqual({ items: [], total: 0, page: 1, limit: 10, hasMore: false });
    });
  });

  describe('autocomplete', () => {
    test('should send a GET request to /catalog/autocomplete with query', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [{ _id: '1', title: 'Charizard', normalizedTitle: 'charizard', slug: 'charizard', category: 'tcg' }] }),
      } as Response);

      const result = await client.autocomplete('char');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('/catalog/autocomplete');
      expect(url).toContain('q=char');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Charizard');
    });

    test('should include category filter when provided', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('char', 'tcg');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('category=tcg');
    });

    test('should include brand filter when provided', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('char', undefined, 'pokemon');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('brand=pokemon');
    });

    test('should include limit filter when provided', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('char', undefined, undefined, undefined, 5);

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('limit=5');
    });

    test('should include language filter when provided', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('char', undefined, undefined, 'en');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('language=en');
    });

    test('should omit language filter when not provided', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('char');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).not.toContain('language');
    });

    test('should return empty array when response has no suggestions', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({}),
      } as Response);

      const result = await client.autocomplete('char');
      expect(result).toEqual([]);
    });

    test('should include all filters together', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ suggestions: [] }),
      } as Response);

      await client.autocomplete('charizard', 'tcg', 'pokemon', 'en', 10);

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('q=charizard');
      expect(url).toContain('category=tcg');
      expect(url).toContain('brand=pokemon');
      expect(url).toContain('limit=10');
      expect(url).toContain('language=en');
    });
  });

  describe('getIllustrators', () => {
    test('should send a GET request to /illustrators', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ illustrators: [], total: 0 }),
      } as Response);

      const result = await client.getIllustrators();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('/illustrators');
      expect(result).toEqual({ illustrators: [], total: 0 });
    });

    test('should include search and pagination params', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ illustrators: [], total: 0 }),
      } as Response);

      await client.getIllustrators({ q: 'sugimori', limit: 10, offset: 0 });

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('q=sugimori');
      expect(url).toContain('limit=10');
      expect(url).toContain('offset=0');
    });
  });

  describe('getIllustrator', () => {
    test('should send a GET request to /illustrators/:id', async () => {
      mockFetch.mockResolvedValue({
        status: 200,
        json: async () => ({ _id: 'illustrator-ken-sugimori', name: 'Ken Sugimori', cardCount: 100 }),
      } as Response);

      const result = await client.getIllustrator('illustrator-ken-sugimori');

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toBe(`${BASE_URL}/illustrators/illustrator-ken-sugimori`);
      expect(result).toEqual({ _id: 'illustrator-ken-sugimori', name: 'Ken Sugimori', cardCount: 100 });
    });
  });

  describe('error handling', () => {
    test('should throw on 500 status', async () => {
      mockFetch.mockResolvedValue({
        status: 500,
        json: async () => ({ error: 'Internal Server Error' }),
      } as Response);

      await expect(client.getItem('abc')).rejects.toThrow();
    });

    test('should throw on network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(client.getItem('abc')).rejects.toThrow('Network error');
    });
  });
});

describe('SearchQueryBuilder', () => {
  let client: CatalogClient;

  beforeEach(() => {
    mockFetch.mockReset();
    client = new CatalogClient(BASE_URL);
    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ items: [], total: 0, page: 1, limit: 20, hasMore: false }),
    } as Response);
  });

  test('should build and execute a search with chained filters', async () => {
    const result = await client.search()
      .query('charizard')
      .category('tcg')
      .brand('pokemon')
      .language('en')
      .paginate(1, 20)
      .sort('title', 'asc')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('q=charizard');
    expect(url).toContain('category=tcg');
    expect(url).toContain('brand=pokemon');
    expect(url).toContain('language=en');
    expect(url).toContain('offset=0');
    expect(url).toContain('limit=20');
    expect(url).toContain('sortBy=title');
    expect(url).toContain('sortOrder=asc');
    expect(result).toEqual({ items: [], total: 0, page: 1, limit: 20, hasMore: false });
  });

  test('should support brand as array (comma-separated)', async () => {
    await client.search()
      .brand(['pokemon', 'yugioh'])
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('brand=pokemon%2Cyugioh');
  });

  test('should support riftbound brand filter', async () => {
    await client.search()
      .brand('riftbound')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('brand=riftbound');
  });

  test('should support character filter', async () => {
    await client.search()
      .character('lux')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('character=lux');
  });

  test('should support language as array (comma-separated)', async () => {
    await client.search()
      .language(['en', 'ja'])
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('language=en%2Cja');
  });

  test('should support cursor-based pagination', async () => {
    await client.search()
      .cursor('next-page-cursor')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('cursor=next-page-cursor');
  });

  test('should support productType filter', async () => {
    await client.search()
      .productType('card')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('productType=card');
  });

  test('should support platform filter', async () => {
    await client.search()
      .platform('nintendo_switch')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('platform=nintendo_switch');
  });

  test('should support character filter', async () => {
    await client.search()
      .character('Pikachu')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('character=Pikachu');
  });

  test('should support character with include evolutions filter', async () => {
    await client.search()
      .brand('pokemon')
      .character('Pikachu')
      .includeEvolutions(true)
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('brand=pokemon&character=Pikachu&includeEvolutions=true');
  });

  test('should support types filter', async () => {
    await client.search()
      .types('pokemon')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('cardType=pokemon');
  });

  test('should support rarity filter', async () => {
    await client.search()
      .rarity('rare')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('rarity=rare');
  });

  test('should support setName filter', async () => {
    await client.search()
      .setName('Base Set')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('setName=Base+Set');
  });

  test('should support setCode filter', async () => {
    await client.search()
      .setCode('sm8')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('setCode=sm8');
  });

  test('should support illustrator filter', async () => {
    await client.search()
      .illustrator('Ken Sugimori')
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('illustrator=Ken+Sugimori');
  });

  test('should support limit filter', async () => {
    await client.search()
      .limit(5)
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('limit=5');
  });

  test('should support offset filter', async () => {
    await client.search()
      .offset(10)
      .execute();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('offset=10');
  });

  describe('sort', () => {
    test('should sort by rarity asc', async () => {
      await client.search()
        .sort('rarity', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=rarity');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by rarity desc', async () => {
      await client.search()
        .sort('rarity', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=rarity');
      expect(url).toContain('sortOrder=desc');
    });

    test('should sort by cardNumber asc', async () => {
      await client.search()
        .sort('cardNumber', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=cardNumber');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by cardNumber desc', async () => {
      await client.search()
        .sort('cardNumber', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=cardNumber');
      expect(url).toContain('sortOrder=desc');
    });

    test('should sort by pokedex desc', async () => {
      await client.search()
        .sort('pokedex', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=pokedex');
      expect(url).toContain('sortOrder=desc');
    });


    test('should sort by pokedex asc', async () => {
      await client.search()
        .sort('pokedex', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=pokedex');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by illustrator asc', async () => {
      await client.search()
        .sort('illustrator', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=illustrator');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by illustrator desc', async () => {
      await client.search()
        .sort('illustrator', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=illustrator');
      expect(url).toContain('sortOrder=desc');
    });

    test('should sort by createdAt desc', async () => {
      await client.search()
        .sort('createdAt', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=createdAt');
      expect(url).toContain('sortOrder=desc');
    });

    test('should sort by title asc', async () => {
      await client.search()
        .sort('title', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=title');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by title desc', async () => {
      await client.search()
        .sort('title', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=title');
      expect(url).toContain('sortOrder=desc');
    });

    test('should sort by relevance asc', async () => {
      await client.search()
        .sort('relevance', 'asc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=relevance');
      expect(url).toContain('sortOrder=asc');
    });

    test('should sort by relevance desc', async () => {
      await client.search()
        .sort('relevance', 'desc')
        .execute();

      const url = mockFetch.mock.calls[0][0] as string;
      expect(url).toContain('sortBy=relevance');
      expect(url).toContain('sortOrder=desc');
    });
  });
});
