/**
 * Detect the current running context (browser vs server)
 */
export function detectContext(): 'browser' | 'server' {
  try {
    const isBrowser = typeof window !== 'undefined';
    return isBrowser ? 'browser' : 'server';
  } catch {
    return 'server';
  }
}

/**
 * Safely convert a value to string for URL search params.
 * Handles arrays by joining with comma, objects by JSON stringifying,
 * and primitives by direct conversion.
 */
function safeParamValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.join(',');
  }
  // Fallback for objects or other types
  return String(value);
}

/**
 * Build a URL with query parameters
 */
export function buildURL(
  baseURL: string,
  path: string[],
  searchParams?: Array<{ key: string; value: string | number | boolean | string[] }>
): string {
  const url = new URL(baseURL);

  // Append path segments to existing pathname
  const basePath = url.pathname.replace(/\/+$/, '');
  const extraPath = path.join('/');
  if (extraPath) {
    url.pathname = `${basePath}/${extraPath}`;
  } else {
    url.pathname = basePath;
  }

  // Append search params
  for (const param of searchParams ?? []) {
    url.searchParams.append(param.key, safeParamValue(param.value));
  }

  return url.toString();
}
