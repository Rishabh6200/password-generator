export type PasswordMode = 'random' | 'passphrase' | 'pin';

export interface Strength {
  label: string;
  score: number;
}

export type CharacterOptionKey = 'upper' | 'lower' | 'number' | 'char';

export interface RandomPasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  number: boolean;
  char: boolean;
  avoidAmbiguous?: boolean;
}

// Alias for backwards compatibility
export type PasswordOptions = RandomPasswordOptions;

export interface PassphraseOptions {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
}

export interface PinOptions {
  length: number;
}
