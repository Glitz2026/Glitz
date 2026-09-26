import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

import type { Product } from "@/src/lib/site";
import { storage } from "@/src/utils/storage";

const STORAGE_KEY = "glitz.cart";

export type CartItem = {
  product_id: string;
  product_name: string;
  unit_price: number;
  image: string;
  size: string | null;
  quantity: number;
};

type CartValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, opts: { size?: string; quantity?: number }) => void;
  updateQuantity: (productId: string, size: string | null, quantity: number) => void;
  removeItem: (productId: string, size: string | null) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

const lineKey = (productId: string, size: string | null | undefined) => `${productId}::${size || ""}`;

/** Shop cart, same line model as the site's CartContext, persisted on the device. */
export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    storage.getItem<string | null>(STORAGE_KEY, null).then((raw) => {
      try {
        const parsed = raw ? JSON.parse(raw) : [];
        if (Array.isArray(parsed)) setItems(parsed);
      } catch {
        // corrupted cart: start empty
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) storage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback((product: Product, { size = "", quantity = 1 }: { size?: string; quantity?: number }) => {
    setItems((prev) => {
      const key = lineKey(product.id, size);
      const idx = prev.findIndex((it) => lineKey(it.product_id, it.size) === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        { product_id: product.id, product_name: product.name, unit_price: product.price, image: product.image, size: size || null, quantity },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, size: string | null, quantity: number) => {
    setItems((prev) =>
      prev
        .map((it) => (lineKey(it.product_id, it.size) === lineKey(productId, size) ? { ...it, quantity } : it))
        .filter((it) => it.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: string, size: string | null) => {
    setItems((prev) => prev.filter((it) => lineKey(it.product_id, it.size) !== lineKey(productId, size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(
    () => ({
      items,
      count: items.reduce((s, it) => s + it.quantity, 0),
      total: items.reduce((s, it) => s + it.unit_price * it.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [items, addItem, updateQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
