import EditModal from './components/layout/EditModal';
import Header from './components/layout/Header';
import List from './components/layout/List';
import Search from './components/layout/Search';
import SearchModal from './components/layout/SearchModal';
import { ALPHABET } from './constants/alphabet';
import { useContacts } from './context/ContactsContext';
import { getCountByLetter } from './lib/helpers';

export default function App() {
    const { contacts } = useContacts();
    const countMap = getCountByLetter(contacts);

    return (
        <>
            <Header />
            <Search />
            <List chars={ALPHABET} countMap={countMap} />
            <EditModal />
            <SearchModal />
        </>
    );
}
