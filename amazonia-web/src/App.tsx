import {
  Container,
  CssBaseline,
  Divider,
  LinearProgress,
  Stack,
  ThemeProvider,
  styled,
} from '@mui/material';
import theme from './theme/default';
import { CalculateDroneRoutes } from './calculate-drone-routes';
import { AppInfo } from './app-info';
import {
  useServiceAvailableContext,
  withServiceAvailableContext,
} from './app-info/context';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

function AppComponent() {
  const { loading } = useServiceAvailableContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <LinearProgress />}
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

const App = withServiceAvailableContext(AppComponent);

export default App;
