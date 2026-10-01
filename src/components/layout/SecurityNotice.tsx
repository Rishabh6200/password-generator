import { ShieldCheck } from 'lucide-react';

export function SecurityNotice() {
  return (
    <footer id="security" className="w-full border-t border-border/40 py-4 mt-auto bg-background/50">
      <div className="container mx-auto flex items-center justify-center gap-2 text-xs text-muted-foreground/80 px-4 sm:px-6">
        <ShieldCheck className="size-3.5 text-primary shrink-0" />
        <span>
          Generated locally via Web Crypto API · Zero data sent to any server
        </span>
      </div>
    </footer>
  );
}
