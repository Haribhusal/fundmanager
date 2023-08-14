import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import TransactionTable from './components/TransactionTable'
import TransactionTableTools from './components/TransactionTableTools'

injectReducer('defiTransactionList', reducer)

const TransactionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Transactions</h3>
                <TransactionTableTools />
            </div>
            <TransactionTable />
        </AdaptableCard>
    )
}

export default TransactionList
