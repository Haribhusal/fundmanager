import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import SnapshotTable from './components/SnapshotTable'

injectReducer('snapShotList', reducer)

const ContractList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Snapshots</h3>
            </div>
            <SnapshotTable />
        </AdaptableCard>
    )
}

export default ContractList
