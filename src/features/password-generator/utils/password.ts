import { UPPERCASE_CHARS, LOWERCASE_CHARS, NUMBER_CHARS, SYMBOL_CHARS, AMBIGUOUS_CHARS } from '../constants/characters';
import { PASSPHRASE_WORDS } from '../constants/words';
import type { RandomPasswordOptions, PassphraseOptions, PinOptions, Strength } from '../types';

function getSecureIndex(max: number): number {
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const randomValue = new Uint32Array(1);

  do {
    window.crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % max;
}

export function generatePassword({ length, upper, lower, number, char, avoidAmbiguous }: RandomPasswordOptions): string {
  const selectedSets: string[][] = [];

  const filterChars = (chars: string[]) =>
    avoidAmbiguous ? chars.filter((c) => !AMBIGUOUS_CHARS.has(c)) : chars;

  if (upper) selectedSets.push(filterChars(UPPERCASE_CHARS));
  if (lower) selectedSets.push(filterChars(LOWERCASE_CHARS));
  if (number) selectedSets.push(filterChars(NUMBER_CHARS));
  if (char) selectedSets.push(filterChars(SYMBOL_CHARS));

  if (selectedSets.length === 0) {
    return '';
  }

  const allChars = selectedSets.flat();
  const result: string[] = [];

  for (const set of selectedSets) {
    result.push(set[getSecureIndex(set.length)]);
  }

  while (result.length < length) {
    result.push(allChars[getSecureIndex(allChars.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

export function generatePassphrase({ wordCount, separator, capitalize, includeNumber }: PassphraseOptions): string {
  if (wordCount <= 0) return '';

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const wordIndex = getSecureIndex(PASSPHRASE_WORDS.length);
    let word = PASSPHRASE_WORDS[wordIndex];
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    words.push(word);
  }

  if (includeNumber) {
    const randNum = getSecureIndex(100);
    const targetIdx = getSecureIndex(words.length);
    words[targetIdx] = `${words[targetIdx]}${randNum}`;
  }

  return words.join(separator);
}

export function generatePin({ length }: PinOptions): string {
  if (length <= 0) return '';
  const digits: string[] = [];
  for (let i = 0; i < length; i++) {
    digits.push(NUMBER_CHARS[getSecureIndex(NUMBER_CHARS.length)]);
  }
  return digits.join('');
}

export function calculateStrength({ password, length, upper, lower, number, char }: RandomPasswordOptions & { password: string }): Strength {
  if (!password) {
    return {
      label: 'Select a character type',
      score: 0,
    };
  }

  let score = 0;

  if (length >= 12) score += 1;
  if (length >= 16) score += 1;
  if (length >= 24) score += 1;

  if (upper) score += 1;
  if (lower) score += 1;
  if (number) score += 1;
  if (char) score += 1;

  if (score <= 3) {
    return {
      label: 'Moderate',
      score: 40,
    };
  }

  if (score <= 5) {
    return {
      label: 'Strong',
      score: 70,
    };
  }

  return {
    label: 'Very Strong',
    score: 100,
  };
}

export function calculatePassphraseStrength(wordCount: number): Strength {
  if (wordCount <= 3) {
    return { label: 'Moderate (Diceware)', score: 45 };
  }
  if (wordCount === 4) {
    return { label: 'Strong (Diceware)', score: 75 };
  }
  return { label: 'Very Strong (Diceware)', score: 100 };
}

export function calculatePinStrength(length: number): Strength {
  if (length <= 4) {
    return { label: 'Weak (Standard PIN)', score: 25 };
  }
  if (length <= 6) {
    return { label: 'Moderate (6-digit PIN)', score: 50 };
  }
  if (length <= 8) {
    return { label: 'Strong (8-digit PIN)', score: 75 };
  }
  return { label: 'Very Strong PIN', score: 100 };
}
