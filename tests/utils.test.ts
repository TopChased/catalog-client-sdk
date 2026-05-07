import { describe, test, expect } from '@jest/globals';
import { buildURL, detectContext, } from '../src';
import { safeParamValue } from '../src/utils';

const BASE_URL = 'http://localhost:3001/api/v1'

describe('detectContext', () => {
  test('should detect server context', () => {
    const context = detectContext();
    expect(context).toBe('server');
  });
});

describe('safeParamValue', () => {

  test('safely handles null', () => {
    const input = null
    const result = safeParamValue(input);
    expect(result).toBe('');
  });

  test('safely handles undefined', () => {
    const input = undefined
    const result = safeParamValue(input);
    expect(result).toBe('');
  });

  test('safely handles strings', () => {
    const input = 'string'
    const result = safeParamValue(input);
    expect(result).toBe('string');
  });

  test('safely handles numbers', () => {
    const input = 432
    const result = safeParamValue(input);
    expect(result).toBe('432');
  });

  test('safely handles booleans', () => {
    const input = false
    const result = safeParamValue(input);
    expect(result).toBe('false');
  });

  test('safely handles arrays', () => {
    const input = ['pokemon','yugioh','one peice']
    const result = safeParamValue(input);
    expect(result).toBe("pokemon,yugioh,one peice");
  });

  // test('safely handles objects', () => {
  //   const input = {
  //     card: {
  //       title: "Exodia"
  //     }
  //   }
  //   const result = safeParamValue(input);
  //   expect(result).toBe(JSON.stringify(1));
  // });
});

describe('buildURL', () => {
  test('should build a URL with path segments', () => {
    const url = buildURL(BASE_URL, ['catalog', 'search']);
    expect(url).toBe(`${BASE_URL}/catalog/search`);
  });

  test('should build a URL with query parameters', () => {
    const url = buildURL(BASE_URL, ['catalog', 'search'], [
      { key: 'q', value: 'charizard' },
      { key: 'category', value: 'tcg' },
      { key: 'limit', value: 20 },
    ]);
    expect(url).toContain('q=charizard');
    expect(url).toContain('category=tcg');
    expect(url).toContain('limit=20');
  });

  test('should handle empty path', () => {
    const url = buildURL(BASE_URL, []);
    expect(url).toBe(BASE_URL);
  });

  test('should handle path with trailing backslash by removing it', () => {
    const url = buildURL(`${BASE_URL}/`, []);
    expect(url).toBe(BASE_URL);
  });

  test('should handle boolean values', () => {
    const url = buildURL(BASE_URL, ['test'], [
      { key: 'flag', value: true },
    ]);
    expect(url).toContain('flag=true');
  });
});