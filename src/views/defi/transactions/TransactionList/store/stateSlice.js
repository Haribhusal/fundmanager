import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'defiTransactionList/state',
    initialState: {
        drawerOpen: false,
        selectedTransaction: {},
        sortedColumn: () => { },
    },
    reducers: {
        setSelectedTransaction: (state, action) => {
            state.selectedTransaction = action.payload
        },
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
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
    setSortedColumn,
    setSelectedTransaction,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
