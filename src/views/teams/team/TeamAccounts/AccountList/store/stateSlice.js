import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'teamAccountList/state',
    initialState: {
        selectedAccount: {},
        sortedColumn: () => {},
    },
    reducers: {
        setSortedColumn: (state, action) => {
            state.sortedColumn = action.payload
        },
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload
        },
    },
})

export const { setSortedColumn, setSelectedAccount } = stateSlice.actions

export default stateSlice.reducer
