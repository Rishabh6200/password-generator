import type { RefObject } from 'react';
import { CopySimpleIcon } from '@phosphor-icons/react';
import { PasswordStrength } from './PasswordStrength';
import type { Strength } from '../types';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  copyError: boolean;
  strength: Strength;
  passwordRef: RefObject<HTMLTextAreaElement | null>;
  onCopy: () => void;
}

export function PasswordDisplay({
  password,
  copied,
  copyError,
  strength,
  passwordRef,
  onCopy,
}: PasswordDisplayProps) {
  return (
    <section
      className="bg-[#f5f4ee] rounded-2xl px-6 pt-5 pb-6 border border-[#ecebe4] transition-all"
      aria-label="Generated password"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-[#72716a] font-medium tracking-wide select-none">
          Generated password
        </span>

        <button
          className={`border rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer outline-none shadow-sm ${
            copied
              ? 'bg-[#16a34a] border-[#16a34a] hover:bg-[#15803d] hover:border-[#15803d] active:bg-[#166534] text-white'
              : 'bg-transparent border-[#d2d1ca] hover:bg-[#eae9e2] hover:border-[#b8b7b0] active:bg-[#dfded7] text-[#222222]'
          }`}
          type="button"
          onClick={onCopy}
          disabled={!password}
          aria-label="Copy generated password"
        >
          <CopySimpleIcon
            size={15}
            weight="regular"
            className={copied ? 'text-white' : 'text-[#333333]'}
          />

          <span>
            {copied ? 'Copied!' : copyError ? 'Select & Copy' : 'Copy'}
          </span>
        </button>
      </div>

      <textarea
        className="w-full bg-transparent border-none outline-none font-mono text-xl md:text-2xl font-medium tracking-wide text-[#1c1c1a] p-0 resize-none break-all min-h-16 leading-relaxed"
        value={password}
        readOnly
        rows={2}
        ref={passwordRef}
        aria-label="Generated password"
        placeholder="Your password will appear here"
      />

      {password && <PasswordStrength strength={strength} />}
    </section>
  );
}
