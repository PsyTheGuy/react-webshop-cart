import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = `${process.env.REACT_APP_API_URL}`;

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: null,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  return fetch(apiUrl)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemID);
    },
    increaseItemAmount: (state, action) => {
      const itemID = action.payload;
      const item = state.cartItems.find((item) => item.id === itemID);
      item.amount += 1;
    },
    decreaseItemAmount: (state, action) => {
      const itemID = action.payload;
      const item = state.cartItems.find((item) => item.id === itemID);
      item.amount -= 1;
    },
    calculateCartTotal: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += item.price * item.amount;
        amount += item.amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItemAmount,
  decreaseItemAmount,
  calculateCartTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
