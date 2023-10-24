import { create } from "zustand";

interface SongUploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSongUploadModalState = create<SongUploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSongUploadModalState;
