import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { images } from "@/data/site";

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export function PillButton({ href, onClick, children, icon, small, external }: { href?: string; onClick?: () => void; children: ReactNode; icon?: ReactNode; small?: boolean; external?: boolean }) {
  const cls = `inline-flex items-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-card transition hover:bg-primary-deep hover:-translate-y-0.5 ${small ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-sm"}`;
  const inner = (<>{icon}{children}<ArrowRight className={small ? "size-3.5" : "size-4"} /></>);
  if (href) return <a href={href} onClick={onClick} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{inner}</a>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}


export function Logo({ size = "size-20" }: { size?: string }) {
  return (
    <div
      className={`${size} relative flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-paper/70 bg-wine p-2 shadow-card box-border`}
      aria-label="La Piedra — Pizza y empanadas"
    >
      <img
        src={images.logo}
        alt="La Piedra"
        className="block h-auto w-[82%] max-h-[66%] object-contain"
      />

      <span className="mt-1 block max-w-full text-center text-[7px] font-bold uppercase leading-[1.1] tracking-[0.08em] text-paper">
        PIZZA +
        <br />
        EMPANADAS
      </span>
    </div>
  );
}