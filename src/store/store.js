/**
 * Imports
 */

import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import uiReducer from './slices/uiSlice';

/**
 * Store
 */

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        ui: uiReducer,
    },
});

export default store;
