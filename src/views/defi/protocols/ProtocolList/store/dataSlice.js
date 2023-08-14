import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDefiProtocols } from 'services/DefiService'

export const getProtocols = createAsyncThunk(
    'defiProtocolList/data/getProtocols',
    async (data) => {
        const response = await apiGetDefiProtocols(data)
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
    protocolStatus: 0,
}

const dataSlice = createSlice({
    name: 'defiProtocolList/data',
    initialState: {
        loading: false,
        protocolList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateProtocolList: (state, action) => {
            state.protocolList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getProtocols.fulfilled]: (state, action) => {
            state.protocolList = action.payload.protocols
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getProtocols.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateProtocolList,
    setTableData,
    setFilterData,
    setSortedColumn,
} = dataSlice.actions

export default dataSlice.reducer
