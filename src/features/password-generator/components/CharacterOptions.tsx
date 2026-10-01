import type { CharacterOptionKey } from '../types';
import { Checkbox } from '@/components/ui/checkbox';

interface CharacterOptionsProps {
  options: {
    upper: boolean;
    lower: boolean;
    number: boolean;
    char: boolean;
    avoidAmbiguous: boolean;
  };
  onToggle: (key: CharacterOptionKey) => void;
  onToggleAvoidAmbiguous: () => void;
}

const CHARACTER_OPTIONS_CONFIG: {
  key: CharacterOptionKey;
  label: string;
  example: string;
  ariaLabel: string;
}[] = [
  { key: 'upper', label: 'Uppercase', example: 'A B C D E F G', ariaLabel: 'Include uppercase letters' },
  { key: 'lower', label: 'Lowercase', example: 'a b c d e f g', ariaLabel: 'Include lowercase letters' },
  { key: 'number', label: 'Numbers', example: '0 1 2 3 4 5', ariaLabel: 'Include numbers' },
  { key: 'char', label: 'Symbols', example: '! @ # $ & = _ :', ariaLabel: 'Include symbols' },
];

export function CharacterOptions({
  options,
  onToggle,
  onToggleAvoidAmbiguous,
}: CharacterOptionsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold text-foreground select-none">
        Character Rules
      </span>

      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {CHARACTER_OPTIONS_CONFIG.map(({ key, label, example, ariaLabel }) => {
          const isChecked = options[key];
          return (
            <label
              key={key}
              htmlFor={`option-${key}`}
              className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'border-primary/40 bg-primary/5 shadow-xs'
                  : 'border-border bg-card/50 hover:bg-muted/40 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {label}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground mt-0.5 truncate">
                  {example}
                </span>
              </div>

              <Checkbox
                id={`option-${key}`}
                checked={isChecked}
                onCheckedChange={() => onToggle(key)}
                aria-label={ariaLabel}
                className="shrink-0"
              />
            </label>
          );
        })}

        {/* Avoid Ambiguous Characters Option */}
        <label
          htmlFor="option-avoid-ambiguous"
          className={`col-span-2 flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer select-none ${
            options.avoidAmbiguous
              ? 'border-primary/40 bg-primary/5 shadow-xs'
              : 'border-border bg-card/50 hover:bg-muted/40 opacity-75 hover:opacity-100'
          }`}
        >
          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-medium text-foreground">
                Avoid Ambiguous Characters
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-muted font-medium text-muted-foreground whitespace-nowrap">
                Easy to Read
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground mt-0.5">
              Excludes lookalikes: O, 0, l, 1, I, S, 5, B, 8
            </span>
          </div>

          <Checkbox
            id="option-avoid-ambiguous"
            checked={options.avoidAmbiguous}
            onCheckedChange={onToggleAvoidAmbiguous}
            aria-label="Avoid ambiguous characters"
            className="shrink-0"
          />
        </label>
      </div>
    </div>
  );
}
