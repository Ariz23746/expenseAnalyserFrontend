import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  createExpense,
  getExpenseByCategory,
  getExpenses,
} from '../helper/expenseScreen/api';
import {categoryExpenseProps, expenseProps} from '../helper/types';

interface initialStateType {
  loading: boolean;
  categoryExpense: categoryExpenseProps[];
  expenseList: expenseProps[];
  createdExpense: expenseProps | null;
  error: string;
}
const initialState: initialStateType = {
  loading: false,
  categoryExpense: [],
  expenseList: [],
  createdExpense: null,
  error: '',
};

export const getCategoryWiseExpense = createAsyncThunk(
  'expense/fetchExpenseByCategory',
  getExpenseByCategory,
);
export const getAllExpense = createAsyncThunk(
  'expense/getExpenses',
  getExpenses,
);
export const generateExpense = createAsyncThunk(
  'expense/createExpenses',
  createExpense,
);
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpense: (state, action: PayloadAction<expenseProps[]>) => {
      state.expenseList = [...state.expenseList, ...action.payload];
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategoryWiseExpense.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getCategoryWiseExpense.fulfilled,
      (state, action: PayloadAction<categoryExpenseProps[]>) => {
        state.loading = false;
        state.categoryExpense = action.payload;
        state.error = '';
      },
    );
    builder.addCase(getCategoryWiseExpense.rejected, (state, action) => {
      state.loading = false;
      state.categoryExpense = [];
      state.error = action.error.message || '';
    });

    builder.addCase(getAllExpense.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      getAllExpense.fulfilled,
      (state, action: PayloadAction<expenseProps[]>) => {
        state.loading = false;
        state.expenseList = action.payload;
        state.error = '';
      },
    );
    builder.addCase(getAllExpense.rejected, (state, action) => {
      state.loading = false;
      state.expenseList = [];
      state.error = action.error.message || '';
    });
    builder.addCase(generateExpense.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      generateExpense.fulfilled,
      (state, action: PayloadAction<expenseProps>) => {
        state.loading = false;
        state.createdExpense = action.payload;
        state.error = '';
      },
    );
    builder.addCase(generateExpense.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
  },
});

export const {setExpense} = expenseSlice.actions;

export default expenseSlice.reducer;
