import { Link } from 'react-router';
import {
  ArrowRight,
  Shield,
  Cpu,
  EyeOff,
} from 'lucide-react';
import { TOOLS } from '@/config/tools';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export function ToolsList() {
  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      {/* Clean Interactive Command / Directory List */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md divide-y divide-border/60 shadow-xs overflow-hidden">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="group flex items-center justify-between p-4 sm:p-5 hover:bg-muted/40 transition-colors select-none"
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-3">
                <div
                  className={`size-10 sm:size-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${tool.accent}`}
                >
                  <Icon className="size-5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2 text-muted-foreground group-hover:text-primary transition-colors">
                <span className="text-xs font-medium hidden sm:inline">Launch</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subtle Bottom Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2.5 px-4 text-xs text-muted-foreground/80 select-none">
        <span className="inline-flex items-center gap-1.5">
          <Cpu className="size-3.5 text-primary" />
          Hardware CSPRNG
        </span>
        <span className="text-border">•</span>
        <span className="inline-flex items-center gap-1.5">
          <EyeOff className="size-3.5 text-primary" />
          100% Client-Side
        </span>
        <span className="text-border">•</span>
        <span className="inline-flex items-center gap-1.5">
          <Shield className="size-3.5 text-primary" />
          Zero Network Leaks
        </span>
      </div>

      {/* shadcn Accordion FAQ for SEO */}
      <Accordion className="rounded-2xl border border-border/70 bg-muted/30 dark:bg-muted/15 text-xs overflow-hidden">
        <AccordionItem value="faq" className="border-b-0 data-open:bg-transparent">
          <AccordionTrigger className="py-3.5 px-4 sm:px-5 hover:no-underline text-xs sm:text-sm font-semibold text-foreground">
            <span className="flex items-center gap-2">
              <Shield className="size-4 text-primary shrink-0" />
              Security &amp; Cryptography Guide (FAQ)
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-0 pb-4 px-4 sm:px-5 border-t border-border/50 mt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-muted-foreground leading-relaxed text-xs">
              <div>
                <span className="font-semibold text-foreground">What is cryptographic entropy?</span>
                <p className="mt-0.5">
                  Entropy measures credential unpredictability. Generated via window.crypto.getRandomValues rather than pseudo-random math.
                </p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Password vs Passphrase</span>
                <p className="mt-0.5">
                  Random passwords provide character density for password managers. Passphrases provide equivalent entropy while remaining human-memorable.
                </p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Zero-Knowledge k-Anonymity</span>
                <p className="mt-0.5">
                  Breach checks only transmit 5 characters of a SHA-1 hash. Full hashes and passwords never leave your machine.
                </p>
              </div>
              <div>
                <span className="font-semibold text-foreground">Client-Side Execution</span>
                <p className="mt-0.5">
                  Zero cookies, zero telemetry, zero server roundtrips. Operates entirely offline.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
