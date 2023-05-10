import { useCallback, useMemo, useState } from 'react';
import { api, DeliveryTimeData, DeliveryTimeQueryData } from './api';

export const useDeliveryTimeData = () => {
  const [data, setData] = useState<DeliveryTimeData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const loadData = useCallback(async (params: DeliveryTimeQueryData) => {
    try {
      setLoading(true);
      const response = await api.getDeliveryTime(params);

      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, []);

  const values = useMemo(() => {
    return { data, loading, error };
  }, [data, loading, error]);

  return [values, loadData] as [typeof values, typeof loadData];
};
