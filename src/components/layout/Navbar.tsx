import { KeyRound, Lock, Moon, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "cn";

interface NavbarProps {
   currentTool?: string;
   onSelectTool?: (tool: string) => void;
}

export function Navbar({ currentTool = "password", onSelectTool }: NavbarProps) {
   const { theme, setTheme } = useTheme();

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 shadow-xs transition-all">
         <div className="max-w-4xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
               <div className="flex size-9.5 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-sm shadow-primary/30 ring-1 ring-white/20">
                  <KeyRound className="size-4.5" />
               </div>
               <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                     <span className="font-heading text-base font-bold tracking-tight text-foreground">
                        KeyCraft
                     </span>
                     <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        v2.0
                     </span>
                  </div>
                  <span className="hidden sm:inline text-[11px] text-muted-foreground font-medium">
                     Zero-Knowledge Security Suite
                  </span>
               </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-muted/60 border border-border/60">
               <button
                  type="button"
                  onClick={() => onSelectTool?.("password")}
                  className={cn(
                     "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                     currentTool === "password"
                        ? "bg-background text-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                  )}
               >
                  <Lock className="size-3" />
                  <span>Password Generator</span>
               </button>
               <a
                  href="#security"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
               >
                  <ShieldCheck className="size-3" />
                  <span>Security</span>
               </a>
            </nav>

            <div className="flex items-center gap-2.5">

               <Tooltip>
                  <TooltipTrigger
                     render={
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={toggleTheme}
                           aria-label="Toggle theme"
                           className="size-9 rounded-xl border-border/70 hover:bg-muted active:scale-95 transition-all cursor-pointer"
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

