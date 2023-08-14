import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import BalancesTable from './components/BalancesTable'
import BalancesTableTools from './components/BalancesTableTools'

injectReducer('defiBalancesList', reducer)

const ProtocolList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Balances</h3>
                <BalancesTableTools />
            </div>
            <BalancesTable />
        </AdaptableCard>
    )
}

export default ProtocolList
