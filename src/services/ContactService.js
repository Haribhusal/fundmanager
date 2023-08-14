import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetContacts(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts',
        method: 'get',
        params,
    })
}

export async function apiCreateContact(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts',
        method: 'post',
        data,
    })
}

export async function apiPutContact(data, id) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts/' + id,
        method: 'put',
        data,
    })
}

export async function apiDeleteContact(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts/' + data.id,
        method: 'delete',
    })
}
