import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById, fetchCategories, fetchProductsByCategory } from '@/services/api';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  categories: string[];
  selectedCategory: string | null;
  priceRange: [number, number];
  ratingFilter: number;
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest';
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  categories: [],
  selectedCategory: null,
  priceRange: [0, 1000],
  ratingFilter: 0,
  sortBy: 'popularity',
  searchQuery: '',
  loading: false,
  error: null,
  currentProduct: null,
  currentPage: 1,
  itemsPerPage: 12,
};

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  const products = await fetchProducts();
  return products;
});

export const loadCategories = createAsyncThunk('products/loadCategories', async () => {
  const categories = await fetchCategories();
  return categories;
});

export const loadProductsByCategory = createAsyncThunk(
  'products/loadProductsByCategory',
  async (category: string) => {
    const products = await fetchProductsByCategory(category);
    return products;
  }
);

export const loadProductById = createAsyncThunk('products/loadProductById', async (id: string) => {
  const product = await fetchProductById(id);
  return product;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
      applyFilters(state);
    },
    setRatingFilter: (state, action: PayloadAction<number>) => {
      state.ratingFilter = action.payload;
      applyFilters(state);
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.priceRange = [0, 1000];
      state.ratingFilter = 0;
      state.searchQuery = '';
      state.filteredItems = state.items;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(loadProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      });
  },
});

// Helper function to apply all filters
function applyFilters(state: ProductsState) {
  let filtered = [...state.items];

  // Category filter
  if (state.selectedCategory) {
    filtered = filtered.filter((p) => p.category === state.selectedCategory);
  }

  // Price range filter
  filtered = filtered.filter((p) => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]);

  // Rating filter
  if (state.ratingFilter > 0) {
    filtered = filtered.filter((p) => p.rating.rate >= state.ratingFilter);
  }

  // Search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  // Sorting
  switch (state.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'popularity':
      filtered.sort((a, b) => b.rating.count - a.rating.count);
      break;
    case 'newest':
      filtered.sort((a, b) => b.id - a.id);
      break;
  }

  state.filteredItems = filtered;
}

export const { setCategory, setPriceRange, setRatingFilter, setSortBy, setSearchQuery, clearFilters, setCurrentPage } =
  productsSlice.actions;

export default productsSlice.reducer;
