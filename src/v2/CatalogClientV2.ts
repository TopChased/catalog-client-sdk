import { detectContext } from '../utils';
import { Context } from '../types';
import type {
  ApiErrorBody,
  CatalogCharacter,
  CatalogProduct,
  CatalogSet,
  IllustratorListItem,
  LanguageCode,
  Page,
  ProductSummary,
  SearchPage,
  SearchParams,
  Suggestions,
  TcgGameSlug,
  VariantPrices,
} from './types';

/** A non-404 error response from the read API. */
export class CatalogApiError extends Error {
  public constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'CatalogApiError';
  }
}

/**
 * Client for omni's read API (`/api/v2`).
 *
 * ```ts
 * const client = new CatalogClientV2('http://localhost:3000/api/v2');
 * const card = await client.getCard('pokemon', 'en', 'base1', '4');
 * const product = await client.getProduct('prd_vyo2bf2d9kn7');
 * ```
 *
 * Lookups return `null` when nothing is found; other failures throw
 * `CatalogApiError`.
 */
export default class CatalogClientV2 {
  /** The fetch implementation; replaceable in tests. */
  public static fetch: typeof fetch =
    detectContext() === Context.Browser
      ? (...params: Parameters<typeof fetch>) => globalThis.fetch(...params)
      : fetch;

  private baseURL: string;

  /** @param baseURL - e.g. `http://localhost:3000/api/v2` */
  public constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/+$/, '');
  }

  public getBaseURL(): string {
    return this.baseURL;
  }

  /** A product by publicId, with its set, characters and variants. Merged IDs resolve to the surviving product. */
  public getProduct(publicId: string): Promise<CatalogProduct | null> {
    return this.lookup(`/products/${encodeURIComponent(publicId)}`);
  }

  /**
   * Several products by publicId, in the order given; `null` for any not
   * found. Requests are split into batches of 100.
   */
  public async getProducts(publicIds: string[]): Promise<Array<CatalogProduct | null>> {
    const results: Array<CatalogProduct | null> = [];
    for (let i = 0; i < publicIds.length; i += 100) {
      const ids = publicIds.slice(i, i + 100);
      const { docs } = await this.get<{ docs: Array<CatalogProduct | null> }>(`/products${query({ ids: ids.join(',') })}`);
      results.push(...docs);
    }
    return results;
  }

  /** A card by game, language, set code and number; "4" also finds "004". */
  public getCard(
    tcgGame: TcgGameSlug,
    language: LanguageCode | string,
    setCode: string,
    number: string,
  ): Promise<CatalogProduct | null> {
    const path = [tcgGame, language, setCode, number].map(encodeURIComponent).join('/');
    return this.lookup(`/cards/${path}`);
  }

  /** Every active product of a set, in card-number order; `null` when the set doesn't exist. */
  public async listSetProducts(
    tcgGame: TcgGameSlug,
    language: LanguageCode | string,
    setCode: string,
  ): Promise<{ set: CatalogSet; products: ProductSummary[] } | null> {
    const path = [tcgGame, language, setCode].map(encodeURIComponent).join('/');
    const result = await this.lookup<{ set: CatalogSet; docs: ProductSummary[] }>(`/sets/${path}/products`);
    return result && { set: result.set, products: result.docs };
  }

  /** Latest prices of one variant. */
  public getVariantPrices(variantPublicId: string): Promise<VariantPrices | null> {
    return this.lookup(`/variants/${encodeURIComponent(variantPublicId)}/prices`);
  }

  /** Illustrators by name, paged, with their product counts and games. */
  public listIllustrators(
    params: { q?: string; limit?: number; page?: number } = {},
  ): Promise<Page<IllustratorListItem>> {
    return this.get(`/illustrators${query(params)}`);
  }

  /** Active characters; Pokémon in Pokédex order with forms after their species. */
  public async listCharacters(
    params: { tcgGame?: TcgGameSlug; kind?: CatalogCharacter['kind'] } = {},
  ): Promise<CatalogCharacter[]> {
    return (await this.get<{ docs: CatalogCharacter[] }>(`/characters${query(params)}`)).docs;
  }

  /** Active sets, newest first. `series` is a series slug or publicId. */
  public async listSets(
    params: { tcgGame?: TcgGameSlug; language?: LanguageCode | string; series?: string } = {},
  ): Promise<CatalogSet[]> {
    return (await this.get<{ docs: CatalogSet[] }>(`/sets${query(params)}`)).docs;
  }

  /** Products matching text and filters, ranked or sorted, as full products. */
  public search(params: SearchParams = {}): Promise<SearchPage> {
    return this.get(`/search${query(params)}`);
  }

  /**
   * Search-bar suggestions for `q`: characters, sets and products in one call.
   * Takes the search filters, which scope the products (and `tcgGame` and
   * `language` the characters and sets).
   */
  public suggest(params: SearchParams & { q: string }): Promise<Suggestions> {
    return this.get(`/search/suggest${query(params)}`);
  }

  private async lookup<T>(path: string): Promise<T | null> {
    try {
      return await this.get<T>(path);
    } catch (error) {
      if (error instanceof CatalogApiError && error.status === 404) return null;
      throw error;
    }
  }

  private async get<T>(path: string): Promise<T> {
    const response = await CatalogClientV2.fetch(`${this.baseURL}${path}`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as ApiErrorBody | null;
      throw new CatalogApiError(
        response.status,
        body?.error?.message ?? `Request failed with status ${response.status}`,
      );
    }
    return (await response.json()) as T;
  }
}

type QueryValue = string | number | boolean | Array<string | number> | undefined;

/** Lists are comma-separated; empty values and lists are left out. */
function query(params: object): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params) as Array<[string, QueryValue]>) {
    const text = Array.isArray(value) ? value.join(',') : value;
    if (text !== undefined && text !== '') search.set(key, String(text));
  }
  const text = search.toString();
  return text ? `?${text}` : '';
}
