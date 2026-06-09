import { useState, useCallback } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, limit } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMessage = error instanceof Error ? error.message : String(error);
  
  const isPermissionError = 
    errMessage.toLowerCase().includes('permission') || 
    errMessage.toLowerCase().includes('insufficient');

  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  console.error('Firestore Error Details:', JSON.stringify(errInfo));
  
  if (isPermissionError) {
    console.warn(`Permission error explicitly suppressed: ${errMessage}`);
  }
}

// Use this for recording visitor analytics / feature usage
export function useAnalytics() {
  const recordEvent = useCallback(async (eventName: string, metadata?: Record<string, any>) => {
    if (!db) {
      console.warn('Firebase DB not initialized. Skipping analytics log:', eventName);
      return;
    }
    
    try {
      const docData: any = {
        event: eventName,
        userAgent: navigator.userAgent.substring(0, 300),
        timestamp: serverTimestamp(),
      };
      if (metadata) {
        docData.metadata = metadata;
      }

      await addDoc(collection(db, 'analytics'), docData);
    } catch (error) {
      console.warn('Failed to log analytics (could be insufficient permissions). Tracking error:');
      handleFirestoreError(error, OperationType.CREATE, 'analytics');
    }
  }, []);

  return { recordEvent };
}

// Use this for submitting contact requests
export function useContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = useCallback(async (email: string, message: string) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    if (!db) {
      // Logic for fallback behavior when Firebase isn't hooked up yet
      console.warn('Firebase DB not initialized. Simulating submission.');
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
      }, 1000);
      return true;
    }

    try {
      if (!email.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)) {
        throw new Error('Invalid email format');
      }

      await addDoc(collection(db, 'contacts'), {
        email,
        message: message.substring(0, 5000), // Firestore limits based on rules
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err?.message || 'Failed to send message');
      handleFirestoreError(err, OperationType.CREATE, 'contacts');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { submitContact, isSubmitting, success, error };
}

// Hook to pull dynamic configuration
export function useFeatureFlags() {
  // In a real app, you might use onSnapshot to stay up to date.
  // We provide a stub that just fetches the current config.
  const [flags, setFlags] = useState<Record<string, boolean>>({
    enableMiniBrain: true,
    enableScan: true,
  });

  const loadFlags = useCallback(async () => {
    if (!db) return;
    try {
      // Just an example. Our rules allow reading featureFlags. 
      const snap = await getDocs(query(collection(db, 'featureFlags'), limit(1)));
      if (!snap.empty) {
        setFlags(snap.docs[0].data() as Record<string, boolean>);
      }
    } catch (error) {
      console.error('Error fetching feature flags:', error);
      handleFirestoreError(error, OperationType.LIST, 'featureFlags');
    }
  }, []);

  return { flags, loadFlags };
}

export function useScanLog() {
  const recordScan = useCallback(async (mode: string, resultData: string) => {
    if (!db) return;
    try {
        await addDoc(collection(db, 'scans'), {
            mode,
            scanResult: resultData.substring(0, 2000),
            createdAt: serverTimestamp(),
        });
    } catch (err) {
        console.error('Error saving scan result:', err);
        handleFirestoreError(err, OperationType.CREATE, 'scans');
    }
  }, []);

  return { recordScan };
}

