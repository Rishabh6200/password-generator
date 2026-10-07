import { Info, CheckCircle2 } from 'lucide-react';

export function KAnonymityExplainer() {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground">
        <Info className="size-4 text-primary" />
        <span>How does KeyCraft audit passwords without exposing them?</span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        KeyCraft utilizes mathematical <strong>k-Anonymity</strong>. Your password never leaves your browser:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
        <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex flex-col gap-1">
          <span className="font-semibold text-foreground flex items-center gap-1">
            <CheckCircle2 className="size-3.5 text-primary" />
            1. Local SHA-1 Hash
          </span>
          <span className="text-muted-foreground text-[11px]">
            Computed strictly in device memory via Web Crypto API.
          </span>
        </div>

        <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex flex-col gap-1">
          <span className="font-semibold text-foreground flex items-center gap-1">
            <CheckCircle2 className="size-3.5 text-primary" />
            2. 5-Char Prefix Sent
          </span>
          <span className="text-muted-foreground text-[11px]">
            Only the first 5 characters (e.g.{' '}
            <code className="font-mono text-primary font-bold">5BAA6</code>) are sent over the network.
          </span>
        </div>

        <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex flex-col gap-1">
          <span className="font-semibold text-foreground flex items-center gap-1">
            <CheckCircle2 className="size-3.5 text-primary" />
            3. Client-Side Match
          </span>
          <span className="text-muted-foreground text-[11px]">
            The remaining 35 characters are compared locally in your browser.
          </span>
        </div>
      </div>
    </div>
  );
}
