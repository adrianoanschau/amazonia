import { Divider, Paper, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalculatorWrapper } from './calculator-wrapper';
import { useCalculatorContext, withCalculatorContext } from './context';
import { PropsWithChildren, useEffect } from 'react';

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

const Drone = styled(() => (
  <figure
    style={{
      width: 220,
      margin: 0,
      position: 'absolute',
      top: -30,
      right: 10,
    }}
  >
    <img src="/drone.png" style={{ maxWidth: '100%' }} />
  </figure>
))();

function CalculateDroneRoutesComponent() {
  const { formData } = useCalculatorContext();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Container>
      <Title title="Amazonia Drone Router" subtitle="by Ateliware" />
      <Wrapper>
        <CalculatorWrapper />
      </Wrapper>
      <Drone />
    </Container>
  );
}

export const CalculateDroneRoutes = withCalculatorContext(
  CalculateDroneRoutesComponent,
);
