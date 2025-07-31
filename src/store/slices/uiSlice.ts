/**
 * Imports
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../types/interfaces';
import { UIState } from '../../types/interfaces';

/**
 * uiSlice
 */

const initialState: UIState = {
    isSearchModalOpen: false,
    isEditModalOpen: false,
    editableContact: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openEditModal: (state, action: PayloadAction<Contact>) => {
            state.isEditModalOpen = true;
            state.editableContact = action.payload;
        },
        closeEditModal: (state) => {
            state.isEditModalOpen = false;
            state.editableContact = null;
        },
        openSearchModal: (state) => {
            state.isSearchModalOpen = true;
        },
        closeSearchModal: (state) => {
            state.isSearchModalOpen = false;
        },
    },
});

export const {
    openEditModal,
    closeEditModal,
    openSearchModal,
    closeSearchModal,
} = uiSlice.actions;

export default uiSlice.reducer;
