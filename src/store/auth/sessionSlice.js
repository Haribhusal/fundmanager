import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        refreshToken: '',
        expirationTime: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.expirationTime = action.payload.expirationTime
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
            state.refreshToken = ''
            state.expirationTime = ''
        },
        setToken: (state, action) => {
            state.token = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.expirationTime = action.payload.expirationTime
        },
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken } =
    sessionSlice.actions

export default sessionSlice.reducer
