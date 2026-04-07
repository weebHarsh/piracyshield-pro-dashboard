export type Platform = 
  | 'Netflix'
  | 'Amazon Prime'
  | 'Disney+'
  | 'Hulu'
  | 'YouTube'
  | 'Vimeo'
  | 'Twitter'
  | 'Facebook'
  | 'Instagram'
  | 'TikTok'
  | 'Spotify'
  | 'Apple Music'
  | 'Steam'
  | 'Epic Games'
  | 'Google Play'
  | 'Other';

export type ContentType = 
  | 'Movie'
  | 'Music'
  | 'Software'
  | 'Book'
  | 'Game'
  | 'TV Show'
  | 'Documentary'
  | 'Anime'
  | 'Other';

export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type IncidentStatus = 'New' | 'In Progress' | 'Resolved' | 'Closed';

export type TakedownStatus = 'Pending' | 'Submitted' | 'Approved' | 'Rejected' | 'Completed';

export type AccountTier = 'free' | 'starter' | 'pro' | 'enterprise';

export type TabId = 
  | 'dashboard'
  | 'incidents'
  | 'takedowns'
  | 'content'
  | 'configuration'
  | 'users';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'viewer';
  accountTier: AccountTier;
  createdAt: string;
  lastLogin?: string;
}

export interface Incident {
  id: string;
  title: string;
  thumbnail: string;
  platform: Platform;
  type: ContentType;
  risk: RiskLevel;
  similarity: number;
  status: IncidentStatus;
  url: string;
  date: string;
  userId: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface Takedown {
  id: string;
  incidentId: string;
  userId: string;
  platform: Platform;
  status: TakedownStatus;
  submittedAt: string;
  completedAt?: string;
  reason: string;
  notes?: string;
}

export interface WhitelistEntry {
  id: string;
  title: string;
  type: ContentType;
  author: string;
  platform: Platform;
  addedBy: string;
  addedAt: string;
  reason?: string;
}

export interface BlacklistEntry {
  id: string;
  keyword: string;
  type: ContentType;
  addedBy: string;
  addedAt: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

export interface Keyword {
  id: string;
  keyword: string;
  category: ContentType;
  addedBy: string;
  addedAt: string;
}

export interface ScheduledScan {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  platform: Platform;
  keywords: string[];
  active: boolean;
  createdBy: string;
}

export interface KPIData {
  title: string;
  value: number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  variant: 'primary' | 'warning' | 'danger' | 'success';
}

export interface ChartData {
  id: string;
  type: 'line' | 'pie' | 'bar' | 'donut';
  title: string;
  data: Record<string, unknown>;
}

export interface AppState {
  isAuthenticated: boolean;
  currentUser: User | null;
  currentTab: TabId;
  selectedIncidents: Set<string>;
  incidents: Incident[];
  takedowns: Takedown[];
  whitelist: WhitelistEntry[];
  blacklist: BlacklistEntry[];
  keywords: Keyword[];
  platforms: Platform[];
  scheduledScans: ScheduledScan[];
  users: User[];
  kpiData: KPIData[];
  chartData: ChartData[];
}