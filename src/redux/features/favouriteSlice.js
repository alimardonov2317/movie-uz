import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const movie = action.payload;
      const movies = state.wishlist.find((item) => item.id === movie.id);
      if (!movies) {
        state.wishlist.push(movie);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    removeWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
