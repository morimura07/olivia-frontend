"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  toggle: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const saved = get().ids.includes(id);
        set({ ids: saved ? get().ids.filter((x) => x !== id) : [...get().ids, id] });
        return !saved;
      },
    }),
    { name: "olivia-wishlist", version: 1, skipHydration: true },
  ),
);
