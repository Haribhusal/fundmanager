import { createServer } from 'miragejs'
import appConfig from 'configs/app.config'

import { signInUserData } from './data/authData'

import { authFakeApi, projectFakeApi, accountFakeApi, salesFakeApi } from './fakeApi'

import {
    projectDashboardData,
} from './data/projectData'

import {
    productsData,
    ordersData,
    orderDetailsData,
    salesDashboardData,
} from './data/salesData'

import {
    settingData,
    settingIntergrationData,
    settingBillingData,
    invoiceData,
    logData,
    accountFormData,
} from './data/accountData'

const { apiPrefix } = appConfig

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                projectDashboardData,
                settingData,
                settingIntergrationData,
                settingBillingData,
                invoiceData,
                productsData,
                ordersData,
                orderDetailsData,
                salesDashboardData,
                logData,
                accountFormData
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                let isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            projectFakeApi(this, apiPrefix)
            salesFakeApi(this, apiPrefix)
            accountFakeApi(this, apiPrefix)
        },
    })
}
