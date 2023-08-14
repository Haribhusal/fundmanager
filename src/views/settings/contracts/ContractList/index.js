import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ContractTableTools from './components/ContractTableTools'
import ContractTable from './components/ContractTable'

injectReducer('contractList', reducer)

const ContractList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Contracts</h3>
                <ContractTableTools />
            </div>
            <ContractTable />
        </AdaptableCard>
    )
}

export default ContractList
