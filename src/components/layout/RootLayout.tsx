import { useEffect } from 'react';
import { Outlet, useMatches, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Header } from './Header';
import { SecurityNotice } from './SecurityNotice';

export interface RouteMeta {
   title: string;
   seoTitle?: string;
   description: string;
   badge?: string;
}

export function RootLayout() {
   const matches = useMatches();
   const location = useLocation();
   const currentMatch = matches[matches.length - 1];
   const meta = currentMatch?.handle as RouteMeta | undefined;
   const isHomePage = location.pathname === '/' || location.pathname === '';

   // Dynamic SEO Head Synchronizer
   useEffect(() => {
      // 1. Update Document Title (Uses rich seoTitle for search engines while UI stays clean)
      const pageTitle = meta?.seoTitle || meta?.title;
      if (pageTitle) {
         document.title = isHomePage ? `${pageTitle} — KeyCraft` : `${pageTitle} | KeyCraft`;
      } else {
         document.title = 'KeyCraft — Free Client-Side Cryptographic & Security Tools';
      }

      // 2. Update Meta Description
      if (meta?.description) {
         let metaDesc = document.querySelector('meta[name="description"]');
         if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
         }
         metaDesc.setAttribute('content', meta.description);
      }

      // 3. Update Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
         canonicalLink = document.createElement('link');
         canonicalLink.setAttribute('rel', 'canonical');
         document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', window.location.href.split('?')[0]);

      // 4. Update OpenGraph tags
      const updateMetaTag = (property: string, content: string) => {
         let el = document.querySelector(`meta[property="${property}"]`);
         if (!el) {
            el = document.createElement('meta');
            el.setAttribute('property', property);
            document.head.appendChild(el);
         }
         el.setAttribute('content', content);
      };

      if (pageTitle) updateMetaTag('og:title', `${pageTitle} — KeyCraft`);
      if (meta?.description) updateMetaTag('og:description', meta.description);
      updateMetaTag('og:url', window.location.href);
   }, [meta, location.pathname, isHomePage]);

   return (
      <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
         <div className="pointer-events-none fixed inset-0 -z-10 flex justify-center">
            <div className="h-80 w-160 rounded-full bg-primary/10 blur-[120px] opacity-50 dark:opacity-25" />
         </div>

         <Navbar />

         <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 flex flex-col gap-7 sm:gap-8">
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
