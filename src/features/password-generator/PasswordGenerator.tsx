import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PasswordDisplay } from './components/PasswordDisplay';
import { LengthSlider } from './components/LengthSlider';
import { CharacterOptions } from './components/CharacterOptions';
import { PassphraseControls } from './components/PassphraseControls';
import { PinControls } from './components/PinControls';
import { DEFAULT_PASSWORD_LENGTH } from './constants/characters';
import { calculateStrength, calculatePassphraseStrength, calculatePinStrength, generatePassword, generatePassphrase, generatePin } from './utils/password';
import type { PasswordMode, CharacterOptionKey, PassphraseOptions, PinOptions, Strength } from './types';

const INITIAL_RANDOM_OPTIONS = {
   upper: true,
   lower: true,
   number: true,
   char: false,
   avoidAmbiguous: false,
};

const INITIAL_PASSPHRASE_OPTIONS: PassphraseOptions = {
   wordCount: 4,
   separator: '-',
   capitalize: true,
   includeNumber: false,
};

const INITIAL_PIN_OPTIONS: PinOptions = {
   length: 6,
};

interface PasswordGeneratorProps {
   onAuditInBreach?: (password: string) => void;
   initialMode?: PasswordMode;
}

export function PasswordGenerator({ onAuditInBreach, initialMode = 'random' }: PasswordGeneratorProps = {}) {
   const navigate = useNavigate();
   const [mode, setMode] = useState<PasswordMode>(initialMode);
   const [randomLength, setRandomLength] = useState<number>(DEFAULT_PASSWORD_LENGTH);
   const [randomOptions, setRandomOptions] = useState(INITIAL_RANDOM_OPTIONS);
   const [passphraseOptions, setPassphraseOptions] = useState<PassphraseOptions>(INITIAL_PASSPHRASE_OPTIONS);
   const [pinOptions, setPinOptions] = useState<PinOptions>(INITIAL_PIN_OPTIONS);
   const [password, setPassword] = useState<string>(() => {
      if (initialMode === 'passphrase') return generatePassphrase(INITIAL_PASSPHRASE_OPTIONS);
      if (initialMode === 'pin') return generatePin(INITIAL_PIN_OPTIONS);
      return generatePassword({ length: DEFAULT_PASSWORD_LENGTH, ...INITIAL_RANDOM_OPTIONS });
   });
   const [copied, setCopied] = useState<boolean>(false);
   const [copyError, setCopyError] = useState<boolean>(false);

   const copyTimeoutRef = useRef<number | null>(null);
   const passwordRef = useRef<HTMLTextAreaElement | null>(null);

   const handleAudit = useCallback((targetPwd: string) => {
      if (onAuditInBreach) {
         onAuditInBreach(targetPwd);
      } else {
         navigate('/password-breach-checker', { state: { password: targetPwd } });
      }
   }, [onAuditInBreach, navigate]);

   const generateCurrent = useCallback((currentMode: PasswordMode = mode, rLen = randomLength, rOpts = randomOptions, pOpts = passphraseOptions, pinOpts = pinOptions) => {
      let result = '';
      if (currentMode === 'random') {
         result = generatePassword({ length: rLen, ...rOpts });
      } else if (currentMode === 'passphrase') {
         result = generatePassphrase(pOpts);
      } else if (currentMode === 'pin') {
         result = generatePin(pinOpts);
      }
      setPassword(result);
      setCopied(false);
      setCopyError(false);
   }, [mode, randomLength, randomOptions, passphraseOptions, pinOptions]);

   useEffect(() => {
      if (initialMode && initialMode !== mode) {
         setMode(initialMode);
         generateCurrent(initialMode);
      }
   }, [initialMode, generateCurrent, mode]);

   useEffect(() => {
      return () => {
         if (copyTimeoutRef.current !== null) {
            window.clearTimeout(copyTimeoutRef.current);
         }
      };
   }, []);



   const handleRoll = useCallback(() => {
      generateCurrent();
   }, [generateCurrent]);

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         const activeTag = document.activeElement?.tagName.toLowerCase();
         if (e.code === 'Space' && activeTag !== 'input' && activeTag !== 'textarea') {
            e.preventDefault();
            handleRoll();
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
   }, [handleRoll]);

   const handleRandomLengthChange = useCallback((newLength: number) => {
      setRandomLength((prev) => {
         if (prev === newLength) return prev;
         generateCurrent('random', newLength, randomOptions);
         return newLength;
      });
   }, [generateCurrent, randomOptions]);

   const handleToggleRandomOption = useCallback((key: CharacterOptionKey) => {
      setRandomOptions((prev) => {
         const activeCount = [prev.upper, prev.lower, prev.number, prev.char].filter(Boolean).length;
         if (activeCount === 1 && prev[key]) {
            return prev;
         }
         const updated = { ...prev, [key]: !prev[key] };
         generateCurrent('random', randomLength, updated);
         return updated;
      });
   }, [generateCurrent, randomLength]);

   const handleToggleAvoidAmbiguous = useCallback(() => {
      setRandomOptions((prev) => {
         const updated = { ...prev, avoidAmbiguous: !prev.avoidAmbiguous };
         generateCurrent('random', randomLength, updated);
         return updated;
      });
   }, [generateCurrent, randomLength]);

   const handlePassphraseChange = useCallback((newOptions: PassphraseOptions) => {
      setPassphraseOptions(newOptions);
      generateCurrent('passphrase', randomLength, randomOptions, newOptions);
   }, [generateCurrent, randomLength, randomOptions]);

   const handlePinChange = useCallback((newOptions: PinOptions) => {
      setPinOptions(newOptions);
      generateCurrent('pin', randomLength, randomOptions, passphraseOptions, newOptions);
   }, [generateCurrent, randomLength, randomOptions, passphraseOptions]);

   const handleCopy = useCallback(async () => {
      if (!password) return;
      setCopyError(false);

      try {
         await navigator.clipboard.writeText(password);
         setCopied(true);

         if (copyTimeoutRef.current !== null) {
            window.clearTimeout(copyTimeoutRef.current);
         }

         copyTimeoutRef.current = window.setTimeout(() => {
            setCopied(false);
         }, 1500);
      } catch {
         if (passwordRef.current) {
            passwordRef.current.focus();
            passwordRef.current.select();
         }
         setCopyError(true);

         if (copyTimeoutRef.current !== null) {
            window.clearTimeout(copyTimeoutRef.current);
         }

         copyTimeoutRef.current = window.setTimeout(() => {
            setCopyError(false);
         }, 2000);
      }
   }, [password]);

   const strength: Strength = useMemo(() => {
      if (mode === 'random') {
         return calculateStrength({ password, length: randomLength, ...randomOptions });
      }
      if (mode === 'passphrase') {
         return calculatePassphraseStrength(passphraseOptions.wordCount);
      }
      return calculatePinStrength(pinOptions.length);
   }, [mode, password, randomLength, randomOptions, passphraseOptions.wordCount, pinOptions.length]);

   return (
      <div className="w-full rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-5 sm:p-8 shadow-xl shadow-black/3 dark:shadow-black/50 ring-1 ring-black/4 dark:ring-white/6 flex flex-col gap-6">
         <PasswordDisplay
            password={password}
            copied={copied}
            copyError={copyError}
            strength={strength}
            passwordRef={passwordRef}
            onCopy={handleCopy}
            onRegenerate={handleRoll}
            onAuditInBreach={() => handleAudit(password)}
            tabsActive={mode}
         />

         <div className="h-px bg-border/60" />

         <div className="w-full animate-in fade-in duration-300">
            {mode === 'random' && (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                     <LengthSlider length={randomLength} onChange={handleRandomLengthChange} />
                  </div>
                  <div className="lg:col-span-7">
                     <CharacterOptions
                        options={randomOptions}
                        onToggle={handleToggleRandomOption}
                        onToggleAvoidAmbiguous={handleToggleAvoidAmbiguous}
                     />
                  </div>
               </div>
            )}

            {mode === 'passphrase' && (
               <PassphraseControls options={passphraseOptions} onChange={handlePassphraseChange} />
            )}

            {mode === 'pin' && (
               <PinControls options={pinOptions} onChange={handlePinChange} />
            )}
         </div>
      </div>
   );
}
