import { KeyIcon } from '@phosphor-icons/react';

export function Header() {
  return (
    <header className="flex items-center gap-2.5 px-1 pb-1 select-none">
      <div className="bg-[#d97757] p-2 rounded-xl text-white shadow-sm shadow-orange-500/10">
        <KeyIcon size={20} weight="duotone" />
      </div>

      <div>
        <h1 className="text-xl font-bold text-[#111111] tracking-tight">
          PasswordFoundry
        </h1>

        <p className="text-xs text-[#72716a] font-medium tracking-normal">
          Strong & Secure Password Generator
        </p>
      </div>
    </header>
  );
}
