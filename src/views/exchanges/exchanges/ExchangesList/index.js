import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ExchangesTable from './components/ExchangesTable'
import ExchangesTools from './components/ExchangesTools'

injectReducer('exchanges', reducer)

const AccountList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Exchanges</h3>
                <ExchangesTools />
            </div>
            <ExchangesTable />
        </AdaptableCard>
    )
}

export default AccountList

