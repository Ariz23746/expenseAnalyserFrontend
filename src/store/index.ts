import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import globalLoaderSlice from '../slices/globalLoaderSlice';
import expenseSlice from '../slices/expenseSlice';
import reportsSlice from '../slices/reportsSlice';
import Reactotron from '../../ReactotronConfig';

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    globalLoader: globalLoaderSlice,
    expense: expenseSlice,
    report: reportsSlice,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(Reactotron.createEnhancer!()),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
