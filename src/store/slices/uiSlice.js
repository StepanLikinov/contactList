import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isEditModalOpen: false,
        isSearchModalOpen: false,
        editableContact: null,
    },
    reducers: {
        openEditModal: (state, action) => {
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
