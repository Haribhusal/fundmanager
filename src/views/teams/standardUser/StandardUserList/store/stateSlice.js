import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'standardUsersListActions',
    initialState: {
        deleteConfirmation: false,
        deactiveUserConfirmation: false,
        selectedAccount: {},
        drawerOpen: false,
        sortedColumn: () => { },
        deactivateStatus: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
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
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload
        },
        setDrawerOpen: (state, action) => {
            state.drawerOpen = action.payload
        },
        setDrawerClose: (state, action) => {
            state.drawerOpen = action.payload
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
    setActivateOrDeactivateStatus
} = stateSlice.actions

export default stateSlice.reducer
