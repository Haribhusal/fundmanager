import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSyncPauseConfirmation } from '../store/stateSlice'
import { getAccounts, syncStatusAccount } from '../store/dataSlice'

const AccountSyncStausConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.defiAccountList.state.syncPauseConfirmation
    )
    const selectedAccount = useSelector(
        (state) => state.defiAccountList.state.selectedAccount
    )
    const tableData = useSelector(
        (state) => state.defiAccountList.data.tableData
    )
    const syncStatus = useSelector(
        (state) => state.defiAccountList.state.syncStatus
    )

    const onDialogClose = () => {
        dispatch(toggleSyncPauseConfirmation(false))
    }

    const onChangeStatus = async () => {
        dispatch(toggleSyncPauseConfirmation(false))
        const success = await syncStatusAccount({ status: !syncStatus.status }, selectedAccount)

        if (success) {
            dispatch(getAccounts(tableData))
            toast.push(
                <Notification
                    title={`Successfuly ${ syncStatus.status ? 'Paused' : 'Resumed' }`}
                    type="success"
                    duration={2500}
                >
                    Account sync successfuly { syncStatus.status ? 'paused' : 'resumed' }
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
            type="warning"
            title={ syncStatus.status ? 'Pause sync' : 'Resume sync' }
            onCancel={onDialogClose}
            onConfirm={onChangeStatus}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to { syncStatus.status ? 'pause sync' : 'resume sync' } for this account?
            </p>
        </ConfirmDialog>
    )
}

export default AccountSyncStausConfirmation
