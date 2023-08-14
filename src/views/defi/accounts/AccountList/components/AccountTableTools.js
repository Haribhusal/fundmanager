import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import AccountTableSearch from './AccountTableSearch'
import { Link } from 'react-router-dom'

const AccountTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <AccountTableSearch />
            <Link
                className="block lg:inline-block lg:mb-0 mb-4 lg:ml-2"
                to="/defi/account-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Account
                </Button>
            </Link>
        </div>
    )
}

export default AccountTableTools
