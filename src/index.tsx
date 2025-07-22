import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import { ContactsProvider } from './context/ContactsContext';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(
    <ContactsProvider>
        <App />
    </ContactsProvider>,
);
