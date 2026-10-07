import { useState, type RefObject } from 'react';
import { Check, CopyIcon, RotateCcw, ShieldAlert } from 'lucide-react';
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
  onAuditInBreach?: () => void;
  tabsActive: string;
}

export function PasswordDisplay({
  password,
  copied,
  copyError,
  strength,
  passwordRef,
  onCopy,
  onRegenerate,
  onAuditInBreach,
  tabsActive
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
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-border/80 bg-muted/40 dark:bg-muted/20 px-4 sm:px-5 py-3.5 sm:py-4 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 shadow-xs">
        {/* Selectable Auto-sizing Password Text */}
        <div
          className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider text-foreground break-all select-all flex-1 py-1 leading-relaxed cursor-text min-h-12 flex items-center tabular-nums"
          aria-label="Generated password"
          role="textbox"
          aria-readonly="true"
        >
          {password || <span className="text-muted-foreground/60 font-normal text-base sm:text-lg">Your password will appear here</span>}
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

        {/* Grouped Actions: Audit + Regenerate + Primary Copy */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          {onAuditInBreach && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onAuditInBreach}
                    disabled={!password}
                    aria-label="Audit password in breach database"
                    className="size-10 rounded-xl border-border/70 transition-all hover:bg-muted hover:text-primary active:scale-95 cursor-pointer"
                  />
                }
              >
                <ShieldAlert className="size-4 text-muted-foreground transition-colors hover:text-primary" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Audit in Breach Database</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRegenerateClick}
                  aria-label="Generate new password"
                  className="size-10 rounded-xl border-border/70 transition-all hover:bg-muted active:scale-95 cursor-pointer"
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
            className="h-10 rounded-xl px-5 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/25 transition-all active:scale-95 cursor-pointer"
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
      {password && tabsActive !== "pin" && <PasswordStrength strength={strength} />}
    </div>
  );
}
