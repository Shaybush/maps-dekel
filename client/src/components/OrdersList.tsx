import { Alert, Box, LinearProgress, List, Pagination, Paper, Typography } from '@mui/material';
import { OrderItem } from './OrderItem';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/store';
import { useEffect, useState } from 'react';
import { fetchOrdersAsync, setPage } from '@src/store/slices/order/orderSlice';
import { SortFilter } from './SortFilter';

export const OrdersList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.orders);

  const [sortBy, setSortBy] = useState('_id');

  useEffect(() => {
    dispatch(fetchOrdersAsync({ page: currentPage, sortBy }));
    const interval = setInterval(() => {
      dispatch(fetchOrdersAsync({ page: currentPage, sortBy }));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage, sortBy]);

  const handlePaginationsPage = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h5' fontWeight='bold' sx={{ mb: 2 }}>
        Active Orders
      </Typography>

      {/* Sorting Dropdown */}
      <Box sx={{ mb: 2 }}>
        <SortFilter onSortChange={setSortBy} sortBy={sortBy} />
      </Box>

      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : !orders || orders.length === 0 ? (
        <Typography>No active orders.</Typography>
      ) : (
        <>
          <Paper
            variant='outlined'
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              maxHeight: '70vh',
              p: 1,
              borderRadius: '8px',
            }}
          >
            <List>
              {orders.map((order) => (
                <OrderItem key={order._id} {...order} />
              ))}
            </List>
          </Paper>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => handlePaginationsPage(page)}
            sx={{ mt: 2, alignSelf: 'center' }}
          />
        </>
      )}
    </Paper>
  );
};
