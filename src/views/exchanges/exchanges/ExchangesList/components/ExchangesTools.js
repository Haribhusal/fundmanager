import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ExchangesSearch from './ExchangesSearch'

const ExchangesTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ExchangesSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
                to="/exchanges/new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Exchange
                </Button>
            </Link>
        </div>
    )
}

export default ExchangesTools
