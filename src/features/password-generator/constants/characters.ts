export const UPPERCASE_CHARS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
export const LOWERCASE_CHARS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
export const NUMBER_CHARS = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));
export const SYMBOL_CHARS = [...'!@#$&=:?'];

// Lookalike / ambiguous characters to exclude when "Avoid Ambiguous Characters" is enabled
export const AMBIGUOUS_CHARS = new Set(['O', '0', 'o', 'I', 'l', '1', 'S', 's', '5', 'B', '8', '|']);

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 64;
export const DEFAULT_PASSWORD_LENGTH = 16;

