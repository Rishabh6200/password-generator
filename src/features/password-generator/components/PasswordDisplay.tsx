import { useState, type RefObject } from 'react';
import { Check, CopyIcon, RotateCcw } from 'lucide-react';
import { PasswordStrength } from './PasswordStrength';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { Strength } from '../types';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  copyError: boolean;
  strength: Strength;
  passwordRef: RefObject<HTMLTextAreaElement | null>;
  onCopy: () => void;
  onRegenerate: () => void;
}

export function PasswordDisplay({
  password,
  copied,
  copyError,
  strength,
  passwordRef,
  onCopy,
  onRegenerate,
}: PasswordDisplayProps) {
  const [spinning, setSpinning] = useState(false);

  const handleRegenerateClick = () => {
    setSpinning(true);
    onRegenerate();
    setTimeout(() => setSpinning(false), 350);
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Hero Password Display Box */}
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-border/80 bg-muted/30 p-3.5 sm:p-4 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
        {/* Selectable Auto-sizing Password Text (Never clips or shows vertical scrollbar) */}
        <div
          className="font-mono text-xl sm:text-2xl font-bold tracking-wide text-foreground break-all select-all flex-1 py-1.5 leading-relaxed cursor-text min-h-12 flex items-center"
          aria-label="Generated password"
          role="textbox"
          aria-readonly="true"
        >
          {password || <span className="text-muted-foreground font-normal">Your password will appear here</span>}
        </div>

        {/* Off-screen textarea for fallback clipboard selection */}
        <textarea
          ref={passwordRef}
          value={password}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />

        {/* Grouped Actions: Regenerate + Primary Copy */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRegenerateClick}
                  aria-label="Generate new password"
                  className="size-9 rounded-xl transition-all active:scale-95"
                />
              }
            >
              <RotateCcw
                className={`size-4 text-muted-foreground transition-transform duration-300 ${
                  spinning ? '-rotate-180 text-foreground' : ''
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Roll new password (Space)</p>
            </TooltipContent>
          </Tooltip>

          <Button
            variant="default"
            size="default"
            onClick={onCopy}
            disabled={!password}
            className="h-9 rounded-xl px-4 font-semibold shadow-xs transition-all active:scale-98"
            aria-label="Copy password to clipboard"
          >
            {copied ? (
              <>
                <Check className="size-4 mr-1.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="size-4 mr-1.5" />
                <span>{copyError ? 'Select & Copy' : 'Copy'}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Dynamic Security Rating Bar */}
      {password && <PasswordStrength strength={strength} />}
    </div>
  );
}
