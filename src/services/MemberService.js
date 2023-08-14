import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiGetMembers(param) {
    const { id, ...params } = param
    return ApiService.fetchData({
        url: apiBaseURL + `/api/teams/${id}/members`,
        method: 'get',
        params,
    })
}

export async function apiDeleteTeamMember(data) {
    return ApiService.fetchData({
        url: apiBaseURL + `/api/teams/members/${data.id}`,
        method: 'delete',
    })
}

export async function apiGetAvailableUsers(param) {
    const { id, ...params } = param
    return ApiService.fetchData({
        url: apiBaseURL + `/api/teams/${id}/available/users`,
        method: 'get',
        params,
    })
}

export async function apiGetTeamDetails(id) {
    return ApiService.fetchData({
        url: apiBaseURL + `/api/teams/${id}`,
        method: 'get',
    })
}

export async function apiCreateTeamMember(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/teams/members',
        method: 'post',
        data,
    })
}
