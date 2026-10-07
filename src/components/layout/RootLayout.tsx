import { Outlet, useMatches } from 'react-router';
import { Navbar } from './Navbar';
import { Header } from './Header';
import { SecurityNotice } from './SecurityNotice';

export interface RouteMeta {
   title: string;
   description: string;
   badge?: string;
}

export function RootLayout() {
   const matches = useMatches();
   const currentMatch = matches[matches.length - 1];
   const meta = currentMatch?.handle as RouteMeta | undefined;

   return (
      <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
         <div className="pointer-events-none fixed inset-0 -z-10 flex justify-center">
            <div className="h-90 w-175 rounded-full bg-primary/10 blur-[120px] opacity-60 dark:opacity-30" />
         </div>

         <Navbar />

         <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-7 sm:pb-14 flex flex-col gap-6">
            {meta && (
               <Header
                  title={meta.title}
                  description={meta.description}
                  badge={meta.badge}
               />
            )}
            <Outlet />
         </main>

         <SecurityNotice />
      </div>
   );
}
