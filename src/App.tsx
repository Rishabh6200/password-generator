import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Header } from './components/layout/Header';
import { SecurityNotice } from './components/layout/SecurityNotice';
import { PasswordGenerator } from './features/password-generator';

export default function App() {
  const [activeTool, setActiveTool] = useState<string>('password');

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary/20 selection:text-primary relative overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10 flex justify-center">
        <div className="h-90 w-175 rounded-full bg-primary/10 blur-[120px] opacity-60 dark:opacity-30" />
      </div>

      <Navbar currentTool={activeTool} onSelectTool={setActiveTool} />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">
        <Header />

        {activeTool === 'password' && <PasswordGenerator />}
      </main>

      <SecurityNotice />
    </div>
  );
}