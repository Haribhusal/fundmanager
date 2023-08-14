import React, { useRef } from 'react'
import { Drawer, Button } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import ContactEditContent from './ContactEditContent'

import { setDrawerClose, setSelectedContact } from '../store/stateSlice'


const DrawerFooter = ({ onSaveClick, onCancel }) => {
    return (
        <div className="text-right w-full" id="scrollable">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}  >
                Save
            </Button>
        </div>
    )
}

const EditContactDialog = () => {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(
        (state) => state.contactList.state.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedContact({}))
    }

    const formikRef = useRef()

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

  

    return (
        <Drawer
            isOpen={drawerOpen}
            title="Edit Contact"
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
            <ContactEditContent ref={formikRef} />
        </Drawer>
    )
}

export default EditContactDialog
