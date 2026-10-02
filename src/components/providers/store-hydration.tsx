"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";

/**
 * Persisted stores skip automatic hydration so the server HTML and the first
 * client render agree; saved state is loaded right after mount.
 */
export function StoreHydration() {
  useEffect(() => {
    useCart.persist.rehydrate();
    useWishlist.persist.rehydrate();
  }, []);
  return null;
}
