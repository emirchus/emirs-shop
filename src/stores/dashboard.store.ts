import { create } from 'zustand';

interface DashboardStore {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const useDashboardStore = create<DashboardStore>(set => ({
  isExpanded: false,
  toggleExpanded: () => set(state => ({ isExpanded: !state.isExpanded }))
}));
