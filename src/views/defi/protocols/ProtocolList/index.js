import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ProtocolTable from './components/ProtocolTable'
import ProtocolTableTools from './components/ProtocolTableTools'

injectReducer('defiProtocolList', reducer)

const ProtocolList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Protocols</h3>
                <ProtocolTableTools />
            </div>
            <ProtocolTable />
        </AdaptableCard>
    )
}

export default ProtocolList
