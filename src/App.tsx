import { useCallback, useEffect, useRef, useState } from 'react';
import { CopySimpleIcon, ArrowClockwiseIcon, KeyIcon } from '@phosphor-icons/react';

export default function App() {
  const [length, setLength] = useState<number>(16);
  const [upper, setUpper] = useState<boolean>(true);
  const [lower, setLower] = useState<boolean>(true);
  const [number, setNumber] = useState<boolean>(true);
  const [char, setChar] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const copyTimeoutRef = useRef<number | null>(null);
  const passwordRef = useRef<HTMLTextAreaElement | null>(null);

  const buildCharset = (useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string[] => {
    const uppercaseArr = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const lowercaseArr = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const numbersArr = Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i));
    const symbolsArr = [...'!@#$&_-'];

    return [
      ...(useUpper ? uppercaseArr : []),
      ...(useLower ? lowercaseArr : []),
      ...(useNumbers ? numbersArr : []),
      ...(useSymbols ? symbolsArr : []),
    ];
  };

  const passwordGenerator = useCallback(() => {
    const chars = buildCharset(upper, lower, number, char);
    if (!chars.length) {
      setPassword('');
      return;
    }

    const randVals = new Uint32Array(length);
    window.crypto.getRandomValues(randVals);

    const pass = Array.from(randVals)
      .map(v => chars[v % chars.length])
      .join('');

    setPassword(pass);
  }, [length, upper, lower, number, char]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyPassword = useCallback(async () => {
    if (!passwordRef.current) return;
    passwordRef.current.select();
    await window.navigator.clipboard.writeText(password);
    setCopied(true);

    if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
  }, [password]);

  const sliderPercentage = ((length - 6) / (64 - 6)) * 100;

  return (
    <main className="min-h-screen w-full bg-[#fcfbfa] text-[#111111] flex justify-center items-center p-6 font-sans antialiased selection:bg-blue-100">
      <div className="w-full max-w-145 flex flex-col gap-6">

        <header className="flex items-center gap-2.5 px-1 pb-1 select-none">
          <div className="bg-[#d97757] p-2 rounded-xl text-white shadow-sm shadow-orange-500/10">
            <KeyIcon size={20} weight="duotone" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111111] tracking-tight">Generate Password</h1>
            <p className="text-xs text-[#72716a] font-medium tracking-normal">Keys & Security Options</p>
          </div>
        </header>

        <div className="bg-[#f5f4ee] rounded-2xl px-6 pt-5 pb-6 border border-[#ecebe4] transition-all">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-[#72716a] font-medium tracking-wide select-none">generated password</span>

            <button
              className={`border rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer outline-none shadow-sm ${copied
                  ? 'bg-[#16a34a] border-[#16a34a] hover:bg-[#15803d] hover:border-[#15803d] active:bg-[#166534] text-white'
                  : 'bg-transparent border-[#d2d1ca] hover:bg-[#eae9e2] hover:border-[#b8b7b0] active:bg-[#dfded7] text-[#222222]'
                }`}
              type="button"
              onClick={copyPassword}
            >
              <CopySimpleIcon
                size={15}
                weight="regular"
                className={copied ? 'text-white' : 'text-[#333333]'}
              />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            className="w-full bg-transparent border-none outline-none font-mono text-xl md:text-2xl font-medium tracking-wide text-[#1c1c1a] p-0 resize-none break-all min-h-16 leading-relaxed"
            value={password}
            readOnly
            rows={2}
            ref={passwordRef}
            placeholder="Your password will appear here"
          />
        </div>

        <div className="flex flex-col gap-6 px-1">

          <div className="flex items-center justify-between gap-5">
            <label htmlFor="length-slider" className="text-sm font-semibold text-[#111111] select-none min-w-12.5">Length</label>
            <div className="flex items-center grow gap-5">
              <input
                id="length-slider"
                type="range"
                min={6}
                max={64}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer outline-none transition-all
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d97757] 
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(217,119,87,0.15)] [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#d97757]"
                style={{
                  background: `linear-gradient(to right, #d97757 ${sliderPercentage}%, #e4e4e6 ${sliderPercentage}%)`
                }}
              />
              <span className="text-base font-bold min-w-6 text-right text-black tabular-nums">{length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-1">
            <label className="flex items-center gap-3 text-sm text-[#111111] font-medium cursor-pointer select-none group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-[#b5b5b0] bg-white checked:bg-[#d97757] checked:border-[#d97757] transition-all appearance-none grid place-items-center cursor-pointer checked:before:content-['✓'] before:text-white before:text-[11px] before:font-bold focus:ring-0"
                checked={upper}
                onChange={() => setUpper(!upper)}
              />
              <span className="group-hover:text-black transition-colors">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-[#111111] font-medium cursor-pointer select-none group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-[#b5b5b0] bg-white checked:bg-[#d97757] checked:border-[#d97757] transition-all appearance-none grid place-items-center cursor-pointer checked:before:content-['✓'] before:text-white before:text-[11px] before:font-bold focus:ring-0"
                checked={lower}
                onChange={() => setLower(!lower)}
              />
              <span className="group-hover:text-black transition-colors">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-[#111111] font-medium cursor-pointer select-none group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-[#b5b5b0] bg-white checked:bg-[#d97757] checked:border-[#d97757] transition-all appearance-none grid place-items-center cursor-pointer checked:before:content-['✓'] before:text-white before:text-[11px] before:font-bold focus:ring-0"
                checked={number}
                onChange={() => setNumber(!number)}
              />
              <span className="group-hover:text-black transition-colors">Numbers (0-9)</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-[#111111] font-medium cursor-pointer select-none group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm border border-[#b5b5b0] bg-white checked:bg-[#d97757] checked:border-[#d97757] transition-all appearance-none grid place-items-center cursor-pointer checked:before:content-['✓'] before:text-white before:text-[11px] before:font-bold focus:ring-0"
                checked={char}
                onChange={() => setChar(!char)}
              />
              <span className="group-hover:text-black transition-colors">Symbols (!@#_...)</span>
            </label>
          </div>

          <button
            className="w-full bg-[#f4f4f5] hover:bg-[#eaeaea] active:bg-[#dfdfdf] border border-[#d4d4d8] rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#18181b] transition-all cursor-pointer outline-none mt-3 shadow-sm active:scale-[0.99]"
            type="button"
            onClick={passwordGenerator}
          >
            <ArrowClockwiseIcon size={16} weight="bold" className="text-[#3f3f46]" />
            <span>Generate</span>
          </button>

        </div>
      </div>
    </main>
  );
}