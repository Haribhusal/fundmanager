import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiCreateStandardSubUser(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/standard-users/users',
        method: 'post',
        data,
    })
}



export async function apiDeleteStandardSubUser(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/standard-users/users/' + data.id,
        method: 'delete',
    })
}

export async function apiDeactivateStandardSubUserAccount(id, data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/standard-users/users/' + id,
        method: 'put',
        data
    })
}

export async function apiCreateTeam(data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/teams',
        method: 'post',
        data,
    })
}

export async function apiGetTeams(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/teams',
        method: 'get',
        params,
    })
}

export async function apiTeamNameUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/teams/isTeamNameAvailable/' + value,
        method: 'get',
    })
}

export async function apiPutStandardUserNote(id, data) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/' + id,
        method: 'put',
        data,
    })
}



export async function apiGetStandardSubUsers(params) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/standard-users/users',
        method: 'get',
        params,
    })
}
