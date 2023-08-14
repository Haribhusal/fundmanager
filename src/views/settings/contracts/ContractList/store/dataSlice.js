import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteContract,
    apiGetContracts,
} from 'services/ContractService'

export const getContracts = createAsyncThunk(
    'contractList/data/getContracts',
    async (data) => {
        const response = await apiGetContracts(data)
        return response.data
    }
)

export const deleteContract = async (data) => {
    const response = await apiDeleteContract(data)
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
    name: 'contractList/data',
    initialState: {
        loading: false,
        contracts: [],
        contractList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateContractList: (state, action) => {
            state.contracts = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setContractList: (state, action) => {
            state.contractList = action.payload
        },
    },
    extraReducers: {
        [getContracts.fulfilled]: (state, action) => {
            state.contracts = action.payload.data
            state.contractList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getContracts.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateContractList,
    setTableData,
    setFilterData,
    setContractList,
} = dataSlice.actions

export default dataSlice.reducer
