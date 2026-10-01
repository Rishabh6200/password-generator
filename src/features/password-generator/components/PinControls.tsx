import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { PinOptions } from '../types';

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
            <button
              key={preset}
              type="button"
              onClick={() => setLength(preset)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                options.length === preset
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {preset} digits
            </button>
          ))}
        </div>
      </div>

      {/* Helpful PIN Information Card */}
      <div className="lg:col-span-7 flex flex-col gap-2.5">
        <span className="text-sm font-semibold text-foreground select-none">
          Recommended Use Cases
        </span>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/50 flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">4 Digits</span>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
              Standard for ATM cards, SIM locks, and physical locks.
            </p>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl border border-border bg-card/50 flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground">6 Digits (Rec.)</span>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
              Default for phone lockscreens and 2FA codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
