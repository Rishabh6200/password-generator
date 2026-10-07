import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { PinOptions } from '../types';
import { Button } from '@/components/ui/button';

interface PinControlsProps {
  options: PinOptions;
  onChange: (options: PinOptions) => void;
}

const PIN_PRESETS = [4, 6, 8, 12];

export function PinControls({ options, onChange }: PinControlsProps) {
  const setLength = (length: number) => {
    onChange({ length });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* PIN Length Slider */}
      <div className="lg:col-span-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="pin-length-slider" className="text-sm font-semibold text-foreground select-none cursor-pointer">
            PIN Length
          </Label>
          <Badge variant="secondary" className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg">
            {options.length} digits
          </Badge>
        </div>

        <Slider
          id="pin-length-slider"
          min={4}
          max={16}
          value={[options.length]}
          onValueChange={(val) => {
            const next = Array.isArray(val) ? val[0] : val;
            if (typeof next === 'number' && next !== options.length) {
              setLength(next);
            }
          }}
          aria-label={`PIN length: ${options.length}`}
          className="w-full py-1"
        />

        <div className="flex justify-between text-[11px] text-muted-foreground font-mono select-none px-0.5">
          <span>Min: 4</span>
          <span>Max: 16</span>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 pt-1 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Quick presets:</span>
          {PIN_PRESETS.map((preset) => (
            <Button
              key={preset}
              variant={options.length === preset ? "default" : "outline"}
              size="sm"
              onClick={() => setLength(preset)}
            >
              {preset} digits
            </Button>
          ))}
        </div>
      </div>

      {/* Helpful PIN Information Card */}
      <div className="lg:col-span-7 flex flex-col gap-2.5">
        <span className="text-sm font-semibold text-foreground select-none">
          Recommended Use Cases
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl border border-border/70 bg-muted/30 dark:bg-muted/15 flex flex-col gap-1.5 transition-all">
            <span className="text-xs font-semibold text-foreground">4 Digits</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Standard for ATM cards, SIM locks, and physical security keypad locks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border border-border/70 bg-muted/30 dark:bg-muted/15 flex flex-col gap-1.5 transition-all">
            <span className="text-xs font-semibold text-foreground">6 Digits (Rec.)</span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Recommended standard for iOS/Android lockscreens and 2FA authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
