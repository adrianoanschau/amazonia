import {
  Box,
  TextField,
  InputLabel,
  Autocomplete,
  Stack,
  Button,
  Divider,
  Alert,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCalculatorContext } from './context';
import { useServiceAvailableContext } from '../app-info/context';

const options = 'ABCDEFGH'
  .split('')
  .map((x) =>
    '12345678'.split('').map((y) => ({
      label: `${x}${y}`,
    })),
  )
  .flat();

const SelectLocationField = styled(
  ({
    label,
    value,
    onChange,
    disabled,
  }: {
    label: string;
    value: string;
    onChange: (value: string | null) => void;
    disabled: boolean;
  }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <InputLabel sx={{ flex: 1 }}>{label}</InputLabel>
      <Autocomplete
        disablePortal
        value={{ label: value }}
        onChange={(_, newValue) => onChange(newValue?.label ?? null)}
        disabled={disabled}
        renderInput={(params) => (
          <TextField {...params} size="small" sx={{ maxWidth: 100 }} />
        )}
        options={options}
      />
    </Box>
  ),
)();

export function CalculatorForm() {
  const { loading, available } = useServiceAvailableContext();
  const { formData, deliveryTime, setFormData, onSubmit } =
    useCalculatorContext();

  return (
    <Box sx={{ position: 'relative' }}>
      {!loading && !available && (
        <>
          <Alert
            severity="error"
            sx={{ border: '1px solid', borderColor: 'error.light' }}
          >
            Service unavailable
          </Alert>
          <Divider sx={{ my: 2 }} />
        </>
      )}
      {loading && (
        <LinearProgress
          sx={{ position: 'absolute', width: '100%', top: -20 }}
        />
      )}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Stack sx={{ flex: 3, gap: 1 }}>
          <SelectLocationField
            label="Drone start"
            value={formData.droneStart ?? ''}
            onChange={(value) => setFormData('droneStart', value)}
            disabled={!available}
          />
          <SelectLocationField
            label="Object pick-up"
            value={formData.objectPickUp ?? ''}
            onChange={(value) => setFormData('objectPickUp', value)}
            disabled={!available}
          />
          <SelectLocationField
            label="Delivery destination"
            value={formData.deliveryDestination ?? ''}
            onChange={(value) => setFormData('deliveryDestination', value)}
            disabled={!available}
          />
        </Stack>
        <Stack sx={{ flex: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ lineHeight: 1.3 }}
            onClick={() => onSubmit()}
            disabled={!available || deliveryTime.loading}
          >
            Calculate <br />
            fastest route!
            {deliveryTime.loading && (
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
