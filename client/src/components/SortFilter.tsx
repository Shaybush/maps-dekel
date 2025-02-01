import { Box, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface ISortFilterProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const SortFilter = ({ sortBy, onSortChange }: ISortFilterProps) => {
  const handleSortChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    onSortChange(value);
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={(e) => handleSortChange(e)} label='Sort by'>
          <MenuItem value='_id'>Order Id</MenuItem>
          <MenuItem value='orderTime'>Order Time</MenuItem>
          <MenuItem value='customerName'>Customer Name</MenuItem>
          <MenuItem value='totalPrice'>Total Price</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
