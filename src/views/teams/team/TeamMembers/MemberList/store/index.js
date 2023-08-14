import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import data from './dataSlice'
import dataUser from './dataUserSlice'
const reducer = combineReducers({
    state,
    dataUser,
    data,
})

export default reducer
