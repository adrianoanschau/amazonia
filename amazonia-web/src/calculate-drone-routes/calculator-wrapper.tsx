import { Box, Typography, Divider, Skeleton, Chip, Stack } from '@mui/material';
import { CalculatorForm } from './calculator-form';
import { useCalculatorContext } from './context';
import { useMemo } from 'react';

export function CalculatorWrapper() {
  const {
    deliveryTime: { data, loading, error },
  } = useCalculatorContext();

  const showPath = useMemo(() => {
    if (!data) return [];

    return data.path.reduce((result, current, index, original) => {
      if (!original[index + 1]) return result;
      return result.concat(`${current}-${original[index + 1]}`);
    }, [] as string[]);
  }, [data]);

  console.log(showPath);

  return (
    <Box>
      <Typography>Input the coordinates</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <CalculatorForm />
      <Divider sx={{ my: 2 }} />
      {loading && !error && (
        <Box>
          <Skeleton sx={{ borderRadius: 1 }} />
          <Skeleton sx={{ borderRadius: 1 }} />
          <Skeleton sx={{ borderRadius: 1 }} />
        </Box>
      )}
      <Stack gap={1}>
        <Typography sx={{ textAlign: 'justify' }}>
          The set delivery will have the route
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {showPath.map((value) => (
            <Chip key={value} label={value} size="small" color="info" />
          ))}
        </Box>
        <Typography sx={{ textAlign: 'justify' }}>
          and will take <Chip label={data?.cost} size="small" color="success" />{' '}
          seconds to be delivered as fast as possible.
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ maxHeight: 120, overflowY: 'auto' }}>
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
        <Skeleton sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
}
