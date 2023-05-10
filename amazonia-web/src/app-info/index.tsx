import { Box, Chip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppInfo } from '../services/delivery';
import { Circle } from '@mui/icons-material';
import { useServiceAvailableContext } from './context';
import { useEffect } from 'react';

const AppInfoLabel = styled(
  ({
    color,
    label,
  }: {
    color: 'success' | 'warning' | 'error';
    label: string;
  }) => {
    const { palette } = useTheme();

    return (
      <Chip
        icon={<Circle color={color} />}
        label={label}
        sx={{ bgcolor: palette.grey[500] }}
      />
    );
  },
)();

export function AppInfo() {
  const [{ data, loading, error }] = useAppInfo();
  const { setAvailable, setLoading } = useServiceAvailableContext();

  useEffect(() => {
    setLoading(loading);
    setAvailable(!loading && !error);
  }, [loading, error, setAvailable, setLoading]);

  return (
    <Box display="flex" justifyContent="flex-end">
      {data && !loading && !error && (
        <AppInfoLabel
          color="success"
          label={`${data.name} :: ${data.version}`}
        />
      )}
      {loading && !error && (
        <AppInfoLabel color="warning" label={`Service is Loading`} />
      )}
      {!loading && !!error && (
        <AppInfoLabel color="error" label={`Service Unavailable`} />
      )}
    </Box>
  );
}
