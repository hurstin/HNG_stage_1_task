import { createHash } from 'crypto';

export function analyzeString(str) {
  // Remove extra whitespace and normalize
  const normalizedStr = str.trim().replace(/\s+/g, ' ');

  // Calculate properties
  const length = normalizedStr.length;
  const is_palindrome = checkPalindrome(normalizedStr);
  const unique_characters = countUniqueCharacters(normalizedStr);
  const word_count = countWords(normalizedStr);
  const sha256_hash = generateSHA256(normalizedStr);
  const character_frequency_map = buildCharacterFrequencyMap(normalizedStr);

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    sha256_hash,
    character_frequency_map,
  };
}

function checkPalindrome(str) {
  if (str.length === 0) return true;

  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (cleaned.length === 0) return true;

  return cleaned === cleaned.split('').reverse().join('');
}

function countUniqueCharacters(str) {
  const uniqueChars = new Set();

  for (const char of str) {
    uniqueChars.add(char);
  }

  return uniqueChars.size;
}

function countWords(str) {
  if (str.trim().length === 0) return 0;
  return str.trim().split(/\s+/).length;
}

function generateSHA256(str) {
  return createHash('sha256').update(str).digest('hex');
}

function buildCharacterFrequencyMap(str) {
  const frequencyMap = {};

  for (const char of str) {
    frequencyMap[char] = (frequencyMap[char] || 0) + 1;
  }

  return frequencyMap;
}
