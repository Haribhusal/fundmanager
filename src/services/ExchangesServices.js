import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetExchanges(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/exchange/accounts',
        method: 'get',
        params,
    })
}

export async function apiCreateExchanges(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts',
        method: 'post',
        data,
    })
}

export async function apiDeteleExchanges(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/' + data.id,
        method: 'delete',
    })
}

export async function apiSyncStatusAccounts(data, id) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/' + id,
        method: 'put',
        data,
    })
}
