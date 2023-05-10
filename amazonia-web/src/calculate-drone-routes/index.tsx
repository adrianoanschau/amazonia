import {
  Box,
  Divider,
  Paper,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { CalculatorWrapper } from './calculator-wrapper';
import { withCalculatorContext } from './context';

const Container = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  padding: theme.spacing(2),
}));

const Wrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.getContrastText(theme.palette.grey[200]),
  padding: theme.spacing(2),
}));

const Title = styled(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
    <>
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="h4"
        color="text.secondary"
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
      <Divider sx={{ mt: 1, mb: 2, borderWidth: 2 }} />
    </>
  ),
)<TypographyProps>();

const Drone = styled(() => {
  const theme = useTheme();

  return (
    <Box
      component="figure"
      sx={{
        position: 'absolute',
        top: 18,
        right: 10,
        width: 100,
        margin: 0,
        [theme.breakpoints.up('sm')]: {
          width: 220,
          top: -30,
        },
      }}
    >
      <Box component="img" src="/drone.png" sx={{ maxWidth: '100%' }} />
    </Box>
  );
})();

function CalculateDroneRoutesComponent() {
  return (
    <Container>
      <Drone />
      <Title title="Amazonia Drone Router" subtitle="by Ateliware" />
      <Wrapper>
        <CalculatorWrapper />
      </Wrapper>
    </Container>
  );
}

export const CalculateDroneRoutes = withCalculatorContext(
  CalculateDroneRoutesComponent,
);
