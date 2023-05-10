import { createContext, useCallback, useState } from 'react';

type Nullable<T> = T | null;

type FormData = {
  droneStart: Nullable<string>;
  objectPickUp: Nullable<string>;
  deliveryDestination: Nullable<string>;
};

type TCalculatorContext = {
  formData: FormData;
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
    //
  }, []);

  return (
    <CalculatorContext.Provider
      value={{
        formData: { droneStart, objectPickUp, deliveryDestination },
        setFormData: handleSetFormData,
        onSubmit: handleSubmitForCalculate,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}
