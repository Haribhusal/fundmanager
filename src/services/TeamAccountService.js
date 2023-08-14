import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL


export async function apiGetTeamAccounts(param) {
    const { id, ...params } = param
    return ApiService.fetchData({
        url: apiBaseURL + `/api/teams/${id}/accounts`,
        method: 'get',
        params,
    })
}