import { Clock, Lock, Cpu, Server } from 'lucide-react';
import type { CrackTimeEstimate } from '../types';

interface CrackTimeEstimatesProps {
  crackTimes: CrackTimeEstimate[];
}

export function CrackTimeEstimates({ crackTimes }: CrackTimeEstimatesProps) {
  if (crackTimes.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 pt-1 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Clock className="size-4 text-primary" />
          Estimated Brute-Force Crack Times
        </span>
        <span className="text-[11px] text-muted-foreground font-mono">
          Theoretical Permutations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {crackTimes.map((item, idx) => {
          const isInstant = item.icon === 'instant' || item.icon === 'fast';
          return (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-border/70 bg-muted/30 dark:bg-muted/15 flex flex-col gap-2 min-w-0 transition-all hover:border-border"
            >
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-xs font-medium text-muted-foreground truncate">
                  {item.scenario}
                </span>
                {idx === 0 ? (
                  <Lock className="size-3.5 text-muted-foreground shrink-0" />
                ) : idx === 1 ? (
                  <Cpu className="size-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <Server className="size-3.5 text-muted-foreground shrink-0" />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span
                  title={item.timeString}
                  className={`text-lg sm:text-xl font-bold font-mono tracking-tight wrap-break-word ${
                    isInstant ? 'text-destructive' : 'text-emerald-500'
                  }`}
                >
                  {item.timeString}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                  {item.hardware}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
