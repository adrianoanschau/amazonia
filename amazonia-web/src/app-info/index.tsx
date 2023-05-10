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
  const theme = useTheme();
  const [{ data, loading, error }] = useAppInfo();
  const { setAvailable, setLoading } = useServiceAvailableContext();

  useEffect(() => {
    setLoading(loading);
    setAvailable(!loading && !error);
  }, [loading, error, setAvailable, setLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
        [theme.breakpoints.up('sm')]: {
          flexDirection: 'row',
          mb: 0,
        },
      }}
    >
      <Box>
        <figure style={{ width: 100, margin: 0 }}>
          <img src="/logo-white.png" style={{ maxWidth: '100%' }} />
        </figure>
      </Box>
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
