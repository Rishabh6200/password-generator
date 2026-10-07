import { Info, CheckCircle2, ChevronDown } from 'lucide-react';

export function KAnonymityExplainer() {
  return (
    <details className="group rounded-2xl border border-border/60 bg-muted/20 p-3.5 transition-all text-xs">
      <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground flex items-center justify-between list-none select-none">
        <span className="flex items-center gap-2">
          <Info className="size-3.5 text-primary" />
          How does zero-knowledge breach auditing work?
        </span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-open:rotate-180 text-muted-foreground" />
      </summary>

      <div className="pt-3 mt-2 border-t border-border/40 flex flex-col gap-2.5">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          KeyCraft utilizes mathematical <strong>k-Anonymity</strong>. Your password never leaves your browser:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-xl border border-border/50 bg-background/60 flex flex-col gap-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="size-3 text-primary" />
              1. Local SHA-1 Hash
            </span>
            <span className="text-muted-foreground text-[10px]">
              Computed strictly in device memory.
            </span>
          </div>

          <div className="p-2.5 rounded-xl border border-border/50 bg-background/60 flex flex-col gap-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="size-3 text-primary" />
              2. 5-Char Prefix Sent
            </span>
            <span className="text-muted-foreground text-[10px]">
              Only the first 5 chars are sent to the API.
            </span>
          </div>

          <div className="p-2.5 rounded-xl border border-border/50 bg-background/60 flex flex-col gap-0.5">
            <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="size-3 text-primary" />
              3. Client-Side Match
            </span>
            <span className="text-muted-foreground text-[10px]">
              Matched locally in your browser.
            </span>
          </div>
        </div>
      </div>
    </details>
  );
}
