import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header';
import { PasswordDisplay } from './components/PasswordDisplay';
import { LengthSlider } from './components/LengthSlider';
import { CharacterOptions } from './components/CharacterOptions';
import { GenerateButton } from './components/GenerateButton';
import { SecurityNotice } from './components/SecurityNotice';
import { DEFAULT_PASSWORD_LENGTH } from './constants/characters';
import { calculateStrength, generatePassword } from './utils/password';
import type { CharacterOptionKey } from './types';

const INITIAL_OPTIONS = {
  upper: true,
  lower: true,
  number: true,
  char: false,
};

export default function App() {
  const [length, setLength] = useState<number>(DEFAULT_PASSWORD_LENGTH);
  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [password, setPassword] = useState<string>(() =>
    generatePassword({ length: DEFAULT_PASSWORD_LENGTH, ...INITIAL_OPTIONS })
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<boolean>(false);

  const copyTimeoutRef = useRef<number | null>(null);
  const passwordRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword({ length, ...options }));
    setCopied(false);
    setCopyError(false);
  }, [length, options]);

  const handleLengthChange = useCallback((newLength: number) => {
    setLength(newLength);
    setPassword(generatePassword({ length: newLength, ...options }));
    setCopied(false);
    setCopyError(false);
  }, [options]);

  const handleToggleOption = useCallback((key: CharacterOptionKey) => {
    setOptions((prev) => {
      const activeCount = Object.values(prev).filter(Boolean).length;
      if (activeCount === 1 && prev[key]) {
        return prev;
      }
      const updated = { ...prev, [key]: !prev[key] };
      setPassword(generatePassword({ length, ...updated }));
      setCopied(false);
      setCopyError(false);
      return updated;
    });
  }, [length]);

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

  const strength = useMemo(
    () => calculateStrength({ password, length, ...options }),
    [password, length, options]
  );

  return (
    <main className="min-h-screen w-full bg-[#fcfbfa] text-[#111111] flex justify-center items-center p-6 font-sans antialiased selection:bg-blue-100">
      <div className="w-full max-w-145 flex flex-col gap-6">
        <Header />

        <PasswordDisplay
          password={password}
          copied={copied}
          copyError={copyError}
          strength={strength}
          passwordRef={passwordRef}
          onCopy={handleCopy}
        />

        <section className="flex flex-col gap-6 px-1">
          <LengthSlider length={length} onChange={handleLengthChange} />
          <CharacterOptions options={options} onToggle={handleToggleOption} />
          <GenerateButton onClick={handleGenerate} />
        </section>

        <SecurityNotice />
      </div>
    </main>
  );
}