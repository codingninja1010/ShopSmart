import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './reducer';

const store = configureStore({
    reducer: rootReducers,
});

// Persist cart to localStorage (keep reducer pure)
try {
    let prev;
    store.subscribe(() => {
        const state = store.getState();
        const cart = state?.handleCart || [];
        if (cart !== prev) {
            prev = cart;
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    });
} catch (_) {
    // ignore storage errors in restricted environments
}

export default store;
