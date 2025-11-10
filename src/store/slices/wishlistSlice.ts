import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const loadWishlistFromStorage = (): WishlistItem[] => {
  const saved = localStorage.getItem('wishlist');
  return saved ? JSON.parse(saved) : [];
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
        localStorage.setItem('wishlist', JSON.stringify(state.items));
        toast.success('Added to wishlist');
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
      toast.success('Removed from wishlist');
    },
    toggleWishlist: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
        toast.success('Removed from wishlist');
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
        });
        toast.success('Added to wishlist');
      }

      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
