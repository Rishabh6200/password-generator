import { useState } from "react";
import { Link, useLocation } from "react-router";
import { KeyRound, LayoutGrid, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { NAV_CATEGORIES } from "./nav-config";
import { DesktopNavLink } from "./DesktopNavLink";
import { DesktopNavCategory } from "./DesktopNavCategory";
import { MobileNavLink } from "./MobileNavLink";

export function Navbar() {
   const { theme, setTheme } = useTheme();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const location = useLocation();

   // Auto-close mobile menu on route change
   const [prevPathname, setPrevPathname] = useState(location.pathname);
   if (prevPathname !== location.pathname) {
      setPrevPathname(location.pathname);
      setMobileMenuOpen(false);
   }

   const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6">
         <div className="max-w-5xl mx-auto rounded-2xl border border-border/70 bg-background/85 backdrop-blur-xl shadow-lg shadow-black/4 dark:shadow-black/40 ring-1 ring-border/40 transition-all">
            <div className="flex h-14 items-center justify-between px-3 sm:px-5">
               {/* Brand / Logo */}
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

               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center gap-1.5 sm:gap-2">
                  <DesktopNavLink to="/" label="All Tools" icon={LayoutGrid} end />
                  {NAV_CATEGORIES.map((category) => (
                     <DesktopNavCategory key={category.id} category={category} />
                  ))}
               </nav>

               {/* Right side status & controls */}
               <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium select-none">
                     <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                     </span>
                     <span>Client-Side</span>
                  </div>

                  <div className="h-4 w-px bg-border/60 hidden sm:block" />

                  {/* Theme toggle */}
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

                  {/* Mobile hamburger button */}
                  <Button
                     variant="ghost"
                     size="icon-sm"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                     aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                     className="md:hidden size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 cursor-pointer transition-all ml-0.5"
                  >
                     {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
                  </Button>
               </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
               <div className="md:hidden border-t border-border/50 px-3 py-3 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <MobileNavLink
                     to="/"
                     label="All Tools"
                     icon={LayoutGrid}
                     onSelect={() => setMobileMenuOpen(false)}
                  />

                  {NAV_CATEGORIES.map((cat) => (
                     <div key={cat.id} className="pt-1 flex flex-col gap-1">
                        <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                           {cat.menuTitle}
                        </div>
                        {cat.tools.map((tool) => (
                           <MobileNavLink
                              key={tool.id}
                              to={tool.path}
                              label={tool.name}
                              icon={tool.icon}
                              tag={tool.tag}
                              onSelect={() => setMobileMenuOpen(false)}
                           />
                        ))}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </header>
   );
}
