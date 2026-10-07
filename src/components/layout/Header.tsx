interface HeaderProps {
   title?: string;
   description?: string;
   badge?: string;
}

export function Header({
   title = "Password Generator",
   description = "Generate cryptographically secure credentials directly in your browser.",
}: HeaderProps) {
   return (
      <div className="flex flex-col gap-1 select-none">
         <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-heading">
            {title}
         </h1>
         {description && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
               {description}
            </p>
         )}
      </div>
   );
}
