import axios from 'axios'
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { auth, provider } from '../firebase'
import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

// NOTE: We need to use firebase for login and signup processes

export async function apiSignIn(data) {
    return signInWithEmailAndPassword(auth, data.userName, data.password)
}

export async function apiSignInWithGoogle() {
    return signInWithPopup(auth, provider)
}

export async function apiGetUserHFM(data, config = {}) {
    return axios.get(apiBaseURL + `/api/auth/get`, {
        ...config,
        params: { email: data.email },
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return signOut(auth)
    // return ApiService.fetchData({
    //     url: '/sign-out',
    //     method: 'post',
    //     data,
    // })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
