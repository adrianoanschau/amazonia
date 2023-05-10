import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, DeliveryTimeData, DeliveryTimeQueryData } from './api';

export type DeliveryTimeCalculated = {
  params: DeliveryTimeQueryData;
  data: DeliveryTimeData;
};

export const useDeliveryTimeData = () => {
  const [data, setData] = useState<DeliveryTimeCalculated[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const values = useMemo(() => {
    return { data, loading, error };
  }, [data, loading, error]);

  const loadCacheData = useCallback(() => {
    return JSON.parse(
      localStorage.getItem('amazonia:delivery-time-calculated') ?? '[]',
    ) as DeliveryTimeCalculated[];
  }, []);

  const loadData = useCallback(
    async (params: DeliveryTimeQueryData) => {
      try {
        setLoading(true);
        const response = await api.getDeliveryTime(params);

        const cache = loadCacheData();
        const data = [{ params, data: response.data }]
          .concat(cache)
          .slice(0, 11);

        localStorage.setItem(
          'amazonia:delivery-time-calculated',
          JSON.stringify(data),
        );

        setData(data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    },
    [loadCacheData],
  );

  useEffect(() => {
    const cache = loadCacheData();

    setData(cache);
  }, [loadCacheData]);

  return [values, loadData] as [typeof values, typeof loadData];
};
