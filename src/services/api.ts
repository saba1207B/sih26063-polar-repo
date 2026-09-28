// src/services/api.ts

/**
 * Core API service handling environment configuration and offline mode.
 * DO NOT hard-code backend URLs. Use environment variables.
 * Fallback to mock mode if backend is not configured or unavailable.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

export type AppMode = 'ONLINE' | 'OFFLINE_DEMO' | 'ERROR' | 'LOADING';

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {

  try {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    // Return a specific error code so the consuming services know to return mock data
    throw new Error('OFFLINE_DEMO');
  }
}

/**
 * Utility for artificially delaying mock responses to simulate network latency
 * and show loading states.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
