import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'defiBalancesList/state',
    initialState: {
        drawerOpen: false,
        selectedBalance: {},
        sortedColumn: () => { },
    },
    reducers: {
        setSelectedBalance: (state, action) => {
            state.selectedBalance = action.payload
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
    setSelectedBalance,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
