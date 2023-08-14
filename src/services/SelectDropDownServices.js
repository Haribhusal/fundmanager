import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetAccountsList(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts',
        method: 'get',
        params,
    })
}

export async function apiGetMembersList(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/standard-users/users',
        method: 'get',
        params,
    })
}
