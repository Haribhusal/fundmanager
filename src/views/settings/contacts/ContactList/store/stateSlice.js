import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'contactList/state',
    initialState: {
        deleteConfirmation: false,

        contactEditModal: false,
        selectedContact: {},
        sortedColumn: () => {},
        drawerOpen: false,
        deleteDrawerOpen: false,

        editContactDetailDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        toggleContactEditModal: (state, action) => {
            console.log(action.payload)
            state.contactEditModal = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedContact: (state, action) => {
            state.selectedContact = action.payload
        },

        openEditContactDetailDialog: (state) => {
            state.editContactDetailDialog = true
        },
        closeEditContactDetailDialog: (state) => {
            state.editContactDetailDialog = false
        },

        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
    },
})

export const {
    toggleDeleteConfirmation,

    toggleContactEditModal,
    setSortedColumn,
    setSelectedContact,

    openEditContactDetailDialog,
    closeEditContactDetailDialog,

    setDrawerOpen,
    setDrawerClose,

    setDeleteDrawerOpen,
    setDeleteDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
