import { Container, Typography } from '@mui/material';
import { OrdersList } from '@src/components/OrdersList';
import OrdersMap from '@src/components/OrdersMap';

export const OrdersPage = () => {
  return (
    <Container>
      <Typography variant='h4' sx={{ my: 2 }}>
        Orders
      </Typography>

      <OrdersMap />
      <OrdersList />
    </Container>
  );
};
