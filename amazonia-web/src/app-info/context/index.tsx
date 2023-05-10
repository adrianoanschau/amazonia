import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type TServiceAvailableContext = {
  loading: boolean;
  available: boolean;
  setLoading: (value: boolean) => void;
  setAvailable: (value: boolean) => void;
};

const ServiceAvailableContext = createContext<TServiceAvailableContext>({
  loading: true,
  available: false,
  setLoading: () => {
    //
  },
  setAvailable: () => {
    //
  },
});

export function ServiceAvailableContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);

  const handleSetLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const handleSetAvailable = useCallback((value: boolean) => {
    setAvailable(value);
  }, []);

  return (
    <ServiceAvailableContext.Provider
      value={{
        available,
        loading,
        setLoading: handleSetLoading,
        setAvailable: handleSetAvailable,
      }}
    >
      {children}
    </ServiceAvailableContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useServiceAvailableContext = () =>
  useContext(ServiceAvailableContext);

// eslint-disable-next-line react-refresh/only-export-components
export const withServiceAvailableContext = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> =>
  function hoc(props: P) {
    return (
      <ServiceAvailableContextProvider>
        <Component {...props} />
      </ServiceAvailableContextProvider>
    );
  };
