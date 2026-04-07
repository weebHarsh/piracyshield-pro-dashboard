import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  Incident, 
  Takedown, 
  WhitelistEntry, 
  BlacklistEntry, 
  Keyword,
  ScheduledScan,
  TabId,
  AccountTier,
  KPIData
} from '@/types';

interface AppState {
  isAuthenticated: boolean;
  currentUser: User | null;
  currentTab: TabId;
  selectedIncidents: Set<string>;
  accountTier: AccountTier;
  data: {
    incidents: Incident[];
    takedowns: Takedown[];
    whitelist: WhitelistEntry[];
    blacklist: BlacklistEntry[];
    keywords: Keyword[];
    platforms: string[];
    scheduledScans: ScheduledScan[];
    users: User[];
  };
}

interface AppActions {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setCurrentTab: (tab: TabId) => void;
  selectIncident: (id: string) => void;
  deselectIncident: (id: string) => void;
  selectAllIncidents: () => void;
  deselectAllIncidents: () => void;
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  setTakedowns: (takedowns: Takedown[]) => void;
  addTakedown: (takedown: Takedown) => void;
  setWhitelist: (whitelist: WhitelistEntry[]) => void;
  addToWhitelist: (entry: WhitelistEntry) => void;
  removeFromWhitelist: (id: string) => void;
  setBlacklist: (blacklist: BlacklistEntry[]) => void;
  addToBlacklist: (entry: BlacklistEntry) => void;
  removeFromBlacklist: (id: string) => void;
  setKeywords: (keywords: Keyword[]) => void;
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (id: string) => void;
}

const DEMO_USER: User = {
  id: 'demo-user-001',
  email: 'admin@piracyshield.com',
  name: 'Admin User',
  role: 'admin',
  accountTier: 'pro',
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString(),
};

const initialKPIData: KPIData[] = [
  {
    title: 'Active Threats',
    value: 287,
    change: '+12',
    trend: 'up',
    icon: 'shield',
    variant: 'primary',
  },
  {
    title: 'Pending Takedowns',
    value: 45,
    change: '-3',
    trend: 'down',
    icon: 'takedown',
    variant: 'warning',
  },
  {
    title: 'Success Rate',
    value: 94,
    change: '+2%',
    trend: 'up',
    icon: 'success',
    variant: 'success',
  },
  {
    title: 'Monthly Savings',
    value: 12500,
    change: '+$1,200',
    trend: 'up',
    icon: 'money',
    variant: 'primary',
  },
];

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: null,
      currentTab: 'dashboard',
      selectedIncidents: new Set<string>(),
      accountTier: 'free',
      data: {
        incidents: [],
        takedowns: [],
        whitelist: [],
        blacklist: [],
        keywords: [],
        platforms: [],
        scheduledScans: [],
        users: [],
      },

      login: (email, password) => {
        if (email === 'admin@piracyshield.com' && password === 'demo123') {
          set({ 
            isAuthenticated: true, 
            currentUser: DEMO_USER,
            accountTier: 'pro'
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ 
          isAuthenticated: false, 
          currentUser: null,
          currentTab: 'dashboard',
          selectedIncidents: new Set<string>(),
          accountTier: 'free'
        });
      },

      setCurrentTab: (tab) => {
        set({ currentTab: tab });
      },

      selectIncident: (id) => {
        set((state) => {
          const newSelected = new Set(state.selectedIncidents);
          newSelected.add(id);
          return { selectedIncidents: newSelected };
        });
      },

      deselectIncident: (id) => {
        set((state) => {
          const newSelected = new Set(state.selectedIncidents);
          newSelected.delete(id);
          return { selectedIncidents: newSelected };
        });
      },

      selectAllIncidents: () => {
        set((state) => ({
          selectedIncidents: new Set(state.data.incidents.map(i => i.id))
        }));
      },

      deselectAllIncidents: () => {
        set({ selectedIncidents: new Set<string>() });
      },

      setIncidents: (incidents) => {
        set((state) => ({
          data: { ...state.data, incidents }
        }));
      },

      addIncident: (incident) => {
        set((state) => ({
          data: {
            ...state.data,
            incidents: [...state.data.incidents, incident]
          }
        }));
      },

      updateIncident: (id, updates) => {
        set((state) => ({
          data: {
            ...state.data,
            incidents: state.data.incidents.map(i =>
              i.id === id ? { ...i, ...updates } : i
            )
          }
        }));
      },

      deleteIncident: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            incidents: state.data.incidents.filter(i => i.id !== id)
          }
        }));
      },

      setTakedowns: (takedowns) => {
        set((state) => ({
          data: { ...state.data, takedowns }
        }));
      },

      addTakedown: (takedown) => {
        set((state) => ({
          data: {
            ...state.data,
            takedowns: [...state.data.takedowns, takedown]
          }
        }));
      },

      setWhitelist: (whitelist) => {
        set((state) => ({
          data: { ...state.data, whitelist }
        }));
      },

      addToWhitelist: (entry) => {
        set((state) => ({
          data: {
            ...state.data,
            whitelist: [...state.data.whitelist, entry]
          }
        }));
      },

      removeFromWhitelist: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            whitelist: state.data.whitelist.filter(w => w.id !== id)
          }
        }));
      },

      setBlacklist: (blacklist) => {
        set((state) => ({
          data: { ...state.data, blacklist }
        }));
      },

      addToBlacklist: (entry) => {
        set((state) => ({
          data: {
            ...state.data,
            blacklist: [...state.data.blacklist, entry]
          }
        }));
      },

      removeFromBlacklist: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            blacklist: state.data.blacklist.filter(b => b.id !== id)
          }
        }));
      },

      setKeywords: (keywords) => {
        set((state) => ({
          data: { ...state.data, keywords }
        }));
      },

      addKeyword: (keyword) => {
        set((state) => ({
          data: {
            ...state.data,
            keywords: [...state.data.keywords, keyword]
          }
        }));
      },

      removeKeyword: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            keywords: state.data.keywords.filter(k => k.id !== id)
          }
        }));
      },
    }),
    {
      name: 'piracyshield-storage',
      partialize: (state) => ({
        currentTab: state.currentTab,
        accountTier: state.accountTier,
      }),
    }
  )
);

export { initialKPIData };