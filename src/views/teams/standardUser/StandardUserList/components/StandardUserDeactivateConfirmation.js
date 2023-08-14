import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeactiveUserConfirmation } from '../store/stateSlice'
import { deactivateAccount, getStandardSubUsers } from '../store/dataSlice'

const StandardUserDeactivateConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.standardUsers.state.deactiveUserConfirmation
    )
    const selectedAccount = useSelector(
        (state) => state.standardUsers.state.selectedAccount
    )
    const tableData = useSelector(
        (state) => state.standardUsers.data.tableData
    )


    const deactivateStatusSync = useSelector(
        (state) => state.standardUsers.state.deactivateStatus
    )


    const onDialogClose = () => {
        dispatch(toggleDeactiveUserConfirmation(false))
    }

    const onDeactivate = async () => {

        const statusValue = {
            status: selectedAccount.status === true ? 0 : 1
        }
        dispatch(toggleDeactiveUserConfirmation(false))

        const success = await deactivateAccount(selectedAccount._id, statusValue)

        if (success) {
            dispatch(getStandardSubUsers(tableData))
            toast.push(
                <Notification
                    title={`Successfuly ${statusValue.status === 1 ? 'Activated' : 'Deactivated'}`}
                    type="success"
                    duration={2500}
                >
                    Standard user {statusValue.status === 1 ? 'Activated' : 'Deactivated'} successfully
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
            title={deactivateStatusSync.status ? 'Deactivate User? ' : 'Activate User'}
            onCancel={onDialogClose}
            onConfirm={onDeactivate}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to {deactivateStatusSync.status ? 'deactivate' : 'activate'} this user?
            </p>
        </ConfirmDialog>
    )
}

export default StandardUserDeactivateConfirmation
