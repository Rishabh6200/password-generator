import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout, type RouteMeta } from './components/layout/RootLayout';
import { PasswordGenerator } from './features/password-generator';
import { BreachChecker } from './features/breach-checker';

export const router = createBrowserRouter([
   {
      path: '/',
      Component: RootLayout,
      children: [
         {
            index: true,
            Component: PasswordGenerator,
            handle: {
               title: 'Password Generator',
               description: 'Generate cryptographically secure passwords, passphrases, and PIN codes directly in your browser.',
               badge: 'Local Cryptographic Engine',
            } satisfies RouteMeta,
         },
         {
            path: 'breach',
            Component: BreachChecker,
            handle: {
               title: 'Breach & Leak Auditor',
               description: 'Check if your passwords have appeared in public data breaches using zero-knowledge k-anonymity.',
               badge: 'Zero-Knowledge k-Anonymity',
            } satisfies RouteMeta,
         },
         {
            path: '*',
            element: <Navigate to="/" replace />,
         },
      ],
   },
], {
   basename: import.meta.env.BASE_URL,
});
