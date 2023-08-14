import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStandardSubUsers } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import { toast, Notification } from 'components/ui'
import isEmpty from 'lodash/isEmpty'
import {
    apiPutStandardUserNote,
} from 'services/StandardSubUserService'
import NoteEditForm from '../../../standardUser/StandardUserForm/NoteEditForm'

const UserNoteEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q } =
        useSelector((state) => state.standardUsers.data.tableData)

    const user = useSelector(
        (state) => state.standardUsers.state.selectedAccount
    )
    const { _id } = user
    const updateNote = async (data) => {
        const response = await apiPutStandardUserNote(_id, data)
        return response.data
    }
    const onFormSubmit = async (values) => {
        const { note } = values

        let newData = {
            notes: note
        }

        if (!isEmpty(newData)) {
            const success = await updateNote(newData)
            if (success) {
                toast.push(
                    <Notification
                        title={'Successfuly Updated'}
                        type="success"
                        duration={2500}
                    >
                        Note successfuly updated
                    </Notification>,
                    {
                        placement: 'top-center',
                    }
                )
            }

        }
        dispatch(setDrawerClose())
        dispatch(
            getStandardSubUsers({
                pageIndex,
                offset,
                limit,
                sort_column,
                sort_order,
                q,
            })
        )
    }

    return (
        <NoteEditForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            user={user}
        />
    )
})

export default UserNoteEditContent
