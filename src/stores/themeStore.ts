import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  syncWithSystem: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      resolvedTheme: 'light',

      setTheme: (theme: Theme) => {
        const resolved =
          theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : theme;

        set({ theme, resolvedTheme: resolved });

        if (resolved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      syncWithSystem: () => {
        const { theme } = get();
        if (theme === 'system') {
          get().setTheme('system');
        }
      },
    }),
    {
      name: 'piracyshield-theme',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme class on hydration
          const resolved =
            state.theme === 'system'
              ? typeof window !== 'undefined' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
              : state.theme;

          state.resolvedTheme = resolved;
          if (typeof document !== 'undefined') {
            if (resolved === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      },
    }
  )
);
