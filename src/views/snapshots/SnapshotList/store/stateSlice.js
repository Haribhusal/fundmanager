import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'snapShotList/state',
    initialState: {
        editConfirmation:false,
        selectedSnapShot: {},
        sortedColumn: () => {},
        drawerOpen: false,
    },
    reducers: {
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedSnapShot: (state, action) => {
            state.selectedSnapShot = action.payload
        },

        setDrawerOpen: (state) => {
            state.drawerOpen = true
        },
        setDrawerClose: (state) => {
            state.drawerOpen = false
        },
        toggleEditConfirmation:(state,action)=>{
            state.editConfirmation=action.payload
        }

    
    },
})

export const {
    setSortedColumn,
    setSelectedSnapShot,
    toggleEditConfirmation,
    setDrawerOpen,
    setDrawerClose,
} = stateSlice.actions

export default stateSlice.reducer
