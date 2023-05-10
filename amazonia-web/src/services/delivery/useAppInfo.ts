import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, AppInfo } from './api';

export const useAppInfo = () => {
  const [data, setData] = useState<AppInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getAppInfo();
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, []);

  const values = useMemo(() => {
    return { data, loading, error };
  }, [data, loading, error]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return [values, loadData] as [typeof values, typeof loadData];
};
