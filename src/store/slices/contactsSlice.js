import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter(
                (c) => c.id !== action.payload,
            );
        },
        updateContact: (state, action) => {
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
