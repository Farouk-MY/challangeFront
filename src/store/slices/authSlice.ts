import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
}

const loadAuthFromStorage = () => {
  const user = localStorage.getItem('user');
  const orders = localStorage.getItem('orders');
  return {
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!user,
    orders: orders ? JSON.parse(orders) : [],
  };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      const newUser = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.user = newUser;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === action.payload.email) {
          state.user = user;
          state.isAuthenticated = true;
          toast.success('Logged in successfully!');
          return;
        }
      }
      toast.error('Invalid credentials');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
        toast.success('Profile updated');
      }
    },
    addOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'date'>>) => {
      const newOrder: Order = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },
  },
});

export const { register, login, logout, updateProfile, addOrder } = authSlice.actions;
export default authSlice.reducer;
