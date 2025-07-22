import { createContext, useState, useEffect, useContext } from 'react';

const LOCAL_STORAGE_KEY = 'contacts';

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
    const [contacts, setContacts] = useState(() => {
        const json = localStorage.getItem(LOCAL_STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    });

    const [editableContact, setEditableContact] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (contact) => {
        setContacts((prev) => [...prev, contact]);
    };

    const removeContact = (id) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };

    const updateContact = (updatedContact) => {
        setContacts((prev) =>
            prev.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact,
            ),
        );
    };

    const clearContacts = () => {
        setContacts([]);
    };

    const openEditModal = (contact) => {
        setEditableContact(contact);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditableContact(null);
        setIsEditModalOpen(false);
    };

    const openSearchModal = () => setIsSearchModalOpen(true);
    const closeSearchModal = () => setIsSearchModalOpen(false);

    return (
        <ContactsContext.Provider
            value={{
                contacts,
                addContact,
                removeContact,
                updateContact,
                clearContacts,
                editableContact,
                isEditModalOpen,
                openEditModal,
                closeEditModal,
                isSearchModalOpen,
                openSearchModal,
                closeSearchModal,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
}

export function useContacts() {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactsProvider');
    }
    return context;
}
