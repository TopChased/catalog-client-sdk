import { buildURL, detectContext } from './utils';
import {
  type CatalogItem,
  type CatalogSearchResponse,
  type AutocompleteResponse,
  type AutocompleteSuggestion,
  Context,
} from './types';

/**
 * CatalogClient - SDK for communicating with the Catalog Engine API.
 *
 * Provides a fluent interface for searching and querying catalog items
 * (TCG cards, video games, consoles, etc.) from the Catalog Engine microservice.
 *
 * Works in both Node.js and browser environments.
 *
 * Basic usage:
 * ```ts
 * const client = new CatalogClient('http://localhost:3001/api/v1');
 *
 * // Search for Pokemon cards
 * const results = await client.search()
 *   .query('charizard')
 *   .category('tcg')
 *   .brand('pokemon')
 *   .execute();
 *
 * // Get a single item by ID
 * const item = await client.getItem('some-id');
 *
 * // Autocomplete
 * const suggestions = await client.autocomplete('char');
 * ```
 */
export default class CatalogClient {
  /**
   * The fetch implementation used for making HTTP requests.
   * Auto-detects browser vs server context.
   */
  public static readonly fetch: typeof fetch =
    detectContext() === Context.Browser
      ? (...params: Parameters<typeof fetch>) => globalThis.fetch(...params)
      : fetch;

  /**
   * The base URL of the Catalog Engine API.
   * Example: `http://localhost:3001/api/v1`
   */
  private baseURL: string;

  /**
   * Create a new CatalogClient instance.
   *
   * @param baseURL - The base URL of the Catalog Engine API (e.g., `http://localhost:3001/api/v1`)
   */
  public constructor(baseURL: string) {
    // Normalize: remove trailing slash
    this.baseURL = baseURL.replace(/\/+$/, '');
  }

  /**
   * Get the current base URL
   */
  public getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Set a new base URL
   */
  public setBaseURL(url: string): void {
    this.baseURL = url.replace(/\/+$/, '');
  }

  // ============ SEARCH ============

  /**
   * Create a search query builder. Call `.execute()` to run the search.
   *
   * ```ts
   * const results = await client.search()
   *   .query('charizard')
   *   .category('tcg')
   *   .brand('pokemon')
   *   .paginate(1, 20)
   *   .execute();
   * ```
   */
  public search(): SearchQueryBuilder {
    return new SearchQueryBuilder(this);
  }

  /**
   * Execute a search with raw filters.
   *
   * ```ts
   * const results = await client.searchWithFilters({
   *   q: 'charizard',
   *   category: 'tcg',
   *   brand: 'pokemon',
   *   limit: 20,
   * });
   * ```
   */
  public async searchWithFilters(
    filters: Record<string, string | number | boolean | undefined | string[]>
  ): Promise<CatalogSearchResponse> {
    const params: Array<{ key: string; value: string | number | boolean | string[] }> = [];

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== '') {
        params.push({ key, value });
      }
    }

    const url = buildURL(`${this.baseURL}/catalog/search`, [], params);
    return this.fetchJSON<CatalogSearchResponse>(url);
  }

  // ============ GET ITEM BY ID ============

  /**
   * Get a single catalog item by its ID.
   *
   * ```ts
   * const item = await client.getItem('abc123');
   * if (item) {
   *   console.log(item.title);
   * }
   * ```
   */
  public async getItem(id: string): Promise<CatalogItem | null> {
    const url = `${this.baseURL}/catalog/${encodeURIComponent(id)}`;
    return this.fetchJSON<CatalogItem | null>(url);
  }

  // ============ LIST ITEMS ============

  /**
   * List catalog items with optional filters.
   *
   * ```ts
   * const results = await client.listItems({
   *   category: 'tcg',
   *   brand: 'pokemon',
   *   limit: 50,
   * });
   * ```
   */
  public async listItems(
    filters?: Record<string, string | number | boolean | undefined | string[]>
  ): Promise<CatalogSearchResponse> {
    const params: Array<{ key: string; value: string | number | boolean | string[] }> = [];

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== '') {
          params.push({ key, value });
        }
      }
    }

    const url = buildURL(`${this.baseURL}/catalog`, [], params);
    return this.fetchJSON<CatalogSearchResponse>(url);
  }

  // ============ AUTOCOMPLETE ============

  /**
   * Get autocomplete suggestions for a search query.
   *
   * ```ts
   * const suggestions = await client.autocomplete('char');
   * const fiveSuggestions = await client.autocomplete('char', undefined, undefined, 5);
   * ```
   */
  public async autocomplete(
    q: string,
    category?: string,
    brand?: string,
    limit?: number
  ): Promise<AutocompleteSuggestion[]> {
    const params: Array<{ key: string; value: string | number | boolean }> = [
      { key: 'q', value: q },
    ];

    if (category) {
      params.push({ key: 'category', value: category });
    }
    if (brand) {
      params.push({ key: 'brand', value: brand });
    }
    if (limit !== undefined) {
      params.push({ key: 'limit', value: limit });
    }


    const url = buildURL(`${this.baseURL}/catalog/autocomplete`, [], params);
    const response = await this.fetchJSON<AutocompleteResponse>(url);
    return response?.suggestions ?? [];
  }

  // ============ INTERNAL ============

  /**
   * Internal fetch method that handles errors and JSON parsing.
   */
  private async fetchJSON<T>(url: string): Promise<T> {
    const resp = await CatalogClient.fetch(url, {
      headers: {
        'user-agent': '@catalog/client/1.0.0',
        accept: 'application/json',
      },
    });

    // Throw on server errors
    if (resp.status >= 500) {
      try {
        const json = JSON.stringify(await resp.json());
        throw new Error(json);
      } catch {
        throw new Error('Catalog Engine server responded with an error');
      }
    }

    // Return null for 404s
    if (resp.status === 404) {
      return null as T;
    }

    // Return undefined for other non-200 responses
    if (resp.status !== 200) {
      return undefined as T;
    }

    return resp.json() as Promise<T>;
  }
}

/**
 * Fluent search query builder.
 *
 * Allows chaining filter methods before executing the search.
 *
 * ```ts
 * const results = await client.search()
 *   .query('charizard')
 *   .category('tcg')
 *   .brand('pokemon')
 *   .language('en')
 *   .paginate(1, 20)
 *   .sort('title', 'asc')
 *   .execute();
 * ```
 */
export class SearchQueryBuilder {
  private readonly client: CatalogClient;
  private readonly filters: Record<string, string | number | boolean | undefined> = {};

  public constructor(client: CatalogClient) {
    this.client = client;
  }

  /** Set the search text query */
  public query(q: string): this {
    this.filters.q = q;
    return this;
  }

  /** Filter by category (tcg, video_game, video_game_consoles) */
  public category(category: string): this {
    this.filters.category = category;
    return this;
  }

  /** Filter by TCG brand (pokemon, yugioh, one_piece) - accepts single or multiple */
  public brand(brand: string | string[]): this {
    this.filters.brand = Array.isArray(brand) ? brand.join(',') : brand;
    return this;
  }

  /** Filter by product type (card, sealed_product) */
  public productType(productType: string): this {
    this.filters.productType = productType;
    return this;
  }

  /** Filter by platform (for video games/consoles) */
  public platform(platform: string): this {
    this.filters.platform = platform;
    return this;
  }

  /** Filter by card language - accepts single or multiple (comma-separated) */
  public language(language: string | string[]): this {
    this.filters.language = Array.isArray(language) ? language.join(',') : language;
    return this;
  }

  /** Filter by Pokemon name (filters the pokemon field on PokemonCardDetails) */
  public pokemonName(name: string): this {
    this.filters.pokemon = name;
    return this;
  }

  /** Filter by card type (trainer, pokemon, energy) - accepts single or multiple */
  public types(types: string | string[]): this {
    this.filters.cardType = Array.isArray(types) ? types.join(',') : types;
    return this;
  }

  /** Filter by card rarity - accepts single or multiple */
  public rarity(rarity: string | string[]): this {
    this.filters.rarity = Array.isArray(rarity) ? rarity.join(',') : rarity;
    return this;
  }

  /** Filter by set name */
  public setName(setName: string): this {
    this.filters.setName = setName;
    return this;
  }

  /** Filter by set code */
  public setCode(setCode: string): this {
    this.filters.setCode = setCode;
    return this;
  }

  /** Filter by illustrator */
  public illustrator(illustrator: string): this {
    this.filters.illustrator = illustrator;
    return this;
  }

  /** Set the number of results per page */
  public limit(limit: number): this {
    this.filters.limit = limit;
    return this;
  }

  /** Set the offset for pagination */
  public offset(offset: number): this {
    this.filters.offset = offset;
    return this;
  }

  /**
   * Set a cursor for cursor-based pagination.
   * Pass the `nextCursor` value from a previous search response to get the next page.
   * When a cursor is set, offset is ignored by the API.
   */
  public cursor(cursor: string): this {
    this.filters.cursor = cursor;
    return this;
  }

  /** Set pagination (page number and items per page) */
  public paginate(page: number, itemsPerPage: number): this {
    this.filters.offset = (page - 1) * itemsPerPage;
    this.filters.limit = itemsPerPage;
    return this;
  }

  /** Set the sort field and order */
  public sort(field: string, order: 'asc' | 'desc'): this {
    this.filters.sortBy = field;
    this.filters.sortOrder = order;
    return this;
  }

  /**
   * Execute the search and return results.
   */
  public async execute(): Promise<CatalogSearchResponse> {
    return this.client.searchWithFilters(this.filters);
  }
}
