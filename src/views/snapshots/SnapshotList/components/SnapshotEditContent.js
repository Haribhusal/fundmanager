import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSnapShots } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import { toast, Notification } from 'components/ui'
import isEmpty from 'lodash/isEmpty'
import { apiCreateSnapshotNote, apiPutSnapshotNote } from 'services/SnapshotService'
import SnapshotForm from 'views/snapshots/SnapshotForm'


const TransactionEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.snapShotList.data.tableData)

    const addNote = async (data) => {
        const response = await apiCreateSnapshotNote(data)
        return response.data
    }

    const updateNote = async (data) => {
        const response = await apiPutSnapshotNote(data)
        return response.data
    }

    const transaction = useSelector(
        (state) => state.snapShotList.state.selectedSnapShot
    )

    const { _id } = transaction

    const onFormSubmit = async (values) => {
        const { id, note } = values

        let newData = {
            entity_id: _id,
            note: note,
            type: 'snapshot',
        }
        if (!isEmpty(newData)) {
            if (id) {
                const success = await updateNote(newData)
                if (success) {
                    toast.push(
                        <Notification
                            title={'Successfuly updated'}
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
            } else {
                const success = await addNote(newData)
                if (success) {
                    toast.push(
                        <Notification
                            title={'Successfuly added'}
                            type="success"
                            duration={2500}
                        >
                            Note successfuly added
                        </Notification>,
                        {
                            placement: 'top-center',
                        }
                    )
                }
            }
        }
        dispatch(setDrawerClose())
        dispatch(
            getSnapShots({
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
        <SnapshotForm 
            ref={ref}
            onFormSubmit={onFormSubmit}
            transaction={transaction}
        />
    )
})

export default TransactionEditContent
