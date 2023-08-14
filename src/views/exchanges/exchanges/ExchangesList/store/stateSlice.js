import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'exchangesActions',
    initialState: {
        deleteConfirmation: false,
        deactiveUserConfirmation: false,
        drawerOpen: false,
        sortedColumn: () => { },
        deactivateStatus: false,
        matchingNameandValueStatus: false,
        selectedAccountText: '',
        syncStatus: '',
        selectedAccount: {},
        syncPauseConfirmation: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },

        toggleSyncPauseConfirmation: (state, action) => {
            state.syncPauseConfirmation = action.payload
        },

        setSyncStatus: (state, action) => {
            state.syncStatus = action.payload
        },
        toggleDeactiveUserConfirmation: (state, action) => {
            state.deactiveUserConfirmation = action.payload
        },
        setActivateOrDeactivateStatus: (state, action) => {
            state.deactivateStatus = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },

        setDrawerOpen: (state, action) => {
            state.drawerOpen = action.payload
        },
        setDrawerClose: (state, action) => {
            state.drawerOpen = action.payload
        },
        setSelectedAccountText: (state, action) => {
            state.selectedAccountText = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedAccount = action.payload
        },
    },
})

export const {
    toggleDeleteConfirmation,
    setDrawerOpen,
    setDrawerClose,
    setSortedColumn,
    toggleDeactiveUserConfirmation,
    setSelectedAccount,
    setActivateOrDeactivateStatus,
    setSelectedAccountText,
    toggleSyncPauseConfirmation,
    setSyncStatus,
    setSelectedProduct
} = stateSlice.actions

export default stateSlice.reducer
