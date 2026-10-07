import type { BreachCheckResult, CrackTimeEstimate } from '../types';

/**
 * Computes the SHA-1 hash of a string using the native Web Crypto API.
 * The hash is returned in uppercase hex format.
 */
export async function computeSha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Checks if a password has been compromised using the HaveIBeenPwned k-Anonymity API.
 * Only the first 5 characters of the SHA-1 hash leave the client.
 */
export async function checkPasswordBreach(password: string): Promise<BreachCheckResult> {
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  const startTime = performance.now();
  const sha1 = await computeSha1(password);
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5);

  // Send request with Add-Padding to prevent network-level length analysis
  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
    headers: {
      'Add-Padding': 'true',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to query breach database (HTTP ${response.status})`);
  }

  const responseText = await response.text();
  const durationMs = Math.round(performance.now() - startTime);

  // Parse lines format: HASH_SUFFIX:COUNT
  let breachCount = 0;
  const lines = responseText.split('\r\n');

  for (const line of lines) {
    const [lineSuffix, countStr] = line.split(':');
    if (lineSuffix && lineSuffix.toUpperCase() === suffix) {
      breachCount = parseInt(countStr || '0', 10);
      break;
    }
  }

  return {
    isPwned: breachCount > 0,
    breachCount,
    sha1Prefix: prefix,
    sha1Suffix: suffix,
    durationMs,
    checkedAt: new Date(),
  };
}

/**
 * Calculates estimated crack times across different attacker hardware profiles.
 */
export function estimateCrackTimes(password: string): CrackTimeEstimate[] {
  if (!password) return [];

  // Calculate character pool size
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;
  if (poolSize === 0) poolSize = 26;

  // Total possible permutations: poolSize ^ length
  // Using logarithms to avoid BigInt overflow
  const entropyBits = password.length * Math.log2(poolSize);
  const combinations = Math.pow(2, entropyBits);

  // Attack speeds (guesses per second):
  // 1. Online Web Form (throttled): ~100 attempts / sec
  // 2. High-End Consumer GPU (e.g. RTX 4090 on fast hash like MD5/SHA1): ~10 billion (10^10) / sec
  // 3. Specialized Dedicated GPU Cluster (100x GPUs): ~10 trillion (10^13) / sec
  const onlineSec = combinations / 100;
  const gpuSec = combinations / 10000000000;
  const clusterSec = combinations / 10000000000000;

  return [
    {
      scenario: 'Online Attack (Web Login)',
      hardware: '100 attempts / sec (Rate limited)',
      timeString: formatDuration(onlineSec),
      icon: getIconForSeconds(onlineSec),
    },
    {
      scenario: 'Single Dedicated GPU',
      hardware: 'NVIDIA RTX 4090 (~10 GH/s)',
      timeString: formatDuration(gpuSec),
      icon: getIconForSeconds(gpuSec),
    },
    {
      scenario: 'High-Performance Cluster',
      hardware: 'Enterprise GPU Rig (~10 TH/s)',
      timeString: formatDuration(clusterSec),
      icon: getIconForSeconds(clusterSec),
    },
  ];
}

function getIconForSeconds(sec: number): 'instant' | 'fast' | 'slow' | 'centuries' {
  if (sec < 60) return 'instant';
  if (sec < 86400) return 'fast';
  if (sec < 31536000 * 100) return 'slow';
  return 'centuries';
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds >= 3.15e19) return '> 1,000T years';
  if (seconds < 0.001) return 'Instantly';
  if (seconds < 1) return '< 1 second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;

  const days = hours / 24;
  if (days < 365.25) return `${Math.round(days)} days`;

  const years = days / 365.25;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${(years / 1e3).toFixed(years < 1e4 ? 1 : 0)}k years`;
  if (years < 1e9) return `${(years / 1e6).toFixed(years < 1e7 ? 1 : 0)}M years`;
  if (years < 1e12) return `${(years / 1e9).toFixed(years < 1e10 ? 1 : 0)}B years`;
  if (years < 1e15) return `${(years / 1e12).toFixed(years < 1e13 ? 1 : 0)}T years`;
  return '> 1,000T years';
}
