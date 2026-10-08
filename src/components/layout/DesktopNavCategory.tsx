import { useLocation, useNavigate } from "react-router";
import { ChevronDown, Check } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuGroup,
   DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { DesktopNavLink } from "./DesktopNavLink";
import type { NavCategory } from "./nav-config";
import { cn } from "cn";

interface DesktopNavCategoryProps {
   category: NavCategory;
}

export function DesktopNavCategory({ category }: DesktopNavCategoryProps) {
   const location = useLocation();
   const navigate = useNavigate();
   const CategoryIcon = category.icon;

   // If category has only 1 tool, render directly with no unnecessary dropdown
   if (category.tools.length === 1) {
      const singleTool = category.tools[0];
      return (
         <DesktopNavLink
            to={singleTool.path}
            label={singleTool.shortName}
            icon={singleTool.icon}
         />
      );
   }

   const isCategoryActive = category.tools.some((t) => t.path === location.pathname);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger
            openOnHover
            delay={60}
            closeDelay={200}
            className={cn(
               "group relative flex items-center gap-1.5 py-1.5 px-2.5 text-xs font-medium transition-colors cursor-pointer select-none whitespace-nowrap outline-hidden",
               isCategoryActive
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
            )}
         >
            <CategoryIcon className="size-3.5 transition-colors group-hover:text-foreground" />
            <span>{category.label}</span>
            <ChevronDown className="size-3 text-muted-foreground transition-transform duration-200 group-hover:text-foreground group-data-open:rotate-180" />
            <span
               className={cn(
                  "absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-300 origin-center",
                  isCategoryActive
                     ? "scale-x-100 opacity-100"
                     : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 group-data-open:scale-x-100 group-data-open:opacity-100"
               )}
            />
         </DropdownMenuTrigger>

         <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="w-80 p-1.5 rounded-xl shadow-lg shadow-black/5 dark:shadow-black/40 border border-border/70"
         >
            <DropdownMenuGroup className="flex flex-col gap-1">
               <DropdownMenuLabel className="px-3 pt-1 pb-1.5 text-[11px] font-medium tracking-wider text-muted-foreground/60 uppercase">
                  {category.menuTitle}
               </DropdownMenuLabel>
               {category.tools.map((tool) => {
                  const ToolIcon = tool.icon;
                  const isActive = location.pathname === tool.path;
                  return (
                     <DropdownMenuItem
                        key={tool.id}
                        onClick={() => navigate(tool.path)}
                        className={cn(
                           "group/item flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors",
                           isActive
                              ? "bg-muted text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                     >
                        <div className="flex items-center gap-3 min-w-0">
                           <div className="size-7 rounded-md bg-muted/60 border border-border/40 flex items-center justify-center shrink-0 text-muted-foreground group-hover/item:text-foreground transition-colors">
                              <ToolIcon className="size-4" />
                           </div>
                           <span className="text-sm text-foreground font-medium">{tool.name}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                           <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-muted-foreground/70 bg-muted/40 border border-border/30">
                              {tool.tag}
                           </span>
                           {isActive && <Check className="size-4 text-primary shrink-0" />}
                        </div>
                     </DropdownMenuItem>
                  );
               })}
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
