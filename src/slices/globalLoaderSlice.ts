import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type initialStateProps = {
  isVisible: boolean;
};
const initialState: initialStateProps = {
  isVisible: false,
};

export const globalLoaderSlice = createSlice({
  name: 'globalLoader',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const {toggleLoader} = globalLoaderSlice.actions;
export default globalLoaderSlice.reducer;
