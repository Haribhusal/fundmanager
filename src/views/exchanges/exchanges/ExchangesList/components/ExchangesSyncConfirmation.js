import React from 'react'
import { toast, Notification } from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSyncPauseConfirmation } from '../store/stateSlice'
import { syncStatusAccount, getExchanges } from '../store/dataSlice'
import { ConfirmDialog } from 'components/shared'

const ExchangesSyncConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.exchanges.state.syncPauseConfirmation
    )

    const selectedAccount = useSelector(
        (state) => state.exchanges.state.selectedAccount
    )

    const tableData = useSelector(
        (state) => state.exchanges.data.tableData
    )


    const syncStatus = useSelector(
        (state) => state.exchanges.state.syncStatus
    )

    const onDialogClose = () => {
        dispatch(toggleSyncPauseConfirmation(false))


    }

    const onChangeStatus = async () => {




        const statusValue = {
            status: selectedAccount.status === true ? false : true
        }

        dispatch(toggleSyncPauseConfirmation(false))


        const success = await syncStatusAccount(statusValue, selectedAccount._id)
        if (success) {
            dispatch(getExchanges(tableData))
            toast.push(
                <Notification
                    title={`Successfuly ${syncStatus.status === 1 ? 'Paused' : 'Resumed'}`}
                    type="success"
                    duration={2500}
                >
                    Exchange {statusValue.status === 1 ? 'Paused' : 'Resumed'} successfully
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
            title={syncStatus.status ? 'Pause sync' : 'Resume sync'}
            onCancel={onDialogClose}
            onConfirm={onChangeStatus}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to {syncStatus.status ? 'pause sync' : 'resume sync'} for this account?
            </p>
        </ConfirmDialog>
    )
}

export default ExchangesSyncConfirmation