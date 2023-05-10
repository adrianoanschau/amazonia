import { Container, CssBaseline, ThemeProvider, styled } from '@mui/material';
import theme from './theme/default';
import { CalculateDroneRoutes } from './components/calculate-drone-routes';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledContainer maxWidth="sm">
        <CalculateDroneRoutes />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
