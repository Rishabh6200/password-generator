import { Link } from 'react-router';
import {
  Lock,
  Fingerprint,
  Hash,
  ShieldCheck,
  ArrowRight,
  Shield,
  Cpu,
  EyeOff,
  ChevronDown,
} from 'lucide-react';

const TOOLS = [
  {
    id: 'password-generator',
    name: 'Password Generator',
    path: '/password-generator',
    tag: 'CSPRNG',
    description: 'Hardware-seeded cryptographic passwords with custom symbols, numbers, and length.',
    icon: Lock,
    accent: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    id: 'passphrase-generator',
    name: 'Passphrase Generator',
    path: '/passphrase-generator',
    tag: 'Diceware',
    description: 'Human-memorable multi-word phrases using Diceware cryptographic wordlists.',
    icon: Fingerprint,
    accent: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    id: 'pin-generator',
    name: 'PIN Code Generator',
    path: '/pin-generator',
    tag: 'Numeric',
    description: 'Uniform random 4-digit, 6-digit, and custom-length numeric security PIN codes.',
    icon: Hash,
    accent: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'password-breach-checker',
    name: 'Breach Auditor',
    path: '/password-breach-checker',
    tag: 'k-Anonymity',
    description: 'Audit credentials against 800M+ leaked accounts without exposing your plaintext password.',
    icon: ShieldCheck,
    accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
];

export function ToolsList() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      {/* Clean Interactive Command / Directory List (No boxy cards) */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md divide-y divide-border/60 shadow-xs overflow-hidden">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="group flex items-center justify-between p-4 sm:p-5 hover:bg-muted/40 transition-colors select-none"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                <div
                  className={`size-10 sm:size-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${tool.accent}`}
                >
                  <Icon className="size-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2 text-muted-foreground group-hover:text-primary transition-colors">
                <span className="text-xs font-medium hidden sm:inline">Launch</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subtle Bottom Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2.5 px-4 text-xs text-muted-foreground/80 select-none">
        <span className="inline-flex items-center gap-1.5">
          <Cpu className="size-3.5 text-primary" />
          Hardware CSPRNG
        </span>
        <span className="text-border">•</span>
        <span className="inline-flex items-center gap-1.5">
          <EyeOff className="size-3.5 text-primary" />
          100% Client-Side
        </span>
        <span className="text-border">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Shield className="size-3.5 text-primary" />
          Zero Network Leaks
        </span>
      </div>

      {/* Discreet Collapsible FAQ for SEO */}
      <details className="group rounded-xl border border-border/50 bg-card/30 p-3.5 transition-all text-xs">
        <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground flex items-center justify-between list-none select-none">
          <span className="flex items-center gap-2">
            <Shield className="size-3.5 text-primary" />
            Security &amp; Cryptography Guide (FAQ)
          </span>
          <ChevronDown className="size-3.5 transition-transform duration-200 group-open:rotate-180 text-muted-foreground" />
        </summary>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 mt-2 border-t border-border/40 text-muted-foreground leading-relaxed text-[11px]">
          <div>
            <span className="font-semibold text-foreground">What is cryptographic entropy?</span>
            <p className="mt-0.5">
              Entropy measures credential unpredictability. Generated via window.crypto.getRandomValues rather than pseudo-random math.
            </p>
          </div>
          <div>
            <span className="font-semibold text-foreground">Password vs Passphrase</span>
            <p className="mt-0.5">
              Random passwords provide character density for password managers. Passphrases provide equivalent entropy while remaining human-memorable.
            </p>
          </div>
          <div>
            <span className="font-semibold text-foreground">Zero-Knowledge k-Anonymity</span>
            <p className="mt-0.5">
              Breach checks only transmit 5 characters of a SHA-1 hash. Full hashes and passwords never leave your machine.
            </p>
          </div>
          <div>
            <span className="font-semibold text-foreground">Client-Side Execution</span>
            <p className="mt-0.5">
              Zero cookies, zero telemetry, zero server roundtrips. Operates entirely offline.
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}
