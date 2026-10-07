import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Strength } from '../types';

interface PasswordStrengthProps {
  strength: Strength;
}

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  const getStrengthConfig = (score: number) => {
    if (score <= 30) {
      return {
        badgeVariant: 'destructive' as const,
        barClass: 'bg-destructive',
        iconClass: 'text-destructive',
      };
    }
    if (score <= 50) {
      return {
        badgeVariant: 'secondary' as const,
        barClass: 'bg-amber-500',
        iconClass: 'text-amber-500',
      };
    }
    if (score <= 75) {
      return {
        badgeVariant: 'outline' as const,
        barClass: 'bg-emerald-500',
        iconClass: 'text-emerald-500',
      };
    }
    return {
      badgeVariant: 'default' as const,
      barClass: 'bg-emerald-500',
      iconClass: 'text-emerald-500',
    };
  };

  const config = getStrengthConfig(strength.score);

  return (
    <div className="flex flex-col gap-2 pt-0.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <ShieldCheck className={`size-4 ${config.iconClass}`} />
          <span>Security rating</span>
        </div>

        <Badge variant={config.badgeVariant} className="text-[11px] h-5 px-2.5 font-medium rounded-full shadow-xs">
          {strength.label}
        </Badge>
      </div>

      <div className="h-2 w-full bg-muted/80 dark:bg-muted/40 rounded-full overflow-hidden p-0.5 border border-border/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${config.barClass}`}
          style={{ width: `${Math.max(strength.score, 6)}%` }}
        />
      </div>
    </div>
  );
}
