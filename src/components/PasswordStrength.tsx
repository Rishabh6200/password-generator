import { ShieldCheckIcon } from '@phosphor-icons/react';
import type { Strength } from '../types';

interface PasswordStrengthProps {
  strength: Strength;
}

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldCheckIcon
            size={16}
            weight="duotone"
            className="text-[#d97757]"
          />
          <span className="text-xs font-medium text-[#72716a]">
            Password strength
          </span>
        </div>

        <span className="text-xs font-semibold text-[#333333]">
          {strength.label}
        </span>
      </div>

      <div
        className="h-1.5 w-full bg-[#e4e4e6] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={strength.score}
        aria-label={`Password strength: ${strength.label}`}
      >
        <div
          className="h-full rounded-full bg-[#d97757] transition-all duration-300"
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
}
