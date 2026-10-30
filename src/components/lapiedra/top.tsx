import { useEffect, useState } from "react";
import { ChefHat, Wheat, Heart, Menu as MenuIcon, X, Utensils, Sandwich, Beef, Croissant, CupSoda, Pizza } from "lucide-react";
import { categories, images, navLinks, waLink, type CategoryId } from "@/data/site";
import { Logo, PillButton, WhatsAppIcon } from "./icons";

export function Header() {
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-3 lg:px-8">
        <a href="#inicio"><Logo size="size-20 md:size-22" /></a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={`relative pb-1 text-sm font-semibold ${active === l.id ? "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-primary" : "text-foreground hover:text-primary"}`}>{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:block"><PillButton href={waLink()} external small icon={<WhatsAppIcon />}>Hacé tu pedido</PillButton></div>
        <button className="rounded-full bg-carbon/70 p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">{open ? <X /> : <MenuIcon />}</button>
      </div>
      {open && (
        <nav className="mx-4 mt-2 flex flex-col gap-1 rounded-xl tex-dark p-4 shadow-card md:hidden">
          {navLinks.map((l) => <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={`rounded-md px-3 py-2 font-semibold ${active === l.id ? "text-primary" : ""}`}>{l.label}</a>)}
          <div className="pt-2"><PillButton href={waLink()} external icon={<WhatsAppIcon />}>Hacé tu pedido</PillButton></div>
        </nav>
      )}
    </header>
  );
}


export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-carbon"
    >
      <img
        src={images.heroPizza}
        alt="Pizza artesanal con queso derretido"
        width={1600}
        height={800}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
      />

      {/* Oscurece la izquierda para mejorar la lectura */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/75 to-carbon/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-carbon/20" />

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-6 px-5 pb-20 pt-32 sm:min-h-[780px] sm:px-8 lg:min-h-[700px] lg:grid-cols-[1.15fr_0.35fr_0.7fr] lg:gap-2 lg:px-8 lg:pb-20 lg:pt-36">

        {/* Texto principal */}
        <div className="relative z-10 max-w-[570px] self-center">
          <div className="relative mb-7 -rotate-2 sm:mb-8">
            <div className="torn absolute -inset-x-3 -inset-y-3 bg-wine/90 sm:-inset-x-5 sm:-inset-y-4" />

            <h1 className="title-display relative text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.98] drop-shadow-lg">
              Pizzas y empanadas
              <br />
              <span className="text-primary">
                con mucho más sabor
              </span>
            </h1>
          </div>

          <p className="max-w-md text-sm leading-6 text-foreground sm:text-base sm:leading-7">
            Elaboración artesanal, ingredientes de primera y toda la buena
            onda de siempre. Te esperamos en Esquel.
          </p>

          <div className="mt-5 sm:mt-6">
            <PillButton
              href={waLink()}
              external
              icon={<WhatsAppIcon className="size-5" />}
            >
              Hacé tu pedido por WhatsApp
            </PillButton>
          </div>

          {/* Beneficios */}
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-4 text-xs sm:mt-8 sm:gap-x-7 sm:text-sm">
            {[
              [ChefHat, "Elaboración", "artesanal"],
              [Wheat, "Ingredientes", "de primera"],
              [Heart, "Siempre un", "buen plan"],
            ].map(([I, a, b], i) => {
              const Icon = I as typeof ChefHat;

              return (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${
                    i ? "border-l border-white/20 pl-4 sm:pl-5" : ""
                  }`}
                >
                  <Icon className="size-5 shrink-0 text-primary sm:size-6" />
                  <span className="leading-5">
                    {a as string}
                    <br />
                    {b as string}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Espacio para equilibrar la composición en desktop */}
        <div className="hidden lg:block" />

        {/* Mascota */}
        <div className="pointer-events-none absolute bottom-14 right-2 z-10 hidden w-48 sm:block lg:relative lg:bottom-auto lg:right-auto lg:w-full lg:max-w-[250px] lg:justify-self-end">
          <img
            src={images.caveman}
            alt="Mascota de La Piedra con una porción de pizza"
            width={768}
            height={1024}
            className="w-full drop-shadow-2xl"
          />

          <p className="title-display absolute -right-1 bottom-10 rotate-[-10deg] text-lg leading-tight drop-shadow-lg sm:text-xl lg:-right-5 lg:bottom-14 lg:text-2xl">
            La pizza
            <br />
            también es
            <br />
            un <span className="text-primary">buen plan</span>
          </p>
        </div>
      </div>

      {/* Transición al menú */}
      <div className="torn absolute -bottom-1 left-0 h-10 w-full bg-[var(--paper)]" />
    </section>
  );
}

const catIcons: Record<CategoryId, typeof Pizza> = { pizzas: ChefHat, empanadas: Croissant, hamburguesas: Sandwich, picadas: Utensils, calzones: Beef, bebidas: CupSoda };

export function MenuCategories({ onPick }: { onPick: (c: CategoryId) => void }) {
  return (
    <section id="menu" className="tex-paper py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="title-display text-center text-5xl">Nuestro <span className="text-wine">menú</span></h2>
        <p className="mt-2 text-center text-sm">Descubrí todos nuestros productos, elaborados con ingredientes frescos y de calidad.</p>
        <div className="no-scrollbar mt-8 flex snap-x gap-3 overflow-x-auto lg:grid lg:grid-cols-6 lg:overflow-visible">
          {categories.map((c) => {
            const Icon = catIcons[c.id];
            return (
              <button key={c.id} onClick={() => onPick(c.id)} className="group w-44 shrink-0 snap-start overflow-hidden rounded-xl bg-carbon text-left text-foreground shadow-card lg:w-auto">
                <img src={c.img} alt={c.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                <div className="flex items-center gap-3 bg-carbon/90 px-3 py-3">
                  <Icon className="size-6 shrink-0" />
                  <div><p className="text-sm font-semibold">{c.name}</p><p className="text-[0.65rem] text-muted-foreground">{c.desc}</p></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
