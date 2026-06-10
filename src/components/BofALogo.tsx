export function BofALogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 28" className="h-full w-auto" aria-hidden="true">
        <path d="M2 6 L18 2 L18 6 L4 9 Z" fill="#E31837" />
        <path d="M2 13 L22 7 L22 11 L4 16 Z" fill="#012169" />
        <path d="M2 20 L28 12 L28 16 L4 23 Z" fill="#E31837" />
      </svg>
      <span className="font-serif text-[15px] font-bold tracking-tight text-bofa-navy leading-tight">
        BANK OF AMERICA <span className="align-super text-[8px]">{'\u00AE'}</span>
      </span>
    </div>
  );
}
