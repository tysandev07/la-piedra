import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Crown, Plus } from "lucide-react";
import { formatPrice, images, products, promotions, waLink, type CategoryId, type Product } from "@/data/site";
import { useCart } from "./cart";
import { PillButton } from "./icons";

function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const upd = () => { setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth))); setPage(Math.round(el.scrollLeft / el.clientWidth)); };
    upd(); el.addEventListener("scroll", upd); window.addEventListener("resize", upd);
    return () => { el.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); };
  }, []);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return { ref, page, pages, go };
}


export function Arrow({
  dir,
  onClick,
}: {
  dir: -1 | 1;
  onClick: () => void;
}) {
  const I = dir < 0 ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      aria-label={dir < 0 ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-carbon/80 p-1.5 text-foreground hover:text-primary lg:block ${
        dir < 0 ? "-left-8" : "-right-8"
      }`}
    >
      <I className="size-6" />
    </button>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();

  return (
    <article className="flex h-[365px] w-52 shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-card shadow-card">
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="h-36 w-full shrink-0 object-cover"
      />

      <div className="flex min-h-0 flex-1 flex-col p-3">
        <h3 className="text-sm font-semibold leading-tight">
          {p.name}
        </h3>

        <p className="mt-1 line-clamp-3 text-xs leading-snug text-muted-foreground">
          {p.desc}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="whitespace-nowrap text-sm font-bold">
            {formatPrice(p.price)}
          </span>

          <button
            onClick={() => add(p)}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:bg-primary-deep"
          >
            Agregar <Plus className="size-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProducts({ filter, setFilter }: { filter: CategoryId | null; setFilter: (c: CategoryId | null) => void }) {
  const { ref, page, pages, go } = useCarousel();
  const list = filter ? products.filter((p) => p.category === filter) : products.slice(0, 5);
  useEffect(() => { ref.current?.scrollTo({ left: 0 }); }, [filter, ref]);
  return (
    <section id="destacados" className="tex-dark py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="title-display text-5xl">Productos <span className="text-primary">destacados</span></h2>
            <p className="mt-1 text-sm text-muted-foreground">Los favoritos de nuestros clientes. ¡No te los podés perder!</p>
          </div>
          {filter ? <PillButton small onClick={() => setFilter(null)}>Ver destacados</PillButton> : <PillButton small href="#menu">Ver menú completo</PillButton>}
        </div>
        <div className="relative mt-8">
          <Arrow dir={-1} onClick={() => go(-1)} />
          <div ref={ref} className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-2">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <Arrow dir={1} onClick={() => go(1)} />
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          {Array.from({ length: pages }).map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === page ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground"}`} />)}
        </div>
      </div>
    </section>
  );
}

export function PromotionCard({ p }: { p: (typeof promotions)[number] }) {
  return (
    <a href={waLink(`¡Hola La Piedra! Quiero consultar por la promo "${p.kicker} ${p.title} ${p.big}".`)} target="_blank" rel="noreferrer" className="group relative block aspect-[4/3] w-72 shrink-0 snap-start overflow-hidden rounded-xl shadow-card lg:w-auto">
      <img src={p.img} alt={p.kicker} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-wine-dark via-wine-dark/40 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 -rotate-3 text-center">
        <p className="title-display text-xl">{p.kicker}</p>
        {p.id === "martes" ? (<><p className="title-display text-5xl text-primary">{p.big}</p><p className="title-display text-xl text-primary">{p.title}</p></>)
          : p.stamp ? (<div className="flex items-center justify-center gap-3"><p className="title-display text-base">{p.title}</p><span className="title-display rotate-6 rounded-full bg-primary px-3 py-2 text-xl text-primary-foreground">{p.big}</span></div>)
          : (<><p className="title-display text-3xl">{p.title}</p><p className="title-display text-5xl text-primary">{p.big}</p></>)}
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground opacity-0 transition group-hover:opacity-100">Pedir promo</span>
    </a>
  );
}

export function PromotionsSection() {
  return (
    <section id="promociones" className="tex-wine py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <Crown className="size-12 text-primary" />
            <div>
              <h2 className="title-display text-5xl">Promociones</h2>
              <p className="text-sm">Los mejores planes, para disfrutar solo o en compañía.</p>
            </div>
          </div>
          <PillButton small href={waLink("¡Hola La Piedra! ¿Qué promociones tienen hoy?")} external>Ver todas las promociones</PillButton>
        </div>
        <div className="no-scrollbar mt-8 flex snap-x gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible">
          {promotions.map((p) => <PromotionCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="nosotros" className="tex-paper py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="title-display text-5xl">Sobre <span className="text-wine">La Piedra</span></h2>
          <p className="mt-4 text-sm leading-relaxed">Somos un emprendimiento de Esquel, con la pasión por la buena comida y el encuentro. Desde nuestras pizzas hasta nuestras empanadas, todo se prepara de forma artesanal, con ingredientes seleccionados y mucho amor.</p>
          <p className="mt-2 text-sm leading-relaxed">Más que una pizzería, somos un lugar para compartir buenos momentos.</p>
          <div className="mt-6"><PillButton href="#ubicacion">Conocé más sobre nosotros</PillButton></div>
        </div>
        <div className="relative rotate-2">
          <div className="absolute -right-3 top-6 h-16 w-8 rotate-12 bg-primary/80" />
          <img src={images.facade} alt="Fachada del local" loading="lazy" className="torn w-full object-cover shadow-card" />
        </div>
      </div>
    </section>
  );
}
