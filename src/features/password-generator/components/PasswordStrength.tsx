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
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <ShieldCheck className={`size-3.5 ${config.iconClass}`} />
          <span>Security rating</span>
        </div>

        <Badge variant={config.badgeVariant} className="text-[11px] h-5 px-2 font-medium">
          {strength.label}
        </Badge>
      </div>

      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${config.barClass}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
}
