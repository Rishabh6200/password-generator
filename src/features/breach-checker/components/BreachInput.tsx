import { Eye, EyeOff, Search, RotateCcw, ClipboardPaste } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CheckStatus } from '../types';

interface BreachInputProps {
  password: string;
  showPassword: boolean;
  status: CheckStatus;
  onChangePassword: (value: string) => void;
  onToggleShowPassword: () => void;
  onPaste: () => void;
  onClear: () => void;
  onCheck: () => void;
}

export function BreachInput({
  password,
  showPassword,
  status,
  onChangePassword,
  onToggleShowPassword,
  onPaste,
  onClear,
  onCheck,
}: BreachInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label
          htmlFor="breach-password-input"
          className="text-sm font-semibold text-foreground select-none cursor-pointer"
        >
          Check Password for Exposure
        </Label>
        <span className="text-xs text-muted-foreground font-mono">
          Zero-Knowledge k-Anonymity
        </span>
      </div>

      <div className="relative flex items-center">
        <Input
          id="breach-password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCheck();
            }
          }}
          placeholder="Type or paste any password to audit..."
          className="h-11 pr-28 font-mono text-sm sm:text-base bg-muted/30 dark:bg-muted/15"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {password ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onClear}
              aria-label="Clear password"
              className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onPaste}
              aria-label="Paste from clipboard"
              className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ClipboardPaste className="size-4" />
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onToggleShowPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-[10px]">Enter</kbd> to inspect against &gt;1,000,000,000 compromised passwords.
        </p>

        <Button
          type="button"
          variant="default"
          onClick={onCheck}
          disabled={!password.trim() || status === 'checking'}
          className="h-10 rounded-xl px-5 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/25 transition-all active:scale-95 cursor-pointer self-end sm:self-auto"
        >
          {status === 'checking' ? (
            <>
              <Search className="size-4 mr-2 animate-spin" />
              <span>Auditing...</span>
            </>
          ) : (
            <>
              <Search className="size-4 mr-2" />
              <span>Audit Breach Database</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
