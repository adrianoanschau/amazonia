import { createContext, useCallback, useState } from 'react';
import { useDeliveryTimeData } from '../../services/delivery';
import { DeliveryTimeData } from '../../services/delivery/api';

type Nullable<T> = T | null;

type FormData = {
  droneStart: Nullable<string>;
  objectPickUp: Nullable<string>;
  deliveryDestination: Nullable<string>;
};

type TCalculatorContext = {
  formData: FormData;
  deliveryTime: {
    data?: DeliveryTimeData;
    loading?: boolean;
    error?: unknown;
  };
  setFormData: (
    field: 'droneStart' | 'objectPickUp' | 'deliveryDestination',
    data: Nullable<string>,
  ) => void;
  onSubmit: () => void;
};

export const CalculatorContext = createContext<TCalculatorContext>({
  formData: {
    droneStart: null,
    objectPickUp: null,
    deliveryDestination: null,
  },
  deliveryTime: {
    data: undefined,
    loading: undefined,
    error: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFormData: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit: () => {},
});

export function CalculatorContextProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [droneStart, setDroneStart] = useState<Nullable<string>>(null);
  const [objectPickUp, setObjectPickUp] = useState<Nullable<string>>(null);
  const [deliveryDestination, setDeliveryDestination] =
    useState<Nullable<string>>(null);

  const [deliveryTime, loadDeliveryTimeData] = useDeliveryTimeData();

  const handleSetFormData = useCallback(
    (
      field: 'droneStart' | 'objectPickUp' | 'deliveryDestination',
      data: Nullable<string>,
    ) => {
      return {
        droneStart: setDroneStart,
        objectPickUp: setObjectPickUp,
        deliveryDestination: setDeliveryDestination,
      }[field](data);
    },
    [],
  );

  const handleSubmitForCalculate = useCallback(() => {
    if (!droneStart || !objectPickUp || !deliveryDestination) return;

    loadDeliveryTimeData({
      start_on: droneStart,
      object_location: objectPickUp,
      delivery_on: deliveryDestination,
    });
  }, [loadDeliveryTimeData, droneStart, objectPickUp, deliveryDestination]);

  return (
    <CalculatorContext.Provider
      value={{
        formData: { droneStart, objectPickUp, deliveryDestination },
        deliveryTime,
        setFormData: handleSetFormData,
        onSubmit: handleSubmitForCalculate,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}
