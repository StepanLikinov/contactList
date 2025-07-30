import EditModal from './components/layout/EditModal';
import Header from './components/layout/Header';
import List from './components/layout/List';
import Search from './components/layout/Search';
import SearchModal from './components/layout/SearchModal';
import { ALPHABET } from './constants/alphabet';

export default function App() {
    return (
        <>
            <Header />
            <Search />
            <List chars={ALPHABET} />
            <EditModal />
            <SearchModal />
        </>
    );
}
