import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout, type RouteMeta } from './components/layout/RootLayout';
import { ToolsList } from './features/tools-list';
import { PasswordGenerator } from './features/password-generator';
import { BreachChecker } from './features/breach-checker';

export const router = createBrowserRouter([
   {
      path: '/',
      Component: RootLayout,
      children: [
         {
            index: true,
            Component: ToolsList,
            handle: {
               title: 'Security & Cryptographic Tools',
               seoTitle: 'Free Client-Side Cryptographic & Security Tools',
               description: 'Private security tools running entirely in your browser. Zero server transmission.',
            } satisfies RouteMeta,
         },
         {
            path: 'password-generator',
            Component: () => <PasswordGenerator initialMode="random" />,
            handle: {
               title: 'Password Generator',
               seoTitle: 'Random Password Generator — Strong CSPRNG Credentials',
               description: 'Generate cryptographically random passwords with custom symbols, numbers, and length.',
            } satisfies RouteMeta,
         },
         {
            path: 'passphrase-generator',
            Component: () => <PasswordGenerator initialMode="passphrase" />,
            handle: {
               title: 'Passphrase Generator',
               seoTitle: 'Diceware Passphrase Generator — Memorable High-Entropy Passwords',
               description: 'Create memorable multi-word passphrases using Diceware cryptographic wordlists.',
            } satisfies RouteMeta,
         },
         {
            path: 'pin-generator',
            Component: () => <PasswordGenerator initialMode="pin" />,
            handle: {
               title: 'PIN Code Generator',
               seoTitle: 'Secure PIN Code Generator — Hardware-Random Numeric Codes',
               description: 'Generate secure numeric PIN codes using hardware random number generators.',
            } satisfies RouteMeta,
         },
         {
            path: 'password-breach-checker',
            Component: BreachChecker,
            handle: {
               title: 'Breach Auditor',
               seoTitle: 'Password Breach Checker — Zero-Knowledge Leak Auditor',
               description: 'Audit credentials against 800M+ leaked records using zero-knowledge k-anonymity.',
            } satisfies RouteMeta,
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
], {
   basename: import.meta.env.BASE_URL,
});
