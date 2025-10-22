# String Analysis API

Small Express API to analyze, store, filter, and delete strings.

## Quick start

Prerequisites: Node.js (v16+ recommended)

1. Install dependencies

```sh
npm install
```

2. Start the server

```sh
npm start
```

The server listens on port defined by the `PORT` environment variable (default: `3000`).

## Health check

GET /

- See the health endpoint in [server.js](server.js).

## Key endpoints

- POST /strings — create and analyze a string (validation in [`validateStringInput`](middleware/validation.js))

  - Implementation: [routes/strings.js](routes/strings.js)
  - Analyzer: [`analyzeString`](utils/stringAnalysis.js)
  - Storage: [`storeString`](storage/inMemoryStorage.js)

- GET /strings/:string_value — retrieve a previously stored string

  - Storage read: [`getString`](storage/inMemoryStorage.js)
  - Route: [routes/strings.js](routes/strings.js)

- GET /strings — list stored strings with query filters (min_length, max_length, is_palindrome, word_count, contains_character)

  - Route & parsing: [routes/strings.js](routes/strings.js)
  - Storage/filtering: [`getAllStrings`](storage/inMemoryStorage.js)

- GET /strings/filter-by-natural-language?query=... — filter using natural language queries

  - Parser: [`parseNaturalLanguageQuery`](utils/naturalLanguageParser.js)
  - Route: [routes/naturalLanguageFilter.js](routes/naturalLanguageFilter.js)

- DELETE /strings/:string_value — delete a stored string
  - Storage delete: [`deleteString`](storage/inMemoryStorage.js)
  - Route: [routes/strings.js](routes/strings.js)

## Example requests

See example requests and workflow in [request.http](request.http).

## Important files

- [server.js](server.js)
- [package.json](package.json)
- [request.http](request.http)
- [routes/strings.js](routes/strings.js)
- [routes/naturalLanguageFilter.js](routes/naturalLanguageFilter.js)
- [middleware/validation.js](middleware/validation.js)
- [utils/stringAnalysis.js](utils/stringAnalysis.js) — contains [`analyzeString`](utils/stringAnalysis.js)
- [utils/naturalLanguageParser.js](utils/naturalLanguageParser.js) — contains [`parseNaturalLanguageQuery`](utils/naturalLanguageParser.js)
- [storage/inMemoryStorage.js](storage/inMemoryStorage.js) — contains [`storeString`](storage/inMemoryStorage.js), [`getString`](storage/inMemoryStorage.js), [`getAllStrings`](storage/inMemoryStorage.js), [`deleteString`](storage/inMemoryStorage.js)

## Notes

- The project includes `dotenv` in [package.json](package.json) but `server.js` currently does not load it; set `PORT` directly in your shell if you need a custom port.
- No tests are included yet (see `scripts` in [package.json](package.json)).

````// filepath: /Users/mac/Desktop/HNG/HNG_stage_1_task/README.md
# String Analysis API

Small Express API to analyze, store, filter, and delete strings.

## Quick start

Prerequisites: Node.js (v16+ recommended)

1. Install dependencies
```sh
npm install
````

2. Start the server

```sh
npm start
```

The server listens on port defined by the `PORT` environment variable (default: `3000`).

## Health check

GET /

- See the health endpoint in [server.js](server.js).

## Key endpoints

- POST /strings — create and analyze a string (validation in [`validateStringInput`](middleware/validation.js))

  - Implementation: [routes/strings.js](routes/strings.js)
  - Analyzer: [`analyzeString`](utils/stringAnalysis.js)
  - Storage: [`storeString`](storage/inMemoryStorage.js)

- GET /strings/:string_value — retrieve a previously stored string

  - Storage read: [`getString`](storage/inMemoryStorage.js)
  - Route: [routes/strings.js](routes/strings.js)

- GET /strings — list stored strings with query filters (min_length, max_length, is_palindrome, word_count, contains_character)

  - Route & parsing: [routes/strings.js](routes/strings.js)
  - Storage/filtering: [`getAllStrings`](storage/inMemoryStorage.js)

- GET /strings/filter-by-natural-language?query=... — filter using natural language queries

  - Parser: [`parseNaturalLanguageQuery`](utils/naturalLanguageParser.js)
  - Route: [routes/naturalLanguageFilter.js](routes/naturalLanguageFilter.js)

- DELETE /strings/:string_value — delete a stored string
  - Storage delete: [`deleteString`](storage/inMemoryStorage.js)
  - Route: [routes/strings.js](routes/strings.js)

## Example requests

See example requests and workflow in [request.http](request.http).

## Important files

- [server.js](server.js)
- [package.json](package.json)
- [request.http](request.http)
- [routes/strings.js](routes/strings.js)
- [routes/naturalLanguageFilter.js](routes/naturalLanguageFilter.js)
- [middleware/validation.js](middleware/validation.js)
- [utils/stringAnalysis.js](utils/stringAnalysis.js) — contains [`analyzeString`](utils/stringAnalysis.js)
- [utils/naturalLanguageParser.js](utils/naturalLanguageParser.js) — contains [`parseNaturalLanguageQuery`](utils/naturalLanguageParser.js)
- [storage/inMemoryStorage.js](storage/inMemoryStorage.js) — contains [`storeString`](storage/inMemoryStorage.js), [`getString`](storage/inMemoryStorage.js), [`getAllStrings`](storage/inMemoryStorage.js), [`deleteString`](storage/inMemoryStorage.js)

## Notes

- The project includes `dotenv` in [package.json](package.json) but `server.js` currently does not load it; set `PORT` directly in your shell if you need a custom port.
- No tests are included yet (see `scripts` in [package.json](package.json)
