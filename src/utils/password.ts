import {  UPPERCASE_CHARS,  LOWERCASE_CHARS,  NUMBER_CHARS,  SYMBOL_CHARS} from '../constants/characters';
import type { PasswordOptions, Strength } from '../types';

function getSecureIndex(max: number): number {
  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const randomValue = new Uint32Array(1);

  do {
    window.crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % max;
}

export function generatePassword({ length, upper, lower, number, char }: PasswordOptions): string {
  const selectedSets: string[][] = [];

  if (upper) selectedSets.push(UPPERCASE_CHARS);
  if (lower) selectedSets.push(LOWERCASE_CHARS);
  if (number) selectedSets.push(NUMBER_CHARS);
  if (char) selectedSets.push(SYMBOL_CHARS);

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

export function calculateStrength({ password, length, upper, lower, number, char }: PasswordOptions & { password: string }): Strength {
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
