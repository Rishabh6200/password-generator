import { Info, CheckCircle2 } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export function KAnonymityExplainer() {
  return (
    <Accordion className="rounded-2xl border border-border/70 bg-muted/30 dark:bg-muted/15 text-xs overflow-hidden">
      <AccordionItem value="explainer" className="border-b-0 data-open:bg-transparent">
        <AccordionTrigger className="py-3.5 px-4 sm:px-5 hover:no-underline text-xs sm:text-sm font-semibold text-foreground">
          <span className="flex items-center gap-2">
            <Info className="size-4 text-primary shrink-0" />
            How does zero-knowledge breach auditing work?
          </span>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-4 px-4 sm:px-5 flex flex-col gap-2.5 border-t border-border/50 mt-1">
          <p className="text-xs text-muted-foreground leading-relaxed pt-2">
            KeyCraft utilizes mathematical <strong className="text-foreground">k-Anonymity</strong>. Your password never leaves your browser:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-xl border border-border/70 bg-background/80 dark:bg-card/70 flex flex-col gap-1 shadow-2xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                1. Local SHA-1 Hash
              </span>
              <span className="text-xs text-muted-foreground leading-normal">
                Computed strictly in device memory via Web Crypto API.
              </span>
            </div>

            <div className="p-3 rounded-xl border border-border/70 bg-background/80 dark:bg-card/70 flex flex-col gap-1 shadow-2xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                2. 5-Char Prefix Sent
              </span>
              <span className="text-xs text-muted-foreground leading-normal">
                Only the first 5 characters are sent to query the database.
              </span>
            </div>

            <div className="p-3 rounded-xl border border-border/70 bg-background/80 dark:bg-card/70 flex flex-col gap-1 shadow-2xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                3. Client-Side Match
              </span>
              <span className="text-xs text-muted-foreground leading-normal">
                The remaining characters are compared locally in your browser.
              </span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}