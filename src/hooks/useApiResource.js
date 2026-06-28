import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

export default function useApiResource(path, initialValue) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await apiRequest(path);
      setData(response.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [path]);

  return {
    data,
    setData,
    isLoading,
    error,
    refetch: load,
  };
}
