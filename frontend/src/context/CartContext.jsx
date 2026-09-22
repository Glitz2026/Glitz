import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const CartCtx = createContext(null);
const STORAGE_KEY = "glitz_cart";

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function lineKey(productId, size) {
    return `${productId}::${size || ""}`;
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* private mode / storage blocked */ }
    }, [items]);

    const addItem = useCallback((product, { size = "", quantity = 1 } = {}) => {
        setItems((prev) => {
            const key = lineKey(product.id, size);
            const idx = prev.findIndex((it) => lineKey(it.product_id, it.size) === key);
            if (idx >= 0) {
                const next = [...prev];
                next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
                return next;
            }
            return [...prev, {
                product_id: product.id,
                product_name: product.name,
                unit_price: product.price,
                image: product.image,
                size: size || null,
                quantity,
            }];
        });
        setOpen(true);
    }, []);

    const updateQuantity = useCallback((productId, size, quantity) => {
        setItems((prev) => prev
            .map((it) => (lineKey(it.product_id, it.size) === lineKey(productId, size) ? { ...it, quantity } : it))
            .filter((it) => it.quantity > 0));
    }, []);

    const removeItem = useCallback((productId, size) => {
        setItems((prev) => prev.filter((it) => lineKey(it.product_id, it.size) !== lineKey(productId, size)));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);
    const total = useMemo(() => items.reduce((sum, it) => sum + it.unit_price * it.quantity, 0), [items]);

    const value = { items, addItem, updateQuantity, removeItem, clear, count, total, open, setOpen };

    return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
    const ctx = useContext(CartCtx);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
}
