import { NavLink, useLocation } from "react-router";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "cn";

interface MobileNavLinkProps {
   to: string;
   label: string;
   icon: LucideIcon;
   tag?: string;
   onSelect: () => void;
}

export function MobileNavLink({ to, label, icon: Icon, tag, onSelect }: MobileNavLinkProps) {
   const location = useLocation();
   const isActive = location.pathname === to;

   return (
      <NavLink
         to={to}
         onClick={onSelect}
         className={cn(
            "flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all select-none cursor-pointer",
            isActive
               ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/25"
               : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
         )}
      >
         <div className="flex items-center gap-2.5">
            <div className="size-7 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center text-foreground/80">
               <Icon className="size-3.5" />
            </div>
            <span>{label}</span>
         </div>
         <div className="flex items-center gap-2">
            {tag && (
               <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border/50">
                  {tag}
               </span>
            )}
            {isActive && <Check className="size-3.5 text-primary" />}
         </div>
      </NavLink>
   );
}
