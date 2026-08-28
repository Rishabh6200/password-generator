export interface Strength {
  label: string;
  score: number;
}

export type CharacterOptionKey = 'upper' | 'lower' | 'number' | 'char';

export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  number: boolean;
  char: boolean;
}
