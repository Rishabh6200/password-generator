export interface BreachCheckResult {
  isPwned: boolean;
  breachCount: number;
  sha1Prefix: string;
  sha1Suffix: string;
  durationMs: number;
  checkedAt: Date;
}

export interface CrackTimeEstimate {
  scenario: string;
  hardware: string;
  timeString: string;
  icon: 'instant' | 'fast' | 'slow' | 'centuries';
}

export type CheckStatus = 'idle' | 'checking' | 'safe' | 'pwned' | 'error';
