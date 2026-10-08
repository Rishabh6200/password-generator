import { Lock, Fingerprint, Hash, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface ToolConfig {
  id: string;
  name: string;
  shortName: string;
  path: string;
  tag: string;
  description: string;
  seoTitle: string;
  category?: 'Generators' | 'Security & Audit';
  icon: LucideIcon;
  accent: string;
  iconBg: string;
}

export const TOOLS: ToolConfig[] = [
  {
    id: 'password-generator',
    name: 'Password Generator',
    shortName: 'Password',
    path: '/password-generator',
    category: 'Generators',
    tag: 'CSPRNG',
    description: 'Hardware-seeded cryptographic passwords with custom symbols, numbers, and length.',
    seoTitle: 'Random Password Generator — Strong CSPRNG Credentials',
    icon: Lock,
    accent: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    iconBg: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  },
  {
    id: 'passphrase-generator',
    name: 'Passphrase Generator',
    shortName: 'Passphrase',
    path: '/passphrase-generator',
    category: 'Generators',
    tag: 'Diceware',
    description: 'Human-memorable multi-word phrases using Diceware cryptographic wordlists.',
    seoTitle: 'Diceware Passphrase Generator — Memorable High-Entropy Passwords',
    icon: Fingerprint,
    accent: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  },
  {
    id: 'pin-generator',
    name: 'PIN Code Generator',
    shortName: 'PIN Code',
    path: '/pin-generator',
    category: 'Generators',
    tag: 'Numeric',
    description: 'Uniform random 4-digit, 6-digit, and custom-length numeric security PIN codes.',
    seoTitle: 'Secure PIN Code Generator — Hardware-Random Numeric Codes',
    icon: Hash,
    accent: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  {
    id: 'password-breach-checker',
    name: 'Breach Auditor',
    shortName: 'Breach Auditor',
    path: '/password-breach-checker',
    category: 'Security & Audit',
    tag: 'k-Anonymity',
    description: 'Audit credentials against 800M+ leaked accounts without exposing your plaintext password.',
    seoTitle: 'Password Breach Checker — Zero-Knowledge Leak Auditor',
    icon: ShieldCheck,
    accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
];
