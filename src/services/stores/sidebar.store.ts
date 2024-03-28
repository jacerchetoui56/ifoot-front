import { create } from "zustand";

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
}));
