import { Alert, Button, Chip, Divider, List, ListItem, ListItemText, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { AppDispatch, RootState } from '@src/store';
import { IOrder, OrderStatus, updateOrderStatusAsync } from '@src/store/slices/order/orderSlice';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const OrderItem = ({ _id, orderLocation, orderTime, status, subItems, title, customerName, totalPrice }: IOrder) => {
    const dispatch = useDispatch<AppDispatch>()
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);
    const [loading, setLoading] = useState(false);
    const { error } = useSelector((state: RootState) => state.orders)

    const handleStatusChange = async (newStatus: OrderStatus) => {
        setLoading(true)
        await dispatch(updateOrderStatusAsync({ orderId: _id, status: newStatus }))
        setCurrentStatus(newStatus)
        setLoading(false)
    }

    return (
        <Paper sx={{ p: 2, mb: 2, borderRadius: "10px", boxShadow: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}

            {/* Order Title & Status */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="h6" fontWeight="bold">{title}</Typography>
                <Chip label={currentStatus} color="primary" variant="outlined" sx={{ fontSize: "0.85rem" }} />
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Order Details */}
            <Stack spacing={1} sx={{ mb: 1 }}>
                <Typography variant="body2">📍 <b>Location:</b> {orderLocation.lat}, {orderLocation.lng}</Typography>
                <Typography variant="body2">⏰ <b>Order Time:</b> {new Date(orderTime).toLocaleString()}</Typography>
                {customerName && <Typography variant="body2">👤 <b>Customer:</b> {customerName}</Typography>}
                {totalPrice !== undefined && <Typography variant="body2">💰 <b>Total Price:</b> ${totalPrice.toFixed(2)}</Typography>}
            </Stack>

            <Divider sx={{ my: 1 }} />

            {/* Ordered Items */}
            <Paper variant="outlined" sx={{ p: 1, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>🛒 Ordered Items:</Typography>
                <List dense>
                    {subItems.map((item, index) => (
                        <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
                            <ListItemText primary={item.title} secondary={`Type: ${item.type}`} />
                            <Typography variant="body2" fontWeight="bold">x{item.amount}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Status Selector & Update Button */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                <Select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as OrderStatus)}
                    disabled={loading}
                    size="small"
                    sx={{ minWidth: "180px" }}
                >
                    <MenuItem value={OrderStatus.Received}>{OrderStatus.Received}</MenuItem>
                    <MenuItem value={OrderStatus.Preparing}>{OrderStatus.Preparing}</MenuItem>
                    <MenuItem value={OrderStatus.Ready}>{OrderStatus.Ready}</MenuItem>
                    <MenuItem value={OrderStatus.EnRoute}>{OrderStatus.EnRoute}</MenuItem>
                    <MenuItem value={OrderStatus.Delivered}>{OrderStatus.Delivered}</MenuItem>
                </Select>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleStatusChange(currentStatus)}
                    disabled={loading}
                    sx={{ flexShrink: 0 }}
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </Stack>
        </Paper>
    )
}
