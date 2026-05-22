import { useState, useCallback } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
      console.error('Failed to log analytics:', error);
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
    }
  }, []);

  return { recordScan };
}
