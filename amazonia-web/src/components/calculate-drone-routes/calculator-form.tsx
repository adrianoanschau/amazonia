import {
  Box,
  Typography,
  Divider,
  TextField,
  InputLabel,
  Stack,
  Button,
  Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const options = 'ABCDEFGH'
  .split('')
  .map((x) =>
    '12345678'.split('').map((y) => ({
      label: `${x}${y}`,
    })),
  )
  .flat();

const SelectLocationField = styled(({ label }: { label: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <InputLabel sx={{ flex: 1 }}>{label}</InputLabel>
    <Autocomplete
      disablePortal
      renderInput={(params) => (
        <TextField {...params} size="small" sx={{ maxWidth: 100 }} />
      )}
      options={options}
    />
  </Box>
))();

export function CalculatorForm() {
  return (
    <Box>
      <Typography>Input the coordinates</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Stack sx={{ flex: 3, gap: 1 }}>
          <SelectLocationField label="Drone start" />
          <SelectLocationField label="Object pick-up" />
          <SelectLocationField label="Delivery destination" />
        </Stack>
        <Stack sx={{ flex: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" fullWidth sx={{ lineHeight: 1.3 }}>
            Calculate <br />
            fastest route!
          </Button>
        </Stack>
      </Box>
      <Divider sx={{ my: 2 }} />
      Route description
      <Divider sx={{ my: 2 }} />
      Last 10 routes calculated
    </Box>
  );
}
