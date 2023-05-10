import {
  Container,
  CssBaseline,
  Divider,
  Stack,
  ThemeProvider,
  styled,
} from '@mui/material';
import theme from './theme/default';
import { CalculateDroneRoutes } from './calculate-drone-routes';
import { AppInfo } from './app-info';

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
        <Stack sx={{ gap: 2 }}>
          <CalculateDroneRoutes />
          <Divider sx={{ borderColor: theme.palette.grey[700] }} />
          <AppInfo />
        </Stack>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
