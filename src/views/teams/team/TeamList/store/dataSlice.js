import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetTeams, apiGetStandardSubUsers } from 'services/StandardSubUserService'

export const getTeamData = createAsyncThunk(
    'getTeamDataAsyncThunk',
    async (data) => {
        const response = await apiGetTeams(data)
        return response.data
    }
)


export const getUsers = createAsyncThunk(
    'getUsersAsyncProcess',
    async (data) => {
        const response = await apiGetStandardSubUsers(data)
        return response.data
    }
)

// export const deleteAccount = async (data) => {
//     const response = await apiDeleteStandardSubUser(data)
//     return response.data
// }

// export const deactivateAccount = async (id, status) => {
//     const response = await apiDeactivateStandardSubUserAccount(id, status)
//     return response.data
// }
export const initialTableData = {
    total: 0,
    pageIndex: 1,
    offset: 0,
    limit: 10,
    q: '',
    sort_column: '',
    sort_order: '',
}


const dataSlice = createSlice({
    name: 'standardUsers',
    initialState: {
        loading: false,
        teamList: [],
        tableDataTeam: initialTableData,
    },
    reducers: {

        setTableDataTeam: (state, action) => {
            state.tableDataTeam = action.payload
        },

    },
    extraReducers: {
        [getTeamData.fulfilled]: (state, action) => {
            state.teamList = action.payload.data
            state.tableDataTeam.total = action.payload.pagination.total
            state.loading = false
        },
        [getTeamData.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    setTableDataTeam,
} = dataSlice.actions

export default dataSlice.reducer
