import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../constants/characters';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

            <Badge variant="secondary" className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg">
               {length} chars
            </Badge>
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
