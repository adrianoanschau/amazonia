import { Container, Divider, Stack, styled, useTheme } from '@mui/material';
import { CalculateDroneRoutes } from './calculate-drone-routes';
import { AppInfo } from './app-info';
import { withServiceAvailableContext } from './app-info/context';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

function AppComponent() {
  const theme = useTheme();

  return (
    <StyledContainer
      maxWidth="sm"
      sx={{
        p: 1,
        [theme.breakpoints.up('sm')]: {
          p: 2,
        },
      }}
    >
      <Stack
        sx={{
          gap: 2,
          maxWidth: '100%',
          [theme.breakpoints.up('sm')]: {
            my: 8,
          },
        }}
      >
        <CalculateDroneRoutes />
        <Divider sx={{ borderColor: theme.palette.grey[700] }} />
        <AppInfo />
      </Stack>
    </StyledContainer>
  );
}

const App = withServiceAvailableContext(AppComponent);

export default App;
