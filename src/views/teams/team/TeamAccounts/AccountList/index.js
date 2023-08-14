import React from 'react'
import { injectReducer } from 'store/index'
import {  useLocation } from 'react-router-dom'
import reducer from './store'
import AccountTableTools from './components/AccountTableTools'
import AccountTable from './components/AccountTable'

injectReducer('teamAccountList', reducer)


function TeamAccountList() {
    const location = useLocation()

    const id = location.pathname.split('/')[2]

    return (
        <div>
            <div className="lg:flex items-center justify-end mb-4 mt-2">
                <AccountTableTools />
            </div>

            <div className="xl:flex gap-4 mt-2">
                <div className="w-full">
                    <AccountTable id={id} />
                </div>
            </div>
        </div>
    )
}

export default TeamAccountList
