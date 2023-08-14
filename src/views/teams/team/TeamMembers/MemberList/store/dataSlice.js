import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteTeamMember,
    apiGetMembers,
    apiGetTeamDetails,
} from 'services/MemberService'

export const getMembers = createAsyncThunk(
    'memberList',
    async (data) => {
        const response = await apiGetMembers(data)
        return response.data
    }
)

export const getTeamDetails=
createAsyncThunk(
    'teamDetails',
    async (data) => {
        const response = await apiGetTeamDetails(data)
        return response.data
    }
)

export const deleteTeamMember = async (data) => {
    const response = await apiDeleteTeamMember(data)
    return response
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



const dataSlice = createSlice({
    name: 'memberList',
    initialState: {
        loading: false,
        memberList: [],
        tableData: initialTableData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setMemberList: (state, action) => {
            state.memberList = action.payload
        },
      
    },
    extraReducers: {
        [getMembers.fulfilled]: (state, action) => {
            state.memberList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getMembers.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setTableData, setFilterData, setMemberList,setAvailableUserList } = dataSlice.actions

export default dataSlice.reducer
