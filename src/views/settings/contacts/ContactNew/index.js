import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import ContactForm from 'views/settings/contacts/ContactForm'
import { apiCreateContact } from 'services/ContactService'

const ContactNew = () => {
    const navigate = useNavigate()

    const addContact = async (data) => {
        const response = await apiCreateContact(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addContact(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Contact successfuly created
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/settings/contacts')
        }
    }

    const handleDiscard = () => {
        navigate('/settings/contacts-new')
    }

    return (
        <>
            <ContactForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ContactNew
