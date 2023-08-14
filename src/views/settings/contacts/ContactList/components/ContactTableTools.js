import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import ContactTableSearch from './ContactTableSearch'
import { Link } from 'react-router-dom'

const ContactTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ContactTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
                to="/settings/contacts-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Contact
                </Button>
            </Link>
        </div>
    )
}

export default ContactTableTools
