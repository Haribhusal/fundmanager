import React, { useRef } from 'react'
import { Drawer, Button } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import ContractEditContent from './ContractEditContent'

import { setDrawerClose, setSelectedContract } from '../store/stateSlice'


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

const EditContractDialog = () => {
    const dispatch = useDispatch()
    const drawerOpen = useSelector(
        (state) => state.contractList.state.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
        dispatch(setSelectedContract({}))
    }

    const formikRef = useRef()

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Drawer
            isOpen={drawerOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            closable={false}
            bodyClass="p-0"
            title="Edit Contract"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
        >
            <ContractEditContent ref={formikRef} />
        </Drawer>
    )
}

export default EditContractDialog
