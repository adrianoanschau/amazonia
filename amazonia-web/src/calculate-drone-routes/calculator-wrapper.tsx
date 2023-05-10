import {
  Box,
  Typography,
  Divider,
  Skeleton,
  Chip,
  Stack,
  ListItem,
  List,
} from '@mui/material';
import { ArrowRight, ArrowRightAlt } from '@mui/icons-material';
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { CalculatorForm } from './calculator-form';
import { useCalculatorContext } from './context';

export function CalculatorWrapper() {
  const {
    deliveryTime: { data, loading, error },
  } = useCalculatorContext();

  const lastRoute = useMemo(() => {
    if (!data || !data.length) return null;

    return data[0];
  }, [data]);

  const showPath = useMemo(() => {
    if (!lastRoute) return [];

    return lastRoute.data.path.reduce((result, current, index, original) => {
      if (!original[index + 1]) return result;
      return result.concat(`${current}-${original[index + 1]}`);
    }, [] as string[]);
  }, [lastRoute]);

  return (
    <Box>
      <Typography>Input the coordinates</Typography>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <CalculatorForm />
      <Divider sx={{ my: 2 }} />
      {loading && !error && (
        <Box>
          <Skeleton sx={{ borderRadius: 1, mb: 1 }} />
          <Stack
            sx={{
              gap: 1,
              border: `1px solid`,
              borderColor: 'divider',
              borderRadius: 1,
              p: 1,
            }}
          >
            <Skeleton sx={{ borderRadius: 1 }} />
            <Divider />
            <Skeleton sx={{ borderRadius: 1 }} />
            <Skeleton sx={{ borderRadius: 1 }} />
          </Stack>
        </Box>
      )}
      {!loading && lastRoute && (
        <>
          <Stack gap={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
              <Typography>Calculated route result:</Typography>
              <Chip
                label={`${lastRoute?.params.start_on}-${lastRoute?.params.object_location}`}
                size="small"
                color="info"
              />
              <ArrowRightAlt sx={{ fontSize: 16 }} />
              <Chip
                label={`${lastRoute?.params.object_location}-${lastRoute?.params.delivery_on}`}
                size="small"
                color="info"
              />
            </Box>
            <Stack
              sx={{
                gap: 1,
                border: `1px solid`,
                borderColor: 'divider',
                borderRadius: 1,
                p: 1,
              }}
            >
              <Typography>
                The set delivery will have the following route, and will take
                <Chip
                  label={`${lastRoute?.data.cost.toFixed(2)} seconds`}
                  size="small"
                  color="success"
                />{' '}
                to be delivered as fast as possible.
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 0.8,
                }}
              >
                {showPath.map((value, index) => (
                  <Box
                    key={value}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Chip key={value} label={value} size="small" color="info" />
                    {index < showPath.length - 1 && (
                      <ArrowRight
                        key={value}
                        sx={{
                          position: 'absolute',
                          right: -15,
                          zIndex: 10,
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Stack>
          </Stack>
        </>
      )}

      {data.length > 1 && (
        <Box>
          <Divider sx={{ my: 2 }} />
          <List
            subheader={
              <Typography color="text.secondary">Last deliveries:</Typography>
            }
          >
            <Divider />
            {data.slice(1).map((deliver) => (
              <ListItem key={uuid()} divider sx={{ display: 'flex', gap: 0.4 }}>
                From{' '}
                <Chip
                  label={deliver.params.start_on}
                  size="small"
                  color="info"
                />
                , picking-up at{' '}
                <Chip
                  label={deliver.params.object_location}
                  size="small"
                  color="info"
                />{' '}
                to{' '}
                <Chip
                  label={deliver.params.delivery_on}
                  size="small"
                  color="info"
                />{' '}
                in{' '}
                <Chip
                  label={deliver.data.cost.toFixed(2)}
                  size="small"
                  color="success"
                />{' '}
                seconds
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
