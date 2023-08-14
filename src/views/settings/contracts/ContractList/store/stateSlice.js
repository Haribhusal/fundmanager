import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'contractList/state',
    initialState: {
        deleteConfirmation: false,

        selectedContract: {},
        sortedColumn: () => {},
        drawerOpen: false,
        deleteDrawerOpen: false,

        editContractDetailDialog: false,
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
     
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedContract: (state, action) => {
            state.selectedContract = action.payload
        },

        openEditContractDetailDialog: (state) => {
            state.editContractDetailDialog = true
        },
        closeEditContractDetailDialog: (state) => {
            state.editContractDetailDialog = false
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

    setSortedColumn,
    setSelectedContract,

    openEditContractDetailDialog,
    closeEditContractDetailDialog,

    setDrawerOpen,
    setDrawerClose,

    setDeleteDrawerOpen,
    setDeleteDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
