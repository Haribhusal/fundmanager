import React, { useRef } from 'react'
import { Button, Drawer } from 'components/ui'
import TransactionEditContent from './TransactionEditContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose, setSelectedTransaction } from '../store/stateSlice'

const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Save
            </Button>
        </div>
    )
}

const TransactionEditDialog = () => {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(
        (state) => state.defiTransactionList.state.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedTransaction({}))
    }

    const formikRef = useRef()

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Drawer
            title="Add/Edit Note"
            isOpen={drawerOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            closable={false}
            bodyClass="p-0"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
        >
            <TransactionEditContent ref={formikRef} />
        </Drawer>
    )
}

export default TransactionEditDialog
