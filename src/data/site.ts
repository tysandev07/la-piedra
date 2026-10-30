import heroPizza from "@/assets/hero-pizza.jpg";
import muzza from "@/assets/pizza-muzza.jpg";
import especial from "@/assets/pizza-especial.jpg";
import empanadas from "@/assets/empanadas.jpg";
import burger from "@/assets/burger.jpg";
import picada from "@/assets/picada.jpg";
import calzone from "@/assets/calzone.jpg";
import bebidas from "@/assets/bebidas.jpg";
import facade from "@/assets/facade.jpg";
import logo from "@/assets/logo.png";
import caveman from "@/assets/caveman.png";

/** Central business config — replace these with the real values. */
export const business = {
  name: "La Piedra",
  // TODO: número real de WhatsApp en formato internacional sin "+" (ej: 5492945123456)
  whatsapp: "5490000000000",
  // TODO: URL real de Instagram
  instagram: "https://www.instagram.com/",
  address: "Rivadavia 1080, Esquel, Chubut",
  hours: "Lunes a domingos · 11:00 a 00:00 hs",
};

export const mapsQuery = encodeURIComponent(`La Piedra Pizzería, ${business.address}, Argentina`);
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export const waLink = (msg = "¡Hola La Piedra! Quiero hacer un pedido.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(msg)}`;

export const images = { heroPizza, muzza, especial, empanadas, burger, picada, calzone, bebidas, facade, logo, caveman };

export const navLinks = [
  { id: "inicio", label: "Inicio" },
  { id: "menu", label: "Menú" },
  { id: "promociones", label: "Promociones" },
  { id: "nosotros", label: "Nosotros" },
  { id: "ubicacion", label: "Ubicación" },
  { id: "contacto", label: "Contacto" },
];

export type CategoryId = "pizzas" | "empanadas" | "hamburguesas" | "picadas" | "calzones" | "bebidas";

export const categories: { id: CategoryId; name: string; desc: string; img: string }[] = [
  { id: "pizzas", name: "Pizzas", desc: "Clásicas y especiales", img: muzza },
  { id: "empanadas", name: "Empanadas", desc: "Variedades artesanales", img: empanadas },
  { id: "hamburguesas", name: "Hamburguesas", desc: "Con la mejor carne", img: burger },
  { id: "picadas", name: "Picadas", desc: "Para compartir", img: picada },
  { id: "calzones", name: "Calzones", desc: "Rellenos y al horno", img: calzone },
  { id: "bebidas", name: "Bebidas", desc: "Gaseosas, aguas y más", img: bebidas },
];

export type Product = { id: string; name: string; desc: string; price: number; img: string; category: CategoryId; wide?: boolean };

export const products: Product[] = [
  { id: "muzzarella", name: "Muzzarella", desc: "Salsa de tomate, muzzarella y orégano.", price: 8500, img: muzza, category: "pizzas" },
  { id: "especial", name: "Especial", desc: "Jamón, morrón, aceitunas y muzzarella.", price: 9500, img: especial, category: "pizzas" },
  { id: "emp-carne", name: "Carne", desc: "Carne cortada a cuchillo, receta artesanal.", price: 1800, img: empanadas, category: "empanadas" },
  { id: "hamb-clasica", name: "Hamburguesa Clásica", desc: "Carne, cheddar, lechuga, tomate y salsa.", price: 9000, img: burger, category: "hamburguesas" },
  { id: "calzon-mixto", name: "Calzón Mixto", desc: "Jamón, muzzarella y tomate.", price: 9500, img: calzone, category: "calzones", wide: true },
  { id: "picada-clasica", name: "Picada Clásica", desc: "Papas, fiambres, quesos y aceitunas.", price: 16000, img: picada, category: "picadas" },
  { id: "gaseosa", name: "Gaseosa 1,5 L", desc: "Línea de gaseosas, aguas y más.", price: 3500, img: bebidas, category: "bebidas" },
];

export const promotions = [
  { id: "miercoles", kicker: "Todos los miércoles", title: "Pizzas", big: "50% OFF", img: muzza },
  { id: "martes", kicker: "Martes de empanadas", big: "3x2", title: "En empanadas", img: empanadas },
  { id: "hamburguesa", kicker: "La noche de la", title: "Hamburguesa", big: "2x1", img: burger },
  { id: "familiar", kicker: "Menú familiar", title: "2 pizzas + papas + bebida 1,5 L", big: "$25.000", img: especial, stamp: true },
];

export const testimonials = [
  { name: "Martina G.", text: "Las mejores empanadas de Esquel, siempre frescas y con mucho sabor. La atención es excelente." },
  { name: "Lucas R.", text: "Las pizzas son increíbles, la masa espectacular y los ingredientes de primera. Súper recomendable." },
  { name: "Camila S.", text: "Un lugar ideal para compartir con amigos o en familia. Todo riquísimo y a buen precio." },
  { name: "Joaquín P.", text: "El calzón mixto es un viaje. Pedimos por WhatsApp y llegó calentito." },
];

export const formatPrice = (n: number) => "$" + n.toLocaleString("es-AR");
