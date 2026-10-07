import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
   KeyRound,
   Lock,
   Fingerprint,
   Hash,
   LayoutGrid,
   Moon,
   ShieldCheck,
   Sun,
   Menu,
   X,
   Check,
} from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "cn";

const NAV_LINKS = [
   { to: "/", label: "All Tools", icon: LayoutGrid, end: true },
   { to: "/password-generator", label: "Password", icon: Lock },
   { to: "/passphrase-generator", label: "Passphrase", icon: Fingerprint },
   { to: "/pin-generator", label: "PIN Code", icon: Hash },
   { to: "/password-breach-checker", label: "Breach Auditor", icon: ShieldCheck },
];

export function Navbar() {
   const { theme, setTheme } = useTheme();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const location = useLocation();

   // Automatically close mobile menu when navigating
   useEffect(() => {
      setMobileMenuOpen(false);
   }, [location.pathname]);

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6">
         <div className="max-w-5xl mx-auto rounded-2xl border border-border/70 bg-background/85 backdrop-blur-xl shadow-lg shadow-black/4 dark:shadow-black/40 ring-1 ring-border/40 transition-all">
            {/* Top Bar Row */}
            <div className="flex h-14 items-center justify-between px-3 sm:px-5">
               {/* Clean Brand Mark */}
               <Link
                  to="/"
                  className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 select-none shrink-0"
                  title="KeyCraft Tools Hub"
               >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-xs transition-transform group-hover:scale-105">
                     <KeyRound className="size-4" />
                  </div>
                  <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-foreground">
                     KeyCraft
                  </span>
               </Link>

               {/* Desktop & Tablet Navigation (hidden on mobile, visible md+) */}
               <nav className="hidden md:flex items-center gap-1">
                  {NAV_LINKS.map((item) => {
                     const Icon = item.icon;
                     return (
                        <NavLink
                           key={item.to}
                           to={item.to}
                           end={item.end}
                           className={({ isActive }) =>
                              cn(
                                 "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer select-none whitespace-nowrap",
                                 isActive
                                    ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/25 shadow-xs"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )
                           }
                        >
                           <Icon className="size-3.5" />
                           <span>{item.label}</span>
                        </NavLink>
                     );
                  })}
               </nav>

               {/* Right Side: Security Badge, Theme Toggle & Mobile Menu Trigger */}
               <div className="flex items-center gap-1.5 sm:gap-2">
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

                  {/* Mobile Hamburger / Close Trigger */}
                  <Button
                     variant="ghost"
                     size="icon-sm"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                     aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                     className="md:hidden size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 cursor-pointer transition-all ml-0.5"
                  >
                     {mobileMenuOpen ? (
                        <X className="size-4.5" />
                     ) : (
                        <Menu className="size-4.5" />
                     )}
                  </Button>
               </div>
            </div>

            {/* Mobile Expanded Dropdown Menu */}
            {mobileMenuOpen && (
               <div className="md:hidden border-t border-border/50 px-3 py-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {NAV_LINKS.map((item) => {
                     const Icon = item.icon;
                     return (
                        <NavLink
                           key={item.to}
                           to={item.to}
                           end={item.end}
                           onClick={() => setMobileMenuOpen(false)}
                           className={({ isActive }) =>
                              cn(
                                 "flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all select-none cursor-pointer",
                                 isActive
                                    ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/25"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )
                           }
                        >
                           <div className="flex items-center gap-2.5">
                              <div className="size-7 rounded-lg bg-muted/60 border border-border/50 flex items-center justify-center text-foreground/80">
                                 <Icon className="size-3.5" />
                              </div>
                              <span>{item.label}</span>
                           </div>
                           <Check className="size-3.5 opacity-0 data-[active=true]:opacity-100 text-primary" />
                        </NavLink>
                     );
                  })}
               </div>
            )}
         </div>
      </header>
   );
}
