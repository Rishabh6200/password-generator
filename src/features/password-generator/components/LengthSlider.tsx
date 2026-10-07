import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../constants/characters';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LengthSliderProps {
   length: number;
   onChange: (length: number) => void;
}

export function LengthSlider({ length, onChange }: LengthSliderProps) {
   return (
      <div className="flex flex-col gap-2.5">
         <div className="flex items-center justify-between">
            <Label
               htmlFor="length-slider"
               className="text-sm font-semibold text-foreground select-none cursor-pointer"
            >
               Password Length
            </Label>

            <div className="flex items-center gap-1.5">
               <Input
                  type="number"
                  min={MIN_PASSWORD_LENGTH}
                  max={MAX_PASSWORD_LENGTH}
                  value={length}
                  onChange={(e) => {
                     const val = parseInt(e.target.value, 10);
                     if (!isNaN(val)) {
                        onChange(Math.max(MIN_PASSWORD_LENGTH, Math.min(MAX_PASSWORD_LENGTH, val)));
                     }
                  }}
                  aria-label="Password length"
                  className="w-13 h-7 text-center font-mono text-xs font-bold px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
               />
               <Badge variant="secondary" className="font-mono text-xs font-medium px-1.5 py-0.5 rounded-lg select-none">
                  chars
               </Badge>
            </div>
         </div>

         <Slider
            id="length-slider"
            min={MIN_PASSWORD_LENGTH}
            max={MAX_PASSWORD_LENGTH}
            value={[length]}
            onValueChange={(val) => {
               const next = Array.isArray(val) ? val[0] : val;
               if (typeof next === 'number' && next !== length) {
                  onChange(next);
               }
            }}
            aria-label={`Password length: ${length}`}
            className="w-full py-1"
         />

         <div className="flex justify-between text-[11px] text-muted-foreground font-mono select-none px-0.5">
            <span>Min: {MIN_PASSWORD_LENGTH}</span>
            <span>Max: {MAX_PASSWORD_LENGTH}</span>
         </div>

         <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">Quick presets:</span>
            {[12, 16, 20, 32, 64].map((preset) => (
               <Button
                  key={preset}
                  variant={length === preset ? "default" : "outline"}
                  size="xs"
                  onClick={() => onChange(preset)}
               >
                  {preset}
               </Button>
            ))}
         </div>
      </div>
   );
}
