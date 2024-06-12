import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {ReportsProps, Budget} from '../helper/types';
import {
  fetchBudgets,
  fetchReports,
} from '../helper/TransactionHistoryScreen/api';

interface initialStateType {
  loading: boolean;
  reports: ReportsProps[];
  budgets: Budget[];
  error: string;
}
const initialState: initialStateType = {
  loading: false,
  reports: [],
  budgets: [],
  error: '',
};

export const getReports = createAsyncThunk(
  'reports/fetchReports',
  fetchReports,
);
export const getBudgets = createAsyncThunk(
  'budgets/fetchBudgets',
  fetchBudgets,
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getReports.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getReports.fulfilled,
      (state, action: PayloadAction<ReportsProps[]>) => {
        state.loading = false;
        state.reports = action.payload;
        state.error = '';
      },
    );
    builder.addCase(getReports.rejected, (state, action) => {
      state.loading = false;
      state.reports = [];
      state.error = action.error.message || '';
    });
    builder.addCase(getBudgets.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getBudgets.fulfilled,
      (state, action: PayloadAction<Budget[]>) => {
        state.loading = false;
        state.budgets = action.payload;
        state.error = '';
      },
    );
    builder.addCase(getBudgets.rejected, (state, action) => {
      state.loading = false;
      state.budgets = [];
      state.error = action.error.message || '';
    });
  },
});

export default reportSlice.reducer;
