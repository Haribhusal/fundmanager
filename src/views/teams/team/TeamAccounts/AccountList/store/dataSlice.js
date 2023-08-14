import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetTeamAccounts } from 'services/TeamAccountService'

export const getTeamAccounts = createAsyncThunk('teamAccountList', async (data) => {
    const response = await apiGetTeamAccounts(data)
    return response.data
})

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
    name: 'teamAccountList',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setTeamAccountList: (state, action) => {
            state.accountList = action.payload
        },
    },
    extraReducers: {
        [getTeamAccounts.fulfilled]: (state, action) => {
            state.accountList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getTeamAccounts.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setTableData, setFilterData, setTeamAccountList } =
    dataSlice.actions

export default dataSlice.reducer
