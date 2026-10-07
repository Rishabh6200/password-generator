import { Link, NavLink } from "react-router";
import { KeyRound, Lock, Moon, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "cn";

export function Navbar() {
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <header className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6">
         <div className="max-w-4xl mx-auto flex h-14 items-center justify-between px-3 sm:px-4 rounded-2xl border border-border/70 bg-background/85 backdrop-blur-xl shadow-lg shadow-black/4 dark:shadow-black/40 ring-1 ring-border/40 transition-all">
            {/* Clean Brand Mark */}
            <Link
               to="/"
               className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 select-none"
            >
               <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-xs transition-transform group-hover:scale-105">
                  <KeyRound className="size-4" />
               </div>
               <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-foreground">
                  KeyCraft
               </span>
            </Link>

            {/* Modern Tool Navigation */}
            <nav className="flex items-center gap-1">
               <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                     cn(
                        "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none",
                        isActive
                           ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/25 shadow-xs"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     )
                  }
               >
                  <Lock className="size-3.5" />
                  <span>Generator</span>
               </NavLink>
               <NavLink
                  to="/breach"
                  className={({ isActive }) =>
                     cn(
                        "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none",
                        isActive
                           ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/25 shadow-xs"
                           : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                     )
                  }
               >
                  <ShieldCheck className="size-3.5" />
                  <span>Breach Auditor</span>
               </NavLink>
            </nav>

            {/* Right Tools: Security Status & Theme Toggle */}
            <div className="flex items-center gap-2">
               <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium select-none">
                  <span className="relative flex size-1.5">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>Client-Side</span>
               </div>

               <div className="h-4 w-px bg-border/60 hidden sm:block" />

               <Tooltip>
                  <TooltipTrigger
                     render={
                        <Button
                           variant="ghost"
                           size="icon-sm"
                           onClick={toggleTheme}
                           aria-label="Toggle theme"
                           className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 cursor-pointer transition-all"
                        />
                     }
                  >
                     <Sun className="size-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0 text-foreground" />
                     <Moon className="absolute size-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100 text-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Toggle theme ({theme === "dark" ? "Light" : "Dark"})</p>
                  </TooltipContent>
               </Tooltip>
            </div>
         </div>
      </header>
   );
}
