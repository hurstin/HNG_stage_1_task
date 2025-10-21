// In-memory storage for string data
const stringStorage = new Map();

export function storeString(stringData) {
  stringStorage.set(stringData.id, stringData);
  // Also store by value for easy lookup
  stringStorage.set(stringData.value, stringData);
}

export function getString(identifier) {
  return stringStorage.get(identifier);
}

export function getAllStrings(filters = {}) {
  // Get all unique string data (by ID)
  const uniqueStrings = new Map();

  for (const [key, value] of stringStorage.entries()) {
    // Only include entries that are full string data objects (not the value-key duplicates)
    if (value && value.id && value.properties && value.id === key) {
      uniqueStrings.set(value.id, value);
    }
  }

  const allStrings = Array.from(uniqueStrings.values());

  const filteredStrings = allStrings.filter((stringData) => {
    const { properties } = stringData;

    // Apply filters
    if (
      filters.is_palindrome !== undefined &&
      properties.is_palindrome !== filters.is_palindrome
    ) {
      return false;
    }

    if (
      filters.min_length !== undefined &&
      properties.length < filters.min_length
    ) {
      return false;
    }

    if (
      filters.max_length !== undefined &&
      properties.length > filters.max_length
    ) {
      return false;
    }

    if (
      filters.word_count !== undefined &&
      properties.word_count !== filters.word_count
    ) {
      return false;
    }

    if (filters.contains_character !== undefined) {
      const char = filters.contains_character.toLowerCase();
      if (!properties.character_frequency_map[char]) {
        return false;
      }
    }

    return true;
  });

  return {
    data: filteredStrings,
    count: filteredStrings.length,
  };
}

export function deleteString(identifier) {
  const stringData = stringStorage.get(identifier);
  if (stringData) {
    stringStorage.delete(stringData.id);
    stringStorage.delete(stringData.value);
  }
}

export function clearStorage() {
  stringStorage.clear();
}
