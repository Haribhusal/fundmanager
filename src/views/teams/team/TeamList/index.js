import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import TeamTable from './components/TeamTable'
import TeamTableTools from './components/TeamTableTools'

injectReducer('team', reducer)

const AccountList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Teams</h3>
                <TeamTableTools />
            </div>
            <TeamTable />
        </AdaptableCard>
    )
}

export default AccountList

