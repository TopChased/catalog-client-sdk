import { describe, it, expect } from 'vitest';
import { Query } from '../src';

describe('Query', () => {
  it('should create an empty query', () => {
    const query = Query.create();
    expect(query.params).toEqual([]);
  });

  it('should add search parameter', () => {
    const query = Query.create().search('charizard');
    expect(query.params).toContainEqual({ key: 'q', value: 'charizard' });
  });

  it('should add category filter', () => {
    const query = Query.create().category('tcg');
    expect(query.params).toContainEqual({ key: 'category', value: 'tcg' });
  });

  it('should add brand filter', () => {
    const query = Query.create().brand('pokemon');
    expect(query.params).toContainEqual({ key: 'brand', value: 'pokemon' });
  });

  it('should add product type filter', () => {
    const query = Query.create().productType('card');
    expect(query.params).toContainEqual({ key: 'productType', value: 'card' });
  });

  it('should add platform filter', () => {
    const query = Query.create().platform('nintendo-switch');
    expect(query.params).toContainEqual({ key: 'platform', value: 'nintendo-switch' });
  });

  it('should add language filter', () => {
    const query = Query.create().language('en');
    expect(query.params).toContainEqual({ key: 'language', value: 'en' });
  });

  it('should add setName filter', () => {
    const query = Query.create().setName('Base Set');
    expect(query.params).toContainEqual({ key: 'setName', value: 'Base Set' });
  });

  it('should add setCode filter', () => {
    const query = Query.create().setCode('base1');
    expect(query.params).toContainEqual({ key: 'setCode', value: 'base1' });
  });

  it('should add illustrator filter', () => {
    const query = Query.create().illustrator('Ken Sugimori');
    expect(query.params).toContainEqual({ key: 'illustrator', value: 'Ken Sugimori' });
  });

  it('should add limit', () => {
    const query = Query.create().limit(20);
    expect(query.params).toContainEqual({ key: 'limit', value: 20 });
  });

  it('should add offset', () => {
    const query = Query.create().offset(10);
    expect(query.params).toContainEqual({ key: 'offset', value: 10 });
  });

  it('should add pagination', () => {
    const query = Query.create().paginate(2, 20);
    expect(query.params).toContainEqual({ key: 'offset', value: 20 });
    expect(query.params).toContainEqual({ key: 'limit', value: 20 });
  });

  it('should add sort parameters', () => {
    const query = Query.create().sort('title', 'asc');
    expect(query.params).toContainEqual({ key: 'sortBy', value: 'title' });
    expect(query.params).toContainEqual({ key: 'sortOrder', value: 'asc' });
  });

  it('should chain multiple filters', () => {
    const query = Query.create()
      .search('charizard')
      .category('tcg')
      .brand('pokemon')
      .language('en')
      .paginate(1, 20)
      .sort('title', 'asc');

    expect(query.params).toHaveLength(8);
    expect(query.params).toContainEqual({ key: 'q', value: 'charizard' });
    expect(query.params).toContainEqual({ key: 'category', value: 'tcg' });
    expect(query.params).toContainEqual({ key: 'brand', value: 'pokemon' });
    expect(query.params).toContainEqual({ key: 'language', value: 'en' });
    expect(query.params).toContainEqual({ key: 'offset', value: 0 });
    expect(query.params).toContainEqual({ key: 'limit', value: 20 });
    expect(query.params).toContainEqual({ key: 'sortBy', value: 'title' });
    expect(query.params).toContainEqual({ key: 'sortOrder', value: 'asc' });
  });
});
