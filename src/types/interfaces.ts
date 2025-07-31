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

interface ContactsState {
    contacts: Contact[];
}

interface UIState {
    isSearchModalOpen: boolean;
    isEditModalOpen: boolean;
    editableContact: Contact | null;
}

interface ValidationResult {
    valid: boolean;
    message?: string;
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
    ContactsState,
    UIState,
    ValidationResult,
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
