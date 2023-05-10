import { Box, Typography, Divider } from '@mui/material';
import { CalculatorForm } from './calculator-form';

export function CalculatorWrapper() {
  return (
    <Box>
      <Typography>Input the coordinates</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <CalculatorForm />
      <Divider sx={{ my: 2 }} />
      Route description
      <Divider sx={{ my: 2 }} />
      Last 10 routes calculated
    </Box>
  );
}
