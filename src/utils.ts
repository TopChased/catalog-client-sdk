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
 * Build a URL with query parameters
 */
export function buildURL(
  baseURL: string,
  path: string[],
  searchParams?: Array<{ key: string; value: string | number | boolean }>
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
    url.searchParams.append(param.key, param.value.toString());
  }

  return url.toString();
}
