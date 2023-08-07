import { createSlice, Dispatch } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import data from './../../api/dummy.json'

export interface InitState {
  products: Product[];
  message: string | null;
  error: string | null;
  isLoading: boolean;
  isDeleteSuccess: boolean;
  idSelectedDelete: number | undefined;
}

const initialState: InitState = {
  products: data,
  message: null,
  error: null,
  isLoading: true,
  isDeleteSuccess: false,
  idSelectedDelete: undefined,
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductsSuccess: (state, action: PayloadAction<Product>) => {
      state.message = 'Thêm thành công';
      state.products.push(action.payload);
    },
    updateProductSuccess: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      state.products[index] = {...action.payload ,id: state.products[index].id}
      state.message = 'Cập nhật thành công';
    },
    deleteProductSuccess: (state, action: PayloadAction<Product>) => {
      const products = state.products.filter( product => product.id !== action.payload.id )
      state.products = [...products]
      state.message = 'Xóa thành công';
      state.isDeleteSuccess = true;
      state.idSelectedDelete = action.payload.id
    },
    loadingSuccess:  (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError(state, action) {
      state.error = action.payload;
    },
    // CLEAR EVENTS
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer

export function addProduct(product: Product) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productSlice.actions.addProductsSuccess(product));
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function updateProduct(product: Product) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productSlice.actions.updateProductSuccess(product));
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function deleteProduct(product: Product) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productSlice.actions.deleteProductSuccess(product));
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function loading(value: boolean) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(productSlice.actions.loadingSuccess(value));
    } catch (error) {
      dispatch(productSlice.actions.hasError(error));
    }
  };
}

export function clear(field: string) {
  return async (dispatch: Dispatch) => {
    if (field === 'error') {
      dispatch(productSlice.actions.clearError());
    } else {
      dispatch(productSlice.actions.clearMessage());
    }
  };
}