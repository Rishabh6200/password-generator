import { Key, Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";

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
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
         <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Brand / Logo */}
            <div className="flex items-center gap-3">
               <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                  <Key className="size-5" />
               </div>
               <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                     <span className="font-heading text-base font-bold tracking-tight text-foreground">
                        PasswordFoundry
                     </span>
                  </div>
                  <span className="hidden sm:inline text-[11px] text-muted-foreground font-medium">
                     Client-side cryptographic security
                  </span>
               </div>
            </div>

            {/* Center: Simple Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
               <a
                  href="#password"
                  onClick={(e) => {
                     e.preventDefault();
                     onSelectTool?.("password");
                  }}
                  className={`text-sm font-medium transition-colors hover:text-foreground cursor-pointer ${
                     currentTool === "password"
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                  }`}
               >
                  Password Generator
               </a>
               <a
                  href="#security"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
               >
                  Security
               </a>
            </nav>

            {/* Right: Theme Toggle */}
            <div className="flex items-center gap-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-xl cursor-pointer"
               >
                  <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               </Button>
            </div>
         </div>
      </header>
   );
}
