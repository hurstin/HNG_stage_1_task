import express from 'express';
import { analyzeString } from '../utils/stringAnalysis.js';
import {
  storeString,
  getString,
  getAllStrings,
  deleteString,
} from '../storage/inMemoryStorage.js';
import { validateStringInput } from '../middleware/validation.js';

const router = express.Router();

// POST /strings - Create/Analyze String
router.post('/', validateStringInput, (req, res) => {
  try {
    const { value } = req.body;

    // Check if string already exists
    const existingString = getString(value);
    if (existingString) {
      return res.status(409).json({
        error: 'String already exists in the system',
        id: existingString.id,
      });
    }

    // Analyze string
    const properties = analyzeString(value);
    const stringData = {
      id: properties.sha256_hash,
      value,
      properties,
      created_at: new Date().toISOString(),
    };

    // Store the analyzed string
    storeString(stringData);

    res.status(201).json(stringData);
  } catch (error) {
    console.error('Error analyzing string:', error);
    res.status(500).json({ error: 'Failed to analyze string' });
  }
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Strings route is working' });
});

// GET /strings/{string_value} - Get Specific String
router.get('/:string_value', (req, res) => {
  try {
    const stringValue = decodeURIComponent(req.params.string_value);
    const stringData = getString(stringValue);

    if (!stringData) {
      return res.status(404).json({
        error: 'String does not exist in the system',
      });
    }

    res.status(200).json(stringData);
  } catch (error) {
    console.error('Error retrieving string:', error);
    res.status(500).json({ error: 'Failed to retrieve string' });
  }
});

// GET /strings - Get All Strings with Filtering
router.get('/', (req, res) => {
  try {
    const {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    } = req.query;

    // Parse and validate query parameters
    const filters = {};

    if (is_palindrome !== undefined) {
      if (!['true', 'false'].includes(is_palindrome)) {
        return res.status(400).json({
          error: 'is_palindrome must be true or false',
        });
      }
      filters.is_palindrome = is_palindrome === 'true';
    }

    if (min_length !== undefined) {
      const min = parseInt(min_length);
      if (isNaN(min) || min < 0) {
        return res.status(400).json({
          error: 'min_length must be a non-negative integer',
        });
      }
      filters.min_length = min;
    }

    if (max_length !== undefined) {
      const max = parseInt(max_length);
      if (isNaN(max) || max < 0) {
        return res.status(400).json({
          error: 'max_length must be a non-negative integer',
        });
      }
      filters.max_length = max;
    }

    if (
      min_length !== undefined &&
      max_length !== undefined &&
      filters.min_length > filters.max_length
    ) {
      return res.status(400).json({
        error: 'min_length cannot be greater than max_length',
      });
    }

    if (word_count !== undefined) {
      const count = parseInt(word_count);
      if (isNaN(count) || count < 0) {
        return res.status(400).json({
          error: 'word_count must be a non-negative integer',
        });
      }
      filters.word_count = count;
    }

    if (contains_character !== undefined) {
      if (
        typeof contains_character !== 'string' ||
        contains_character.length !== 1
      ) {
        return res.status(400).json({
          error: 'contains_character must be a single character',
        });
      }
      filters.contains_character = contains_character;
    }

    const result = getAllStrings(filters);

    res.status(200).json({
      data: result.data,
      count: result.count,
      filters_applied: filters,
    });
  } catch (error) {
    console.error('Error filtering strings:', error);
    res.status(500).json({ error: 'Failed to filter strings' });
  }
});

// DELETE /strings/{string_value} - Delete String
router.delete('/:string_value', (req, res) => {
  try {
    const stringValue = decodeURIComponent(req.params.string_value);
    const stringData = getString(stringValue);

    if (!stringData) {
      return res.status(404).json({
        error: 'String does not exist in the system',
      });
    }

    deleteString(stringValue);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting string:', error);
    res.status(500).json({ error: 'Failed to delete string' });
  }
});

export default router;
