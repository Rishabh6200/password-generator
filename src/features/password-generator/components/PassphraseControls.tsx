import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import type { PassphraseOptions } from '../types';
import { Button } from '@/components/ui/button';

interface PassphraseControlsProps {
  options: PassphraseOptions;
  onChange: (options: PassphraseOptions) => void;
}

const SEPARATORS = [
  { label: 'Hyphen (-)', value: '-' },
  { label: 'Period (.)', value: '.' },
  { label: 'Underscore (_)', value: '_' },
  { label: 'Space ( )', value: ' ' },
];

export function PassphraseControls({ options, onChange }: PassphraseControlsProps) {
  const updateOption = <K extends keyof PassphraseOptions>(key: K, value: PassphraseOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Word Count Slider */}
      <div className="lg:col-span-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="word-count-slider" className="text-sm font-semibold text-foreground select-none cursor-pointer">
            Number of Words
          </Label>
          <Badge variant="secondary" className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg">
            {options.wordCount} words
          </Badge>
        </div>

        <Slider
          id="word-count-slider"
          min={3}
          max={10}
          value={[options.wordCount]}
          onValueChange={(val) => {
            const next = Array.isArray(val) ? val[0] : val;
            if (typeof next === 'number' && next !== options.wordCount) {
              updateOption('wordCount', next);
            }
          }}
          aria-label={`Word count: ${options.wordCount}`}
          className="w-full py-1"
        />

        <div className="flex justify-between text-[11px] text-muted-foreground font-mono select-none px-0.5">
          <span>Min: 3</span>
          <span>Max: 10</span>
        </div>

        {/* Separator Buttons */}
        <div className="flex flex-col gap-1.5 pt-2">
          <span className="text-xs font-medium text-muted-foreground">Word Separator:</span>
          <div className="flex gap-2 flex-wrap">
            {SEPARATORS.map((sep) => (
              <Button
                key={sep.value}
                variant={options.separator === sep.value ? "default" : "outline"}
                size="xs"
                onClick={() => updateOption('separator', sep.value)}
              >
                {sep.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Passphrase Option Cards */}
      <div className="lg:col-span-7 flex flex-col gap-2.5">
        <span className="text-sm font-semibold text-foreground select-none">
          Passphrase Options
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <label
            htmlFor="option-capitalize"
            className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
              options.capitalize
                ? 'border-primary/50 bg-primary/8 dark:bg-primary/12 shadow-xs ring-1 ring-primary/25'
                : 'border-border/70 bg-muted/30 dark:bg-muted/15 hover:border-border hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                Capitalize Words
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground mt-0.5 truncate">
                Correct-Horse
              </span>
            </div>

            <Checkbox
              id="option-capitalize"
              checked={options.capitalize}
              onCheckedChange={(checked) => updateOption('capitalize', Boolean(checked))}
              aria-label="Capitalize each word"
              className="shrink-0"
            />
          </label>

          <label
            htmlFor="option-number"
            className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
              options.includeNumber
                ? 'border-primary/50 bg-primary/8 dark:bg-primary/12 shadow-xs ring-1 ring-primary/25'
                : 'border-border/70 bg-muted/30 dark:bg-muted/15 hover:border-border hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                Include Number
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground mt-0.5 truncate">
                battery42-staple
              </span>
            </div>

            <Checkbox
              id="option-number"
              checked={options.includeNumber}
              onCheckedChange={(checked) => updateOption('includeNumber', Boolean(checked))}
              aria-label="Include random number"
              className="shrink-0"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
