import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteTeamMember, getMembers } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'

const MemberDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.memberList.state.deleteConfirmation
    )
    const selectedMember = useSelector(
        (state) => state.memberList.state.selectedMember
    )
    const tableData = useSelector((state) => state.memberList.data.tableData)

    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        tableData

    const location = useLocation()
    const id = location?.pathname.split('/')[2]

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        await dispatch(toggleDeleteConfirmation(false))
        const success =await deleteTeamMember({
            id: selectedMember,
        })

        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Member successfuly deleted .
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
        dispatch(
            getMembers({
                id,
                pageIndex,
                offset,
                limit,
                sort_column,
                sort_order,
                q,
                total,
            })
        )
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete Member"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>Are you sure you want to delete this team member ?</p>
        </ConfirmDialog>
    )
}

export default MemberDeleteConfirmation
