import type { Incident, Takedown, WhitelistEntry, BlacklistEntry, Keyword, User } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Request failed' };
      }

      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  // Incidents
  async getIncidents(params?: { status?: string; risk?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.risk) searchParams.append('risk', params.risk);
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<Incident[]>(`/incidents${query ? `?${query}` : ''}`);
  }

  async createIncident(incident: Partial<Incident>) {
    return this.request<Incident>('/incidents', {
      method: 'POST',
      body: JSON.stringify(incident),
    });
  }

  async updateIncident(id: string, updates: Partial<Incident>) {
    return this.request<Incident>(`/incidents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteIncident(id: string) {
    return this.request<void>(`/incidents/${id}`, { method: 'DELETE' });
  }

  // Takedowns
  async getTakedowns(params?: { status?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    
    const query = searchParams.toString();
    return this.request<Takedown[]>(`/takedowns${query ? `?${query}` : ''}`);
  }

  async createTakedown(takedown: Partial<Takedown>) {
    return this.request<Takedown>('/takedowns', {
      method: 'POST',
      body: JSON.stringify(takedown),
    });
  }

  // Content
  async getWhitelist() {
    return this.request<WhitelistEntry[]>('/content/whitelist');
  }

  async addToWhitelist(entry: Partial<WhitelistEntry>) {
    return this.request<WhitelistEntry>('/content/whitelist', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  async getBlacklist() {
    return this.request<BlacklistEntry[]>('/content/blacklist');
  }

  async addToBlacklist(entry: Partial<BlacklistEntry>) {
    return this.request<BlacklistEntry>('/content/blacklist', {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  // Configuration
  async getKeywords(params?: { search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append('search', params.search);
    
    const query = searchParams.toString();
    return this.request<Keyword[]>(`/configuration/keywords${query ? `?${query}` : ''}`);
  }

  async createKeyword(keyword: Partial<Keyword>) {
    return this.request<Keyword>('/configuration/keywords', {
      method: 'POST',
      body: JSON.stringify(keyword),
    });
  }

  async deleteKeyword(id: string) {
    return this.request<void>(`/configuration/keywords?id=${id}`, { method: 'DELETE' });
  }

  async getPlatforms() {
    return this.request<{ id: string; name: string; enabled: boolean; scanFrequency: string }[]>('/configuration/platforms');
  }

  // Users
  async getUsers() {
    return this.request<User[]>('/users');
  }

  async createUser(user: Partial<User>) {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request<void>('/auth/logout', { method: 'DELETE' });
  }
}

export const api = new APIClient();
export default APIClient;