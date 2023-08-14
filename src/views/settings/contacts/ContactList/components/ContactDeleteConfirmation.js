import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteContact, getContacts } from '../store/dataSlice'

const ContactDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.contactList.state.deleteConfirmation
    )
    const selectedContact = useSelector(
        (state) => state.contactList.state.selectedContact
    )
    const tableData = useSelector((state) => state.contactList.data.tableData)

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteContact({
            id: selectedContact,
        })

        if (success) {
            dispatch(getContacts(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Contact successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } else {
            console.log(success)
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete contact"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <>
                <p>
                    Are you sure you want to delete this contact?
                </p>
            </>
        </ConfirmDialog>
    )
}

export default ContactDeleteConfirmation
