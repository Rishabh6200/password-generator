import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../constants/characters';

interface LengthSliderProps {
  length: number;
  onChange: (length: number) => void;
}

export function LengthSlider({ length, onChange }: LengthSliderProps) {
  const sliderPercentage =
    ((length - MIN_PASSWORD_LENGTH) / (MAX_PASSWORD_LENGTH - MIN_PASSWORD_LENGTH)) * 100;

  return (
    <div className="flex items-center justify-between gap-5">
      <label
        htmlFor="length-slider"
        className="text-sm font-semibold text-[#111111] select-none min-w-12.5"
      >
        Length
      </label>

      <div className="flex items-center grow gap-5">
        <input
          id="length-slider"
          type="range"
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
          value={length}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          aria-label={`Password length: ${length}`}
          className="w-full h-1 rounded-lg appearance-none cursor-pointer outline-none transition-all
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#d97757]
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(217,119,87,0.15)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#d97757]"
          style={{
            background: `linear-gradient(to right, #d97757 ${sliderPercentage}%, #e4e4e6 ${sliderPercentage}%)`,
          }}
        />

        <span className="text-base font-bold min-w-6 text-right text-black tabular-nums">
          {length}
        </span>
      </div>
    </div>
  );
}
