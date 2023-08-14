import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetDefiAccounts(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/defi/v2/accounts',
        method: 'get',
        params,
    })
}

export async function apiGetBalances(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/defi/v2/balances',
        method: 'get',
        params,
    })
}



export async function apiDeleteDefiAccounts(data) {
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

export async function apiGetAccount(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts',
        method: 'get',
        params,
    })
}

export async function apiPutAccount(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts',
        method: 'put',
        data,
    })
}

export async function apiCreateAccount(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts',
        method: 'post',
        data,
    })
}

export async function apiGetDefiTransactions(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/defi/transactions',
        method: 'get',
        params,
    })
}

export async function apiCreateTransactionNote(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/notes',
        method: 'post',
        data,
    })
}

export async function apiPutTransactionNote(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/notes',
        method: 'post',
        data,
    })
}

export async function apiGetDefiProtocols(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/protocols/v2',
        method: 'get',
        params,
    })
}
