import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSnapshots,
} from 'services/SnapshotService'

export const getSnapShots = createAsyncThunk(
    'snapShotList/data/getSnapShots',
    async (data) => {
        const response = await apiGetSnapshots(data)
        // console.log(response.data.snapshots)
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
    accountStatus: 0,
}

const dataSlice = createSlice({
    name: 'snapShotList/data',
    initialState: {
        loading: false,
        snapShotsList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateSnapShotList: (state, action) => {
            state.snapShotsList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
  
    },
    extraReducers: {
        [getSnapShots.fulfilled]: (state, action) => {
            state.snapShotsList = action.payload.snapshots
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getSnapShots.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateSnapShotList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer
