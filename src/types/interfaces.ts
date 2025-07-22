/**
 * Imports
 */

import { ReactNode, ChangeEvent } from 'react';

/**
 * Interfaces
 */

interface Contact {
    id: string;
    name: string;
    vacancy: string;
    phone: string;
}

interface ValidationResult {
    valid: boolean;
    message?: string;
}

interface ContactsContextType {
    contacts: Contact[];
    addContact: (contact: Contact) => void;
    removeContact: (id: string) => void;
    updateContact: (updatedContact: Contact) => void;
    clearContacts: () => void;
    editableContact: Contact | null;
    isEditModalOpen: boolean;
    openEditModal: (contact: Contact) => void;
    closeEditModal: () => void;
    isSearchModalOpen: boolean;
    openSearchModal: () => void;
    closeSearchModal: () => void;
}

interface ContactsProviderProps {
    children: ReactNode;
}

interface ContactCardProps {
    contact: Contact;
}

interface ErrorProps {
    visible: boolean;
}

interface LabeledInputProps {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface LetterGroupProps {
    letter: string;
    count: number;
    children: ReactNode;
}

interface SearchButtonProps {
    classExtraName: string;
    label: string;
    onClick: () => void;
}

interface SearchInputProps {
    classExtraName: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
}

interface FormData {
    name: string;
    vacancy: string;
    phone: string;
}

type EditableFormData = FormData & { id: string };

interface Placeholders {
    name: string;
    vacancy: string;
    phone: string;
}

interface ListProps {
    chars: string;
    countMap: Record<string, number>;
}

interface Errors {
    name: string;
    vacancy: string;
    phone: string;
}

/**
 * Exports
 */

export {
    Contact,
    ValidationResult,
    ContactsContextType,
    ContactsProviderProps,
    ContactCardProps,
    ErrorProps,
    LabeledInputProps,
    LetterGroupProps,
    SearchButtonProps,
    SearchInputProps,
    FormData,
    EditableFormData,
    Placeholders,
    ListProps,
    Errors,
};
