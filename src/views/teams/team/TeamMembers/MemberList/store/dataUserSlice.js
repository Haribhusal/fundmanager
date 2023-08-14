import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAvailableUsers } from 'services/MemberService'

export const getAvailableUsers = createAsyncThunk(
    'getAvailableUsersList',
    async (data) => {
        const response = await apiGetAvailableUsers(data)
        return response.data
    }
)


export const initialTableData = {
    total: 0,
    pageIndex: 1,
    offset: 0,
    limit: 10,
    q: '',
}

const dataUserSlice = createSlice({
    name: 'availableUserDropdownList',
    initialState: {
        loading: false,
        availableUserList: [],
        tableData: initialTableData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setAvailableUserList: (state, action) => {
            state.availableUserList = action.payload
        },
    },
    extraReducers: {
        [getAvailableUsers.fulfilled]: (state, action) => {
            state.availableUserList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getAvailableUsers.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setTableData, setFilterData, setAvailableUserList } =
    dataUserSlice.actions

export default dataUserSlice.reducer
