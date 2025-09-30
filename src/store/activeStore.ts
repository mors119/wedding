import type { PictureItem } from '@/modules/gallery/Gallery';
import { create } from 'zustand';

type ActiveState = {
  active: PictureItem | null;
  // 액션들
  open: (item: PictureItem) => void;
  close: () => void;
  // 선택: 같은 아이템을 다시 누르면 닫히게
  toggle: (item: PictureItem) => void;
};

export const useActive = create<ActiveState>((set, get) => ({
  active: null,
  open: (item) => set({ active: item }),
  close: () => set({ active: null }),
  toggle: (item) => {
    const cur = get().active;
    if (cur && cur.url === item.url) set({ active: null });
    else set({ active: item });
  },
}));
