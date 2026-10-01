interface HeaderProps {
  title?: string;
  description?: string;
}

export function Header({
  title = "Password Generator",
  description = "Generate cryptographically secure passwords, passphrases, and PIN codes directly in your browser."
}: HeaderProps) {
  return (
    <div className="flex flex-col gap-1 select-none px-1">
      <h2 className="text-2xl font-bold tracking-tight text-foreground font-heading">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
