import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetContracts(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts',
        method: 'get',
        params,
    })
}

export async function apiCreateContract(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts',
        method: 'post',
        data,
    })
}

export async function apiPutContract(data,id) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts/' + id,
        method: 'put',
        data,
    })
}

export async function apiDeleteContract(data) {
    console.log("data._id",data.id)
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts/' + data.id,
        method: 'delete',
    })
}
