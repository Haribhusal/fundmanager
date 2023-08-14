import React, { forwardRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose } from '../store/stateSlice'
import { toast, Notification } from 'components/ui'
import ContactForm from 'views/settings/contacts/ContactFormEdit'
import { getContacts } from '../store/dataSlice'
import { apiPutContact } from 'services/ContactService'

const ContactEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const contact = useSelector(
        (state) => state.contactList.state.selectedContact
    )

    const tableData = useSelector((state) => state.contactList.data.tableData)

    const id = contact?._id

    const updateContact = async (data, id) => {
        const response = await apiPutContact(data, id)
        .then((res) => {
            return {
                success: true,
                data: res.data,
            }
        })
        .catch((err) => {
            return {
                success: false,
                data: err.response,
            }
        })

    return response    }

    const onFormSubmit = async (values) => {
        const {
            name,
            wallet_type,
            address,
            chain,
            color,
            contact_category,
            description,
            accepted_assets,
        } = values

        const basicInfo = {
            name,
            wallet_type,
            address,
            chain,
            color,
            contact_category,
            description,
            accepted_assets,
        }
        const data = await updateContact(basicInfo, id)

        if (data.success) {
            toast.push(
                <Notification
                    title={'Successfuly updated'}
                    type="success"
                    duration={2500}
                >
                    Contact successfuly updated
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }else{
            setError(data.data.data.message)
            return
        }
        dispatch(setDrawerClose())
        dispatch(getContacts(tableData))
    
    }

    return (
        <ContactForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            contact={contact}
            type="edit"
            error={error}
        />
    )
})

export default ContactEditContent
