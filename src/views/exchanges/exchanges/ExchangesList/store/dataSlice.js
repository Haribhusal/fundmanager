import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetExchanges, apiDeteleExchanges, apiSyncStatusAccounts } from 'services/ExchangesServices'

export const getExchanges = createAsyncThunk(
    'exchangesList',
    async (data) => {
        const response = await apiGetExchanges(data)
        return response.data
    }
)

export const deleteAccount = async (data) => {
    const response = await apiDeteleExchanges(data)
    return response.data
}


export const syncStatusAccount = async (data, id) => {
    const response = await apiSyncStatusAccounts(data, id)
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
        exchangesList: [],
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
        [getExchanges.fulfilled]: (state, action) => {
            state.exchangesList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getExchanges.pending]: (state) => {
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
