import { ArrowClockwiseIcon } from '@phosphor-icons/react';

interface GenerateButtonProps {
  onClick: () => void;
}

export function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <button
      className="w-full bg-[#f4f4f5] hover:bg-[#eaeaea] active:bg-[#dfdfdf] border border-[#d4d4d8] rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#18181b] transition-all cursor-pointer outline-none mt-3 shadow-sm active:scale-[0.99]"
      type="button"
      onClick={onClick}
      aria-label="Generate a new password"
    >
      <ArrowClockwiseIcon size={16} weight="bold" className="text-[#3f3f46]" />
      <span>Generate</span>
    </button>
  );
}
