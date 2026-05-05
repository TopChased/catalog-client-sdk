/**
 * Query builder for constructing search/filter parameters
 * to be sent to the Catalog Engine API.
 *
 * Usage:
 * ```ts
 * const query = Query.create()
 *   .search('charizard')
 *   .category('tcg')
 *   .brand('pokemon')
 *   .language('en')
 *   .setName('Base Set')
 *   .paginate(1, 20)
 *   .sort('title', 'asc');
 * ```
 */
export default class Query {
  public params: Array<{ key: string; value: string | number | boolean }> = [];

  /**
   * Create a new Query instance
   */
  public static create(): Query {
    return new Query();
  }

  /**
   * Set the search text query
   */
  public search(q: string): this {
    this.params.push({ key: 'q', value: q });
    return this;
  }

  /**
   * Filter by category (tcg, video_game, video_game_consoles)
   */
  public category(category: string): this {
    this.params.push({ key: 'category', value: category });
    return this;
  }

  /**
   * Filter by TCG brand (pokemon, yugioh, one_piece)
   */
  public brand(brand: string): this {
    this.params.push({ key: 'brand', value: brand });
    return this;
  }

  /**
   * Filter by product type (card, sealed_product)
   */
  public productType(productType: string): this {
    this.params.push({ key: 'productType', value: productType });
    return this;
  }

  /**
   * Filter by platform (for video games/consoles)
   */
  public platform(platform: string): this {
    this.params.push({ key: 'platform', value: platform });
    return this;
  }

  /**
   * Filter by card language
   */
  public language(language: string): this {
    this.params.push({ key: 'language', value: language });
    return this;
  }

  /**
   * Filter by set name
   */
  public setName(setName: string): this {
    this.params.push({ key: 'setName', value: setName });
    return this;
  }

  /**
   * Filter by set code
   */
  public setCode(setCode: string): this {
    this.params.push({ key: 'setCode', value: setCode });
    return this;
  }

  /**
   * Filter by illustrator
   */
  public illustrator(illustrator: string): this {
    this.params.push({ key: 'illustrator', value: illustrator });
    return this;
  }

  /**
   * Set the number of results per page
   */
  public limit(limit: number): this {
    this.params.push({ key: 'limit', value: limit });
    return this;
  }

  /**
   * Set the offset for pagination
   */
  public offset(offset: number): this {
    this.params.push({ key: 'offset', value: offset });
    return this;
  }

  /**
   * Set pagination (page number and items per page)
   */
  public paginate(page: number, itemsPerPage: number): this {
    this.params.push(
      { key: 'offset', value: (page - 1) * itemsPerPage }, 
      { key: 'limit', value: itemsPerPage }
    );
    return this;
  }

  /**
   * Set the sort field and order
   */
  public sort(field: string, order: 'asc' | 'desc'): this {
    this.params.push(
      { key: 'sortBy', value: field }, 
      { key: 'sortOrder', value: order }
    );
    return this;
  }
}
