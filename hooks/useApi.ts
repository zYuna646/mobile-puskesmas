import { useState } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  get: (endpoint: string) => Promise<void>;
  post: (endpoint: string, body: Record<string, any>) => Promise<void>;
  put: (endpoint: string, body: Record<string, any>) => Promise<void>;
  remove: (endpoint: string) => Promise<void>;
}

const useApi = <T = any>(baseUrl: string): ApiResponse<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  // GET request (fetch data)
  const get = async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
      });
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // POST request (create new data)
  const post = async (endpoint: string, body: Record<string, any>): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // PUT request (update existing data)
  const put = async (endpoint: string, body: Record<string, any>): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // DELETE request (remove data)
  const remove = async (endpoint: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setData(null);
      } else {
        throw new Error('Failed to delete resource');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { get, post, put, remove, data, loading, error };
};

export default useApi;
