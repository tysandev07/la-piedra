import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { CategoryId } from "@/data/site";
import { CartButton, CartDrawer, CartProvider } from "@/components/lapiedra/cart";
import { Header, HeroSection, MenuCategories } from "@/components/lapiedra/top";
import { AboutSection, FeaturedProducts, PromotionsSection } from "@/components/lapiedra/middle";
import { Footer, InstagramGallery, LocationSection, TestimonialsSection } from "@/components/lapiedra/bottom";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Piedra — Pizzas y Empanadas en Esquel" },
      { name: "description", content: "Pizzas, empanadas, hamburguesas y calzones artesanales en Esquel. Pedí por WhatsApp." },
      { property: "og:title", content: "La Piedra — Pizzas y Empanadas en Esquel" },
      { property: "og:description", content: "Pizzas, empanadas y mucho más sabor. Rivadavia 1080, Esquel, Chubut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<CategoryId | null>(null);
  const pick = (c: CategoryId) => {
    setFilter(c);
    document.getElementById("destacados")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <CartProvider>
      <main className="relative overflow-x-hidden">
        <Header />
        <HeroSection />
        <MenuCategories onPick={pick} />
        <FeaturedProducts filter={filter} setFilter={setFilter} />
        <PromotionsSection />
        <AboutSection />
        <LocationSection />
        <TestimonialsSection />
        <InstagramGallery />
        <Footer />
      </main>
      <CartButton />
      <CartDrawer />
    </CartProvider>
  );
}
