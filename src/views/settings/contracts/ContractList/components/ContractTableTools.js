import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import ContractTableSearch from './ContractTableSearch'
import { Link } from 'react-router-dom'

const ContractTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ContractTableSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
                to="/settings/contracts-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Contract
                </Button>
            </Link>
        </div>
    )
}

export default ContractTableTools
