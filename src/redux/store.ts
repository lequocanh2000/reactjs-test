import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
export const useDispatch = () => useAppDispatch<AppDispatch>();