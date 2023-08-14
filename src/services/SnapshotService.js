import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetSnapshots(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/snapshots',
        method: 'get',
        params,
    })
}

export async function apiCreateSnapshotNote(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/notes',
        method: 'post',
        data,
    })
}

export async function apiPutSnapshotNote(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/notes',
        method: 'post',
        data,
    })
}