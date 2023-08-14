import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteAccount, getAccounts } from '../store/dataSlice'

const AccountDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.defiAccountList.state.deleteConfirmation
    )
    const selectedAccount = useSelector(
        (state) => state.defiAccountList.state.selectedAccount
    )
    const tableData = useSelector(
        (state) => state.defiAccountList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteAccount({ id: selectedAccount })

        if (success) {
            dispatch(getAccounts(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Account successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete account"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this account? All record related
                to this account will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default AccountDeleteConfirmation
