import { NavLink, useLocation } from "react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "cn";

interface DesktopNavLinkProps {
   to: string;
   label: string;
   icon: LucideIcon;
   end?: boolean;
}

export function DesktopNavLink({ to, label, icon: Icon, end = false }: DesktopNavLinkProps) {
   const location = useLocation();
   const isActive = end ? location.pathname === to : location.pathname.startsWith(to);

   return (
      <NavLink
         to={to}
         end={end}
         className={cn(
            "group relative flex items-center gap-1.5 py-1.5 px-2.5 text-xs font-medium transition-colors cursor-pointer select-none whitespace-nowrap",
            isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
         )}
      >
         <Icon className="size-3.5 transition-colors group-hover:text-foreground" />
         <span>{label}</span>
         <span
            className={cn(
               "absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-300 origin-center",
               isActive
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
            )}
         />
      </NavLink>
   );
}
