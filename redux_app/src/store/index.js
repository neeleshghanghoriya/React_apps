import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-store';
import counterSlice from './counter-store';

const store = configureStore({
    reducer:{counter:counterSlice.reducer,
    auth:authSlice.reducer
}
});

export const counterActions = counterSlice.actions; 

export default store;


