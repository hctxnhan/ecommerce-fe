import { create } from 'zustand';

type LoadingStore = {
  loading: boolean;
  message: string;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  asyncAction: <T>(
    fn: (args?: any) => Promise<T>,
    message?: string
  ) => (args?: any) => Promise<T>;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  message: '',
  showLoading: (message) => set({ loading: true, message }),
  hideLoading: () => set({ loading: false, message: '' }),
  asyncAction:
    (fn, message = 'Loading') =>
    async (args) => {
      set({ loading: true, message });
      try {
        const result = await fn(args);
        return result;
      } catch (error) {
        throw error;
      } finally {
        set({ loading: false, message: '' });
      }
    }
}));
