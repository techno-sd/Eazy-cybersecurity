'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface CsrfState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface UseCsrfOptions {
  /** Auto-fetch token on mount (default: true) */
  autoFetch?: boolean;
  /** Refresh interval in ms (default: 50 minutes) */
  refreshInterval?: number;
}

const CSRF_HEADER_NAME = 'x-csrf-token';
const DEFAULT_REFRESH_INTERVAL = 50 * 60 * 1000; // 50 minutes (before 1 hour expiry)

/**
 * Hook for managing CSRF tokens in admin components
 *
 * Usage:
 * ```tsx
 * const { token, loading, error, fetchToken, getCsrfHeaders } = useCsrf();
 *
 * // For fetch requests:
 * fetch('/api/admin/users', {
 *   method: 'POST',
 *   headers: getCsrfHeaders(),
 *   body: JSON.stringify(data),
 * });
 * ```
 */
export function useCsrf(options: UseCsrfOptions = {}) {
  const { autoFetch = true, refreshInterval = DEFAULT_REFRESH_INTERVAL } = options;

  const [state, setState] = useState<CsrfState>({
    token: null,
    loading: false,
    error: null,
  });

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchToken = useCallback(async (): Promise<string | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch('/api/admin/csrf', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();

      if (!data.success || !data.token) {
        throw new Error(data.message || 'Invalid CSRF response');
      }

      if (isMountedRef.current) {
        setState({
          token: data.token,
          loading: false,
          error: null,
        });
      }

      return data.token;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'CSRF token fetch failed';

      if (isMountedRef.current) {
        setState({
          token: null,
          loading: false,
          error: errorMessage,
        });
      }

      return null;
    }
  }, []);

  // Get headers object with CSRF token included
  const getCsrfHeaders = useCallback(
    (additionalHeaders: Record<string, string> = {}): Record<string, string> => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...additionalHeaders,
      };

      if (state.token) {
        headers[CSRF_HEADER_NAME] = state.token;
      }

      return headers;
    },
    [state.token]
  );

  // Create a fetch wrapper that includes CSRF headers
  const csrfFetch = useCallback(
    async (url: string, options: RequestInit = {}): Promise<Response> => {
      const headers = new Headers(options.headers);

      if (state.token) {
        headers.set(CSRF_HEADER_NAME, state.token);
      }

      // Ensure cookies are sent
      return fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    },
    [state.token]
  );

  // Auto-fetch on mount
  useEffect(() => {
    isMountedRef.current = true;

    if (autoFetch) {
      fetchToken();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [autoFetch, fetchToken]);

  // Set up auto-refresh
  useEffect(() => {
    if (state.token && refreshInterval > 0) {
      refreshTimerRef.current = setInterval(() => {
        fetchToken();
      }, refreshInterval);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [state.token, refreshInterval, fetchToken]);

  return {
    token: state.token,
    loading: state.loading,
    error: state.error,
    fetchToken,
    getCsrfHeaders,
    csrfFetch,
    isReady: !!state.token && !state.loading,
  };
}

export default useCsrf;
