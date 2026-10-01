import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Header } from './components/layout/Header';
import { SecurityNotice } from './components/layout/SecurityNotice';
import { PasswordGenerator } from './features/password-generator';

export default function App() {
  const [activeTool, setActiveTool] = useState<string>('password');

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar currentTool={activeTool} onSelectTool={setActiveTool} />

      <main className="flex-1 w-full container mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">
        <Header />

        {activeTool === 'password' && <PasswordGenerator />}
      </main>

      <SecurityNotice />
    </div>
  );
}