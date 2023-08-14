import React from 'react'
import { Dialog } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { setDialogClose } from '../store/stateSlice'
import AddMemberForm from '../../AddMember/AddMemberForm'

const AddUserDialog = () => {
    const dispatch = useDispatch()

    const onDialogClose = () => {
        dispatch(setDialogClose())
    }

    const dialogOpen = useSelector((state) => state.memberList.state.addDialog)

    return (
        <Dialog
            isOpen={dialogOpen}
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
            closable={true}
            width={400}
            title="Add Member"
        >
            <h5 className="mb-4">Add Member </h5>
            <AddMemberForm/>
        </Dialog>
    )
}

export default AddUserDialog
