import { Link } from 'react-router';
import { ShieldAlert, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BreachCheckResult, CheckStatus } from '../types';

interface BreachResultBannerProps {
  status: CheckStatus;
  result: BreachCheckResult | null;
  errorMsg: string | null;
}

export function BreachResultBanner({ status, result, errorMsg }: BreachResultBannerProps) {
  if (status === 'error' && errorMsg) {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 flex items-start gap-3 text-destructive animate-in fade-in duration-200">
        <AlertTriangle className="size-5 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">Audit Request Failed</span>
          <span className="text-xs opacity-90">{errorMsg}</span>
        </div>
      </div>
    );
  }

  if (result && status === 'safe') {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                No Known Breaches Found
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold"
                >
                  Safe
                </Badge>
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                This exact password has not appeared in any known public security breaches.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground shrink-0 hidden sm:inline">
            Checked in {result.durationMs}ms
          </span>
        </div>
      </div>
    );
  }

  if (result && status === 'pwned') {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-destructive/20 text-destructive flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-destructive flex items-center gap-2">
                Compromised in Known Breaches!
                <Badge variant="destructive" className="text-[11px] font-semibold">
                  High Risk
                </Badge>
              </span>
              <span className="text-xs sm:text-sm text-foreground/90 mt-0.5 font-medium">
                Found{' '}
                <span className="font-bold underline decoration-destructive">
                  {result.breachCount.toLocaleString()} times
                </span>{' '}
                across public leaked datasets.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground shrink-0 hidden sm:inline">
            Checked in {result.durationMs}ms
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-background/60 border border-destructive/30 text-xs text-foreground/80 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-destructive mb-0.5">Security Recommendation:</p>
            Do not use this password for any account. Automated credential stuffing tools test this password first against accounts worldwide.
          </div>
          <Link
            to="/password-generator"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs font-semibold whitespace-nowrap self-start sm:self-center transition-colors shadow-xs"
          >
            <span>Generate Secure Password</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
