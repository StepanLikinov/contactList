/**
 * Imports
 */

import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import {
    Contact,
    ContactsContextType,
    ContactsProviderProps,
} from '../types/interfaces';

/**
 * Context
 */

const LOCAL_STORAGE_KEY = 'contacts';

const ContactsContext = createContext<ContactsContextType | undefined>(
    undefined,
);

export function ContactsProvider({ children }: ContactsProviderProps) {
    const [contacts, setContacts] = useState<Contact[]>(() => {
        const json = localStorage.getItem(LOCAL_STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    });

    const [editableContact, setEditableContact] = useState<Contact | null>(
        null,
    );
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (contact: Contact) => {
        setContacts((prev) => [...prev, contact]);
    };

    const removeContact = (id: string) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };

    const updateContact = (updatedContact: Contact) => {
        setContacts((prev) =>
            prev.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact,
            ),
        );
    };

    const clearContacts = (): void => {
        setContacts([]);
    };

    const openEditModal = (contact: Contact): void => {
        setEditableContact(contact);
        setIsEditModalOpen(true);
    };

    const closeEditModal = (): void => {
        setEditableContact(null);
        setIsEditModalOpen(false);
    };

    const openSearchModal = (): void => setIsSearchModalOpen(true);
    const closeSearchModal = (): void => setIsSearchModalOpen(false);

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

export function useContacts(): ContactsContextType {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useContacts must be used within a ContactsProvider');
    }
    return context;
}
