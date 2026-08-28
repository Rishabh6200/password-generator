import { ShieldCheckIcon } from '@phosphor-icons/react';

export function SecurityNotice() {
  return (
    <section className="px-1 pt-1 pb-2">
      <div className="flex items-start gap-3 text-xs text-[#72716a] leading-relaxed">
        <ShieldCheckIcon
          size={18}
          weight="duotone"
          className="text-[#d97757] shrink-0 mt-0.5"
        />
        <p>
          Passwords are generated locally in your browser using the Web Crypto
          API. Your generated passwords are not sent to our server by this
          generator.
        </p>
      </div>
    </section>
  );
}
