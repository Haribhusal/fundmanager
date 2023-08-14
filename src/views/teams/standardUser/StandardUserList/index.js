import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import AccountTableTools from './components/StandardUserTools'
import StandardUsersTable from './components/StandardUserTable'

injectReducer('standardUsers', reducer)

const AccountList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Users</h3>
                <AccountTableTools />
            </div>
            <StandardUsersTable />
        </AdaptableCard>
    )
}

export default AccountList

