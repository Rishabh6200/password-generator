import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  title?: string;
  description?: string;
}

export function Header({
  title = "Password Generator",
  description = "Generate cryptographically secure passwords, passphrases, and PIN codes directly in your browser."
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 select-none">
      <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
        <ShieldCheck className="size-3.5" />
        <span>Local Cryptographic Engine</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );
}
