/**
 * Imports
 */

import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './style.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';

/**
 * Main
 */

const container = document.getElementById('root') as HTMLElement;
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);
