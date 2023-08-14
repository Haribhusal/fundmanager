import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'memberList/state',
    initialState: {
        selectedMember: {},
        sortedColumn: () => {},
        deleteConfirmation: false,
        addDialog: false,
    },
    reducers: {
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedMember: (state, action) => {
            state.selectedMember = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        toggleeAddDialog: (state, action) => {
            state.addDialog = action.payload
        },
        setDialogClose: (state) => {
            state.addDialog = false
        },
    },
})

export const {
    setSortedColumn,
    setSelectedMember,
    toggleDeleteConfirmation,
    toggleeAddDialog,
    setDialogClose
} = stateSlice.actions

export default stateSlice.reducer
