import { describe, it, expect } from 'vitest';
import { buildURL, detectContext } from '../src';

describe('buildURL', () => {
  it('should build a URL with path segments', () => {
    const url = buildURL('http://localhost:3001/api/v1', ['catalog', 'search']);
    expect(url).toBe('http://localhost:3001/api/v1/catalog/search');
  });

  it('should build a URL with query parameters', () => {
    const url = buildURL('http://localhost:3001/api/v1', ['catalog', 'search'], [
      { key: 'q', value: 'charizard' },
      { key: 'category', value: 'tcg' },
      { key: 'limit', value: 20 },
    ]);
    expect(url).toContain('q=charizard');
    expect(url).toContain('category=tcg');
    expect(url).toContain('limit=20');
  });

  it('should handle empty path', () => {
    const url = buildURL('http://localhost:3001/api/v1', []);
    expect(url).toBe('http://localhost:3001/api/v1');
  });

  it('should handle boolean values', () => {
    const url = buildURL('http://localhost:3001/api/v1', ['test'], [
      { key: 'flag', value: true },
    ]);
    expect(url).toContain('flag=true');
  });
});

describe('detectContext', () => {
  it('should detect server context', () => {
    const context = detectContext();
    expect(context).toBe('server');
  });
});
