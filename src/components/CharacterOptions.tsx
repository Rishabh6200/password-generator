import type { CharacterOptionKey } from '../types';

interface CharacterOptionsProps {
  options: {
    upper: boolean;
    lower: boolean;
    number: boolean;
    char: boolean;
  };
  onToggle: (key: CharacterOptionKey) => void;
}

const CHARACTER_OPTIONS_CONFIG: {
  key: CharacterOptionKey;
  label: string;
  ariaLabel: string;
}[] = [
  { key: 'upper', label: 'Uppercase (A-Z)', ariaLabel: 'Include uppercase letters' },
  { key: 'lower', label: 'Lowercase (a-z)', ariaLabel: 'Include lowercase letters' },
  { key: 'number', label: 'Numbers (0-9)', ariaLabel: 'Include numbers' },
  { key: 'char', label: 'Symbols (!@#$&=_:)', ariaLabel: 'Include symbols' },
];

export function CharacterOptions({ options, onToggle }: CharacterOptionsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-1">
      {CHARACTER_OPTIONS_CONFIG.map(({ key, label, ariaLabel }) => (
        <label
          key={key}
          className="flex items-center gap-3 text-sm text-[#111111] font-medium cursor-pointer select-none group"
        >
          <input
            type="checkbox"
            className="w-4 h-4 rounded-sm border border-[#b5b5b0] bg-white checked:bg-[#d97757] checked:border-[#d97757] transition-all appearance-none grid place-items-center cursor-pointer checked:before:content-['✓'] before:text-white before:text-[11px] before:font-bold focus:ring-0"
            checked={options[key]}
            onChange={() => onToggle(key)}
            aria-label={ariaLabel}
          />
          <span className="group-hover:text-black transition-colors">
            {label}
          </span>
        </label>
      ))}
    </div>
  );
}
