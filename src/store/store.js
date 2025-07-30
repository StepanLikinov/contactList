/**
 * Imports
 */

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import contactsReducer from './slices/contactsSlice';
import uiReducer from './slices/uiSlice';

/**
 * Store
 */

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts'],
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
    reducer: {
        contacts: persistedContactsReducer,
        ui: uiReducer,
    },
});

export const persistor = persistStore(store);
export default store;
