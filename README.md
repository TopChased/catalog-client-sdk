# @TopChased/catalog-client-sdk

SDK for communicating with the **Catalog Engine API** — a language binding for frontend applications.

Inspired by the [TCGdex JavaScript SDK](https://github.com/tcgdex/javascript-sdk), this SDK provides a fluent, type-safe interface for querying catalog items (TCG cards, video games, consoles, etc.) from the Catalog Engine microservice.

Works in both **Node.js** and **browser** environments.

## Installation

# Build Locally
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
# Create the package to later reference and build from
npm pack
```

```bash
npm install /path/to/catalog/client
# or
yarn add /path/to/catalog/client
# or
pnpm add /path/to/catalog/client
```

## Publish 

```bash
npm publish --access public
```

## Quick Start

```ts
import { CatalogClient } from '@topchased/catalog-client-sdk';

// Create a client pointing to your Catalog Engine API
const client = new CatalogClient('http://localhost:3001/api/v1');

// Search for Pokemon cards
const results = await client.search()
  .query('charizard')
  .category('tcg')
  .brand('pokemon')
  .language('en')
  .paginate(1, 20)
  .execute();

console.log(results.items); // Array of catalog items
console.log(`Found ${results.total} results`);
```

## API Reference

### CatalogClient

The main SDK class. Create an instance with the base URL of your Catalog Engine API.

```ts
const client = new CatalogClient('http://localhost:3001/api/v1');
```

#### `client.search()` → `SearchQueryBuilder`

Create a fluent search query. Chain filters and call `.execute()` to run.

```ts
const results = await client.search()
  .query('charizard')          // Search text
  .category('tcg')             // tcg | video_game | video_game_consoles
  .brand('pokemon')            // pokemon | yugioh | one_piece
  .productType('card')         // card | sealed_product
  .language('en')              // Card language
  .setName('Base Set')         // Filter by set name
  .setCode('base1')            // Filter by set code
  .illustrator('Ken Sugimori') // Filter by illustrator
  .platform('nintendo-switch') // For video games/consoles
  .paginate(1, 20)             // Page number, items per page
  .limit(5)                    // Limit number of items returned
  .sort('title', 'asc')        // Sort field and order
  .execute();
```

#### `client.searchWithFilters(filters)` → `CatalogSearchResponse`

Search using a plain object of filters.

```ts
const results = await client.searchWithFilters({
  q: 'charizard',
  category: 'tcg',
  brand: 'pokemon',
  limit: 20,
});
```

#### `client.getItem(id)` → `CatalogItem | null`

Get a single catalog item by its ID.

```ts
const item = await client.getItem('abc123');
if (item) {
  console.log(item.title);
}
```

#### `client.listItems(filters?)` → `CatalogSearchResponse`

List catalog items with optional filters (no text search).

```ts
const results = await client.listItems({
  category: 'tcg',
  brand: 'pokemon',
  limit: 50,
});
```

#### `client.autocomplete(q, category?, brand?)` → `AutocompleteSuggestion[]`

Get autocomplete suggestions for a search query.

```ts
const suggestions = await client.autocomplete('char', 'tcg', 'pokemon');
```

### Query Builder (standalone)

You can also use the standalone `Query` class to build query parameters:

```ts
import { Query } from '@topchased/catalog-client-sdk';

const query = Query.create()
  .search('charizard')
  .category('tcg')
  .brand('pokemon')
  .language('en')
  .paginate(1, 20)
  .sort('title', 'asc');

// query.params contains the key-value pairs
```

### Type Guards

The SDK includes type guards for narrowing catalog item types:

```ts
import { isPokemonCatalogItem, isVideoGameCatalogItem } from '@topchased/catalog-client-sdk';

if (isPokemonCatalogItem(item)) {
  console.log(item.brand); // 'pokemon'
  console.log(item.details.hp); // Pokemon-specific fields
}
```

## Response Types

### `CatalogSearchResponse`

```ts
interface CatalogSearchResponse {
  items: CatalogItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

### `CatalogItem` (union type)

- `PokemonCatalogItem` — TCG cards with `brand: 'pokemon'`
- `YugiohCatalogItem` — TCG cards with `brand: 'yugioh'`
- `OnePieceCatalogItem` — TCG cards with `brand: 'one_piece'`
- `VideoGameCatalogItem` — Video games with `category: 'video_game'`
- `ConsoleCatalogItem` — Consoles with `category: 'video_game_consoles'`

## Browser Usage

The SDK works in the browser out of the box. It auto-detects the environment and uses `window.fetch` when in a browser context.

### Script Tag

```html
<script src="https://unpkg.com/@catalog/client/dist/index.browser.global.js"></script>
<script>
  const client = new CatalogClient('http://localhost:3001/api/v1');
  client.search()
    .query('charizard')
    .category('tcg')
    .execute()
    .then(results => console.log(results));
</script>
```

### ES Module

```ts
import { CatalogClient } from '@topchased/catalog-client-sdk';
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Type check
npm run typecheck
```

# Creating Package for Install
```
npm run build
npm pack
```

To install locally to other repos:
```
# point to tar ie
npm add ../catalog-client-sdk/topchased-catalog-client-1.0.0.tgz
```

## License

MIT
