import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBalances } from 'services/DefiService'

export const getBalances = createAsyncThunk(
    'defiBalancesList/data/getBalances',
    async (data) => {
        const response = await apiGetBalances(data)
        console.log('balance data', response.data)
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



const dataSlice = createSlice({
    name: 'defiBalancesList/data',
    initialState: {
        loading: false,
        balancesList: [],
        tableData: initialTableData,
    },
    reducers: {
        updateBalancesList: (state, action) => {
            state.balancesList = action.payload.data.balance
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },

    },
    extraReducers: {
        [getBalances.fulfilled]: (state, action) => {
            state.balancesList = action.payload.data.balance
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getBalances.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateBalancesList,
    setTableData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer


