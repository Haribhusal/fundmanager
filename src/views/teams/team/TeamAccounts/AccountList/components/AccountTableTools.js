import React from 'react'
import AccountTableSearch from './AccountTableSearch'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'

const AccountTableTools = () => {
  

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <AccountTableSearch />
            <span
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Team Account
                </Button>
            </span>
        </div>
    )
}

export default AccountTableTools
