import { Sparkles, ShieldCheck, type LucideIcon } from "lucide-react";
import { TOOLS, type ToolConfig } from "@/config/tools";

export interface NavCategory {
   id: string;
   label: string;
   menuTitle: string;
   icon: LucideIcon;
   tools: ToolConfig[];
}

export const NAV_CATEGORIES: NavCategory[] = [
   {
      id: "generators",
      label: "Generators",
      menuTitle: "Credential Generators",
      icon: Sparkles,
      tools: TOOLS.filter((t) => t.category === "Generators"),
   },
   {
      id: "auditors",
      label: "Security & Audit",
      menuTitle: "Security & Audit",
      icon: ShieldCheck,
      tools: TOOLS.filter((t) => t.category === "Security & Audit"),
   },
];
