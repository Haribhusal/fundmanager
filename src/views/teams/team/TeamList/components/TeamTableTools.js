import React from 'react'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import StandardSubUserSearch from './TeamSearch'
import { Link } from 'react-router-dom'

const TeamTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <StandardSubUserSearch />
            <Link
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
                to="/new-team"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Team
                </Button>
            </Link>
        </div>
    )
}

export default TeamTableTools
