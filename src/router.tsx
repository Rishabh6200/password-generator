import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout, type RouteMeta } from './components/layout/RootLayout';
import { TOOLS } from './config/tools';

const ToolsList = lazy(() =>
   import('./features/tools-list').then((m) => ({ default: m.ToolsList }))
);
const PasswordGenerator = lazy(() =>
   import('./features/password-generator').then((m) => ({ default: m.PasswordGenerator }))
);
const BreachChecker = lazy(() =>
   import('./features/breach-checker').then((m) => ({ default: m.BreachChecker }))
);

const PageLoader = () => (
   <div className="flex items-center justify-center min-h-75 w-full animate-pulse text-xs text-muted-foreground">
      Loading...
   </div>
);

const getToolMeta = (id: string) => {
   const tool = TOOLS.find((t) => t.id === id);
   if (!tool) return { title: '', seoTitle: '', description: '' };
   return {
      title: tool.name,
      seoTitle: tool.seoTitle,
      description: tool.description,
   };
};

export const router = createBrowserRouter(
   [
      {
         path: '/',
         Component: RootLayout,
         children: [
            {
               index: true,
               element: (
                  <Suspense fallback={<PageLoader />}>
                     <ToolsList />
                  </Suspense>
               ),
               handle: {
                  title: 'Security & Cryptographic Tools',
                  seoTitle: 'Free Client-Side Cryptographic & Security Tools',
                  description: 'Private security tools running entirely in your browser. Zero server transmission.',
               } satisfies RouteMeta,
            },
            {
               path: 'password-generator',
               element: (
                  <Suspense fallback={<PageLoader />}>
                     <PasswordGenerator initialMode="random" />
                  </Suspense>
               ),
               handle: getToolMeta('password-generator') satisfies RouteMeta,
            },
            {
               path: 'passphrase-generator',
               element: (
                  <Suspense fallback={<PageLoader />}>
                     <PasswordGenerator initialMode="passphrase" />
                  </Suspense>
               ),
               handle: getToolMeta('passphrase-generator') satisfies RouteMeta,
            },
            {
               path: 'pin-generator',
               element: (
                  <Suspense fallback={<PageLoader />}>
                     <PasswordGenerator initialMode="pin" />
                  </Suspense>
               ),
               handle: getToolMeta('pin-generator') satisfies RouteMeta,
            },
            {
               path: 'password-breach-checker',
               element: (
                  <Suspense fallback={<PageLoader />}>
                     <BreachChecker />
                  </Suspense>
               ),
               handle: getToolMeta('password-breach-checker') satisfies RouteMeta,
            },
            {
               path: 'breach',
               element: <Navigate to="/password-breach-checker" replace />,
            },
            {
               path: 'tools',
               element: <Navigate to="/" replace />,
            },
            {
               path: '*',
               element: <Navigate to="/" replace />,
            },
         ],
      },
   ],
   {
      basename: import.meta.env.BASE_URL,
   }
);
