import express from 'express';
import { parseNaturalLanguageQuery } from '../utils/naturalLanguageParser.js';
import { getAllStrings } from '../storage/inMemoryStorage.js';

const router = express.Router();

// GET /strings/filter-by-natural-language - Natural Language Filtering
router.get('/', (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: 'Query parameter is required',
      });
    }

    const parsedFilters = parseNaturalLanguageQuery(query);

    if (!parsedFilters.valid) {
      return res.status(400).json({
        error: 'Unable to parse natural language query',
        details: parsedFilters.error,
      });
    }

    // Check for conflicting filters
    if (parsedFilters.conflicting) {
      return res.status(422).json({
        error: 'Query parsed but resulted in conflicting filters',
        conflicts: parsedFilters.conflicts,
      });
    }

    const result = getAllStrings(parsedFilters.filters);

    res.status(200).json({
      data: result.data,
      count: result.count,
      interpreted_query: {
        original: query,
        parsed_filters: parsedFilters.filters,
      },
    });
  } catch (error) {
    console.error('Error processing natural language query:', error);
    res.status(500).json({ error: 'Failed to process natural language query' });
  }
});

export default router;
