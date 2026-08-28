export const UPPERCASE_CHARS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
export const LOWERCASE_CHARS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
export const NUMBER_CHARS = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));
export const SYMBOL_CHARS = [...'!@#$&=:?'];

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 64;
export const DEFAULT_PASSWORD_LENGTH = 16;
