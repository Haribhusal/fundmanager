import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetStandardSubUsers, apiDeleteStandardSubUser, apiDeactivateStandardSubUserAccount } from 'services/StandardSubUserService'

export const getStandardSubUsers = createAsyncThunk(
    'standardUserList',
    async (data) => {
        const response = await apiGetStandardSubUsers(data)
        return response.data
    }
)

export const deleteAccount = async (data) => {
    const response = await apiDeleteStandardSubUser(data)
    return response.data
}

export const deactivateAccount = async (id, status) => {
    const response = await apiDeactivateStandardSubUserAccount(id, status)
    return response.data
}
export const initialTableData = {
    total: 0,
    pageIndex: 1,
    offset: 0,
    limit: 10,
    q: '',
    sort_column: '',
    sort_order: '',
}

export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    accountStatus: 0,
}

const dataSlice = createSlice({
    name: 'standardUsers',
    initialState: {
        loading: false,
        standardUserList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateAccountList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getStandardSubUsers.fulfilled]: (state, action) => {
            state.standardUserList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getStandardSubUsers.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateAccountList,
    setTableData,
    setFilterData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer
