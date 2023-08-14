import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ContactTableTools from './components/ContactTableTools'
import ContactTable from './components/ContactTable'

injectReducer('contactList', reducer)

const ContactList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Contacts</h3>
                <ContactTableTools />
            </div>
            <ContactTable />
        </AdaptableCard>
    )
}

export default ContactList
