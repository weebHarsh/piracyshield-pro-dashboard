'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from '@/stores/appStore';

export function useIncidents() {
  const incidents = useAppStore((state) => state.data.incidents);
  const addIncident = useAppStore((state) => state.addIncident);
  const updateIncident = useAppStore((state) => state.updateIncident);
  const deleteIncident = useAppStore((state) => state.deleteIncident);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const createIncident = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newIncident = {
        id: `inc-${Date.now()}`,
        title: data.title,
        thumbnail: '/placeholder.jpg',
        platform: data.platform,
        type: data.type,
        risk: 'Medium' as const,
        similarity: Math.floor(Math.random() * 20) + 80,
        status: 'New' as const,
        url: data.url,
        date: new Date().toISOString(),
        userId: 'user-1',
        description: data.description,
      };
      
      addIncident(newIncident);
      toast.success('Incident reported successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to create incident');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const editIncident = async (id: string, updates: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      updateIncident(id, updates);
      toast.success('Incident updated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to update incident');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const initiateTakedown = async (incidentId: string) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      updateIncident(incidentId, { status: 'In Progress' });
      toast.success('Takedown initiated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to initiate takedown');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const bulkTakedown = async (incidentIds: string[]) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      incidentIds.forEach(id => {
        updateIncident(id, { status: 'In Progress' });
      });
      toast.success(`Takedown initiated for ${incidentIds.length} incidents`);
      return true;
    } catch (error) {
      toast.error('Failed to initiate bulk takedown');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteIncidentById = async (incidentId: string) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteIncident(incidentId);
      toast.success('Incident deleted successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to delete incident');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    incidents,
    isLoading,
    isSubmitting,
    createIncident,
    editIncident,
    initiateTakedown,
    bulkTakedown,
    deleteIncident: deleteIncidentById,
  };
}

export function useTakedowns() {
  const takedowns = useAppStore((state) => state.data.takedowns);
  const addTakedown = useAppStore((state) => state.addTakedown);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const createTakedown = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTakedown = {
        id: `tk-${Date.now()}`,
        incidentId: data.incidentId || null,
        userId: 'user-1',
        platform: data.platform,
        status: 'Pending' as const,
        submittedAt: new Date().toISOString(),
        reason: data.reason,
        notes: data.notes,
      };
      
      addTakedown(newTakedown);
      toast.success('Takedown request created!');
      return true;
    } catch (error) {
      toast.error('Failed to create takedown request');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    takedowns,
    isLoading,
    isSubmitting,
    createTakedown,
  };
}

export function useContent() {
  const whitelist = useAppStore((state) => state.data.whitelist);
  const blacklist = useAppStore((state) => state.data.blacklist);
  const addToWhitelist = useAppStore((state) => state.addToWhitelist);
  const removeFromWhitelist = useAppStore((state) => state.removeFromWhitelist);
  const addToBlacklist = useAppStore((state) => state.addToBlacklist);
  const removeFromBlacklist = useAppStore((state) => state.removeFromBlacklist);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const addWhitelistEntry = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const entry = {
        id: `wl-${Date.now()}`,
        title: data.title,
        type: data.type,
        author: data.author,
        platform: data.platform,
        addedBy: 'Admin',
        addedAt: new Date().toISOString(),
        reason: data.reason,
      };
      
      addToWhitelist(entry);
      toast.success('Added to whitelist!');
      return true;
    } catch (error) {
      toast.error('Failed to add to whitelist');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeWhitelistEntry = async (id: string) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromWhitelist(id);
      toast.success('Removed from whitelist');
      return true;
    } catch (error) {
      toast.error('Failed to remove from whitelist');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBlacklistEntry = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const entry = {
        id: `bl-${Date.now()}`,
        keyword: data.keyword,
        type: data.type,
        addedBy: 'Admin',
        addedAt: new Date().toISOString(),
        severity: data.severity,
      };
      
      addToBlacklist(entry);
      toast.success('Added to blacklist!');
      return true;
    } catch (error) {
      toast.error('Failed to add to blacklist');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeBlacklistEntry = async (id: string) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromBlacklist(id);
      toast.success('Removed from blacklist');
      return true;
    } catch (error) {
      toast.error('Failed to remove from blacklist');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    whitelist,
    blacklist,
    isLoading,
    isSubmitting,
    addWhitelistEntry,
    removeWhitelistEntry,
    addBlacklistEntry,
    removeBlacklistEntry,
  };
}

export function useConfiguration() {
  const keywords = useAppStore((state) => state.data.keywords);
  const addKeyword = useAppStore((state) => state.addKeyword);
  const removeKeyword = useAppStore((state) => state.removeKeyword);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const createKeyword = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const keyword = {
        id: `kw-${Date.now()}`,
        keyword: data.keyword,
        category: data.category,
        addedBy: 'Admin',
        addedAt: new Date().toISOString(),
      };
      
      addKeyword(keyword);
      toast.success('Keyword added successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to add keyword');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteKeyword = async (id: string) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      removeKeyword(id);
      toast.success('Keyword deleted!');
      return true;
    } catch (error) {
      toast.error('Failed to delete keyword');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    keywords,
    isLoading,
    isSubmitting,
    createKeyword,
    deleteKeyword,
  };
}

export function useUsers() {
  const users = useAppStore((state) => state.data.users);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const createUser = async (data: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
        accountTier: data.plan,
        createdAt: new Date().toISOString(),
      };
      
      toast.success('User created successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to create user');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const editUser = async (id: string, updates: any) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success('User updated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to update user');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    users,
    isLoading,
    isSubmitting,
    createUser,
    editUser,
  };
}