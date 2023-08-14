import React from 'react'
import MemberTableSearch from './MemberTableSearch'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { toggleeAddDialog } from '../store/stateSlice'

const MemberTableTools = () => {
    const dispatch = useDispatch()
    const showDialog = () => {
        dispatch(toggleeAddDialog(true))
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <MemberTableSearch />
            <span
                className="block lg:inline-block md:mb-0 mb-4 md:ml-2"
                onClick={showDialog}
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Team Member
                </Button>
            </span>
        </div>
    )
}

export default MemberTableTools
