import { useRef } from "react";
import { Clock, Instagram, MapPin, Bike, Star } from "lucide-react";
import { business, categories, images, mapsEmbed, mapsUrl, navLinks, testimonials, waLink } from "@/data/site";
import { Logo, PillButton, WhatsAppIcon } from "./icons";
import { Arrow } from "./middle";

export function LocationSection() {
  return (
    <section id="ubicacion" className="tex-dark py-14">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="title-display flex items-center gap-3 text-4xl"><MapPin className="size-8" /> Ubicación y horarios</h2>
          <p className="mt-2 text-sm text-muted-foreground">Te esperamos en nuestro local para disfrutar de la mejor comida, o hacé tu pedido para llevar o con delivery.</p>
          <div className="mt-6 grid gap-4 rounded-xl border border-border p-5 sm:grid-cols-3">
            <div className="text-sm"><MapPin className="mb-2 size-6" />Rivadavia 1080<br />Esquel, Chubut<div className="mt-3"><PillButton small href={mapsUrl} external>Cómo llegar</PillButton></div></div>
            <div className="text-sm"><Clock className="mb-2 size-6" />Lunes a domingos<br />11:00 a 00:00 hs</div>
            <div className="text-sm"><Bike className="mb-2 size-6" />Consumo en el lugar<br />Para llevar · Delivery</div>
          </div>
        </div>
        <iframe title="Mapa de La Piedra" src={mapsEmbed} loading="lazy" className="h-72 w-full rounded-xl border-0 shadow-card md:h-full" />
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth / 3, behavior: "smooth" });
  return (
    <section className="tex-paper py-14">
      <div className="mx-auto max-w-6xl px-4 lg:px-10">
        <h2 className="title-display text-center text-4xl md:text-5xl">Lo que dicen <span className="text-wine">nuestros clientes</span></h2>
        <p className="mt-2 text-center text-sm">La mejor publicidad es la de quienes nos eligen.</p>
        <div className="relative mt-8">
          <Arrow dir={-1} onClick={() => go(-1)} />
          <div ref={ref} className="no-scrollbar flex snap-x gap-5 overflow-x-auto py-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="w-full shrink-0 snap-start rounded-lg bg-foreground p-5 text-paper-foreground shadow-card md:w-[calc((100%-2.5rem)/3)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-wine font-bold text-foreground">{t.name[0]}</span>
                  <div><p className="text-sm font-bold">{t.name}</p><div className="flex text-primary-deep">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div></div>
                </div>
                <blockquote className="mt-3 text-sm">“{t.text}”</blockquote>
              </figure>
            ))}
          </div>
          <Arrow dir={1} onClick={() => go(1)} />
        </div>
      </div>
    </section>
  );
}

export function InstagramGallery() {
  const pics = [images.muzza, images.heroPizza, images.burger, images.empanadas, null, images.calzone];
  return (
    <section className="tex-dark py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="title-display flex items-center gap-3 text-4xl"><Instagram className="size-8" /> Seguinos en Instagram</h2>
            <p className="mt-1 text-sm text-muted-foreground">Enterate de todas nuestras novedades, promos y más.</p>
          </div>
          <PillButton small href={business.instagram} external icon={<Instagram className="size-4" />}>Ver en Instagram</PillButton>
        </div>
        <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto lg:grid lg:grid-cols-6">
          {pics.map((src, i) => (
            <a key={i} href={business.instagram} target="_blank" rel="noreferrer" className="block aspect-square w-40 shrink-0 overflow-hidden rounded-lg lg:w-auto">
              {src ? <img src={src} alt="Publicación de Instagram" loading="lazy" className="h-full w-full object-cover transition hover:scale-105" />
                : <div className="flex h-full items-center justify-center bg-wine-dark"><Logo size="size-28" /></div>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


export function Footer() {
  return (
    <footer id="contacto" className="bg-wine-dark">
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 lg:px-8 lg:py-12">

        {/* Logo */}
        <div className="mb-9 flex justify-center lg:hidden">
          <a href="#inicio" aria-label="La Piedra - Inicio">
            <Logo size="size-24" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1fr_1fr_1fr_1.3fr_1.2fr] lg:gap-8">

          {/* Logo desktop */}
          <div className="hidden lg:flex lg:items-start">
            <a href="#inicio" aria-label="La Piedra - Inicio">
              <Logo size="size-32" />
            </a>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="mb-4 text-xs font-extrabold tracking-widest text-primary">
              NAVEGACIÓN
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/85">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="mb-4 text-xs font-extrabold tracking-widest text-primary">
              NUESTRO MENÚ
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/85">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href="#menu"
                    className="transition-colors hover:text-primary"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-3 text-xs font-extrabold tracking-widest text-primary">
              HACÉ TU PEDIDO
            </h4>

            <p className="mb-4 max-w-xs text-sm leading-relaxed text-paper/75">
              Pizzas y empanadas artesanales, preparadas con ingredientes
              de primera calidad.
            </p>

            <div className="flex flex-col items-start gap-3">
              <PillButton
                href={waLink()}
                external
                icon={<WhatsAppIcon />}
              >
                Hacé tu pedido por WhatsApp
              </PillButton>

              <a
                href={business.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-paper/90 transition-colors hover:text-primary"
              >
                <Instagram className="size-5 text-primary" />
                Seguinos en Instagram
              </a>
            </div>
          </div>

          {/* Información del local */}
          <div className="col-span-2 grid grid-cols-1 gap-5 rounded-xl border border-white/10 bg-black/15 p-4 sm:grid-cols-2 lg:col-span-1 lg:grid-cols-1 lg:border-0 lg:bg-transparent lg:p-0">

            <div>
              <h4 className="mb-3 flex items-center gap-2 text-xs font-extrabold tracking-widest text-primary">
                <Clock className="size-4" />
                HORARIOS
              </h4>

              <p className="text-sm leading-relaxed text-paper/85">
                Lunes a domingos
                <br />
                11:00 a 00:00 hs
              </p>
            </div>

            <div>
              <h4 className="mb-3 flex items-center gap-2 text-xs font-extrabold tracking-widest text-primary">
                <MapPin className="size-4" />
                DIRECCIÓN
              </h4>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm leading-relaxed text-paper/85 transition-colors hover:text-primary"
              >
                Rivadavia 1080
                <br />
                Esquel, Chubut
                <span className="mt-2 block text-xs font-semibold text-primary">
                  Cómo llegar →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-9 border-t border-white/15 pt-5 lg:mt-12">
          <div className="flex flex-col items-center gap-3 text-center text-xs leading-relaxed text-paper/60 lg:flex-row lg:justify-between lg:text-left">

            <span>
              © 2026 La Piedra Pizzería y Empanadas.
              Todos los derechos reservados.
            </span>

            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
              <a href="#" className="transition-colors hover:text-primary">
                Política de privacidad
              </a>
              <span aria-hidden="true">|</span>
              <a href="#" className="transition-colors hover:text-primary">
                Términos y condiciones
              </a>
            </div>

            <span className="text-primary/80">
              Diseñado por Ghisla Digital Solutions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}