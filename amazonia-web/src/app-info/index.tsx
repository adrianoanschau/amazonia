import { Box, Chip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppInfo } from '../services/delivery';
import { Circle } from '@mui/icons-material';

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

  return (
    <Box display="flex" justifyContent="flex-end">
      {data && !loading && !error && (
        <AppInfoLabel
          color="success"
          label={`${data.name} :: ${data.version}`}
        />
      )}
      {loading && !error && (
        <AppInfoLabel color="warning" label={`Loading Service`} />
      )}
      {!loading && !!error && (
        <AppInfoLabel color="error" label={`Service Unavailable`} />
      )}
    </Box>
  );
}
