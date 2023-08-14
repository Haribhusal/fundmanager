import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiDeleteContact,
    apiGetContacts,
    apiPutContact,
} from 'services/ContactService'

export const getContacts = createAsyncThunk(
    'contactList/data/getContacts',
    async (data) => {
        const response = await apiGetContacts(data)
        // console.log(response.data)
        return response.data
    }
)

export const updateContacts = createAsyncThunk(
    'contactList/data/updateContacts',
    async (data) => {
        const response = await apiPutContact(data)
        return response.data
    }
)

export const deleteContact = async (data) => {
    const response = await apiDeleteContact(data)
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
    name: 'contactList/data',
    initialState: {
        loading: false,
        contacts: [],
        contactList: [],
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        updateContactList: (state, action) => {
            state.contacts = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setContactList: (state, action) => {
            state.contactList = action.payload
        },
    },
    extraReducers: {
        [getContacts.fulfilled]: (state, action) => {
            state.contacts = action.payload.data
            state.contactList = action.payload.data
            state.tableData.total = action.payload.pagination.total
            state.loading = false
        },
        [getContacts.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateContactList,
    setTableData,
    setFilterData,
    setContactList,
} = dataSlice.actions

export default dataSlice.reducer
