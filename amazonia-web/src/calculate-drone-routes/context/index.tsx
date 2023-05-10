import { useContext } from 'react';
import {
  CalculatorContext,
  CalculatorContextProvider,
} from './context-provider';

export const useCalculatorContext = () => useContext(CalculatorContext);

export const withCalculatorContext = <P extends object>(
  Component: React.ComponentType<P>,
): React.FC<P> =>
  function hoc(props: P) {
    return (
      <CalculatorContextProvider>
        <Component {...props} />
      </CalculatorContextProvider>
    );
  };
