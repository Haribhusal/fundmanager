import React, { useRef } from 'react'
import { Button, Drawer } from 'components/ui'
import UserNoteEditContent from './UserNoteEditContent'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose, setSelectedAccount } from '../store/stateSlice'

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

const UserNoteEditDialog = () => {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(
        (state) => state.standardUsers.state.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose(false))
        dispatch(setSelectedAccount({}))
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
            bodyClass="p-6"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
        >
            <UserNoteEditContent ref={formikRef} />
        </Drawer>
    )
}

export default UserNoteEditDialog
