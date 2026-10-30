import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { formatPrice, products, waLink, type Product } from "@/data/site";
import { WhatsAppIcon } from "./icons";

type Line = { product: Product; qty: number };
type Ctx = { lines: Line[]; add: (p: Product) => void; setQty: (id: string, q: number) => void; open: boolean; setOpen: (o: boolean) => void };
const CartCtx = createContext<Ctx | null>(null);

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQ] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const lines = useMemo(() => products.filter((p) => (qty[p.id] ?? 0) > 0).map((p) => ({ product: p, qty: qty[p.id] ?? 0 })), [qty]);
  const add = (p: Product) => {
    setQ((q) => ({ ...q, [p.id]: (q[p.id] ?? 0) + 1 }));
    setOpen(true);
  };
  const setQty = (id: string, n: number) => setQ((q) => ({ ...q, [id]: Math.max(0, n) }));
  return <CartCtx.Provider value={{ lines, add, setQty, open, setOpen }}>{children}</CartCtx.Provider>;
}

export const cartTotal = (lines: Line[]) => lines.reduce((s, l) => s + l.product.price * l.qty, 0);

export function CartButton() {
  const { lines, setOpen } = useCart();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  if (!count) return null;
  return (
    <button onClick={() => setOpen(true)} aria-label="Ver pedido" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground shadow-card">
      <ShoppingBag className="size-5" /> Mi pedido ({count})
    </button>
  );
}

export function CartDrawer() {
  const { lines, setQty, open, setOpen } = useCart();
  const total = cartTotal(lines);
  const msg = "¡Hola La Piedra! Quiero hacer este pedido:\n" + lines.map((l) => `• ${l.qty} x ${l.product.name} — ${formatPrice(l.product.price * l.qty)}`).join("\n") + `\n\nTotal: ${formatPrice(total)}`;
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-carbon/70 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col tex-dark p-5 transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <h3 className="title-display text-3xl">Tu <span className="text-primary">pedido</span></h3>
          <button onClick={() => setOpen(false)} aria-label="Cerrar"><X /></button>
        </div>
        <div className="mt-4 flex-1 space-y-3 overflow-auto">
          {lines.length === 0 && <p className="text-sm text-muted-foreground">Todavía no agregaste productos.</p>}
          {lines.map((l) => (
            <div key={l.product.id} className="flex gap-3 rounded-lg bg-muted p-2">
              <img src={l.product.img} alt={l.product.name} className="size-16 rounded-md object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{l.product.name}</p>
                <p className="text-xs text-muted-foreground">{formatPrice(l.product.price)} c/u</p>
                <div className="mt-1 flex items-center gap-2">
                  <button aria-label="Restar" onClick={() => setQty(l.product.id, l.qty - 1)} className="rounded-full bg-carbon p-1"><Minus className="size-3" /></button>
                  <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                  <button aria-label="Sumar" onClick={() => setQty(l.product.id, l.qty + 1)} className="rounded-full bg-carbon p-1"><Plus className="size-3" /></button>
                  <button aria-label="Eliminar" onClick={() => setQty(l.product.id, 0)} className="ml-auto text-muted-foreground hover:text-primary"><Trash2 className="size-4" /></button>
                </div>
              </div>
              <p className="text-sm font-bold">{formatPrice(l.product.price * l.qty)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
          <div className="mt-1 flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
          <a href={lines.length ? waLink(msg) : undefined} target="_blank" rel="noreferrer" aria-disabled={!lines.length} className={`mt-4 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground ${lines.length ? "" : "pointer-events-none opacity-50"}`}>
            <WhatsAppIcon className="size-5" /> Enviar pedido por WhatsApp
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground">El pedido se confirma por WhatsApp con el local.</p>
        </div>
      </aside>
    </div>
  );
}
