import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'defiProtocolList/state',
    initialState: {
        drawerOpen: false,
        selectedProtocol: {},
        sortedColumn: () => {},
    },
    reducers: {
        setSelectedProtocol: (state, action) => {
            state.selectedProtocol = action.payload
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
    setSelectedProtocol,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
