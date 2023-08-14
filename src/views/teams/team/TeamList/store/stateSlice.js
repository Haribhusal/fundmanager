import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'standardUsersListActions',
    initialState: {
        selectedAccountTeam: '',
        sortedColumnTeam: () => { },
    },
    reducers: {
        setSortedColumn: (state, action) => {
            state.sortedColumnTeam = action.payload
        },
        setSelectedAccount: (state, action) => {
            state.selectedAccountTeam = action.payload
        },
    },
})

export const {
    toggleDeleteConfirmation,
    setSortedColumn,
    toggleDeactiveUserConfirmation,
    setSelectedAccount,
} = stateSlice.actions

export default stateSlice.reducer
