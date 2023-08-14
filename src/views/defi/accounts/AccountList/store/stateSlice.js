import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'defiAccountList/state',
    initialState: {
        deleteConfirmation: false,
        syncPauseConfirmation: false,
        syncStatus: () => { },
        selectedAccount: '',
        sortedColumn: () => { },
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
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedAccount = action.payload
        },
    },
})

export const {
    toggleDeleteConfirmation,
    toggleSyncPauseConfirmation,
    setSyncStatus,
    setSortedColumn,
    setSelectedProduct,
} = stateSlice.actions

export default stateSlice.reducer
