import { create } from "zustand";

interface AdminSidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAdminSidebar = create<AdminSidebarState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
