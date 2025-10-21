export function parseNaturalLanguageQuery(query) {
  const lowerQuery = query.toLowerCase();
  const filters = {};
  const conflicts = [];

  // Keywords mapping
  const keywordPatterns = [
    // Palindrome related
    {
      pattern: /\b(palindrome|palindromic|palindromes)\b/,
      filter: { is_palindrome: true },
    },

    // Word count related
    { pattern: /\bsingle word\b/, filter: { word_count: 1 } },
    { pattern: /\bone word\b/, filter: { word_count: 1 } },
    { pattern: /\btwo words\b/, filter: { word_count: 2 } },
    { pattern: /\bthree words\b/, filter: { word_count: 3 } },
    { pattern: /\bmultiple words\b/, filter: { word_count: 2 } },

    // Length related - longer than
    {
      pattern: /\longer than (\d+)/,
      processor: (match) => ({ min_length: parseInt(match[1]) + 1 }),
    },
    // Length related - shorter than
    {
      pattern: /\shorter than (\d+)/,
      processor: (match) => ({ max_length: parseInt(match[1]) - 1 }),
    },
    // Length related - exact length
    {
      pattern: /(\d+) characters? long/,
      processor: (match) => ({
        min_length: parseInt(match[1]),
        max_length: parseInt(match[1]),
      }),
    },
    {
      pattern: /length (\d+)/,
      processor: (match) => ({
        min_length: parseInt(match[1]),
        max_length: parseInt(match[1]),
      }),
    },

    // Character containment
    {
      pattern: /containing the letter ([a-z])/,
      processor: (match) => ({ contains_character: match[1] }),
    },
    {
      pattern: /contains ([a-z])/,
      processor: (match) => ({ contains_character: match[1] }),
    },
    {
      pattern: /with the letter ([a-z])/,
      processor: (match) => ({ contains_character: match[1] }),
    },
    {
      pattern: /having the letter ([a-z])/,
      processor: (match) => ({ contains_character: match[1] }),
    },

    // Vowels
    { pattern: /\bfirst vowel\b/, filter: { contains_character: 'a' } },
    { pattern: /\bvowel\b/, filter: { contains_character: 'a' } },
  ];

  // Apply filters based on patterns
  for (const { pattern, filter, processor } of keywordPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      if (processor) {
        Object.assign(filters, processor(match));
      } else if (filter) {
        Object.assign(filters, filter);
      }
    }
  }

  // Special case: "all" doesn't add filters, just returns everything
  if (lowerQuery.includes('all') && Object.keys(filters).length === 0) {
    // No filters applied for "all"
  }

  // Check for conflicts
  if (filters.min_length !== undefined && filters.max_length !== undefined) {
    if (filters.min_length > filters.max_length) {
      conflicts.push('min_length cannot be greater than max_length');
    }
  }

  return {
    valid: Object.keys(filters).length > 0 || lowerQuery.includes('all'),
    filters,
    conflicting: conflicts.length > 0,
    conflicts,
  };
}
