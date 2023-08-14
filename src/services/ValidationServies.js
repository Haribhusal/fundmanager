import ApiService from './ApiService'

const apiBaseURL = process.env.REACT_APP_API_URL

export async function apiAccountNameUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/is_account_name_unique/' + value,
        method: 'get',
    })
}

export async function apiWalletAddressUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/is_wallet_address_unique/' + value,
        method: 'get',
    })
}

export async function apiKeyUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/is_api_key_unique/' + value,
        method: 'get',
    })
}

export async function apiSecretKeyUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/is_api_secret_unique/' + value,
        method: 'get',
    })
}

export async function apiCefiProviderUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/accounts/is_cefi_provider_unique/' + value,
        method: 'get',
    })
}

export async function apiEmailUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/users/is_email_unique/' + value,
        method: 'get',
    })
}


export async function apiContactNameUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts/isNameAvailable/' + value,
        method: 'get',
    })
}

export async function apiContactAddressUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contacts/isAddressAvailable/' + value,
        method: 'get',
    })
}


export async function apiContractNameUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts/isNameAvailable/' + value,
        method: 'get',
    })
}

export async function apiContractAddressUniqueData(value) {
    return ApiService.fetchData({
        url: apiBaseURL + '/api/contracts/isAddressAvailable/' + value,
        method: 'get',
    })
}
