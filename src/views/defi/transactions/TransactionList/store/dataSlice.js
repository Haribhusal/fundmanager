import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDefiTransactions } from 'services/DefiService'

export const getTransactions = createAsyncThunk(
    'defiTransactionList/data/getTransactions',
    async (data) => {
        const response = await apiGetDefiTransactions(data)
        return response.data
    }
)

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
    transactionStatus: 0,
}

const dataSlice = createSlice({
    name: 'defiTransactionList/data',
    initialState: {
        loading: false,
        transactionList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateTransactionList: (state, action) => {
            state.transactionList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getTransactions.fulfilled]: (state, action) => {
            state.transactionList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getTransactions.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateTransactionList,
    setTableData,
    setFilterData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer
