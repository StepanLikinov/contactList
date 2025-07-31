/**
 * Imports
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact, ContactsState } from '../../types/interfaces';

/**
 * Contacts Slice
 */

const initialState: ContactsState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(
                (c) => c.id !== action.payload,
            );
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            state.contacts = state.contacts.map((contact) =>
                contact.id === action.payload.id ? action.payload : contact,
            );
        },
        clearContacts: (state) => {
            state.contacts = [];
        },
    },
});

export const { addContact, removeContact, updateContact, clearContacts } =
    contactsSlice.actions;
export default contactsSlice.reducer;
