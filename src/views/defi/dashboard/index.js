import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import SalesDashboardHeader from './components/DefiDashboardHeader'
import SalesDashboardBody from './components/DefiDashboardBody'

injectReducer('salesDashboard', reducer)

const DefiDashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <SalesDashboardHeader />
            <SalesDashboardBody />
        </div>
    )
}

export default DefiDashboard
