import React from 'react'
import StandardUserForm from '../../standardUser/StandardUserForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateStandardSubUser } from '../../../../services/StandardSubUserService'

const NewStandardUser = () => {
    const navigate = useNavigate()
    const addStandardSubUser = async (data) => {
        const response = await apiCreateStandardSubUser(data)
        return response.data
    }
    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addStandardSubUser(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    User added successfully
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/standard-users')
        }
    }
    const handleDiscard = () => {
        navigate('/standard-users')
    }
    return (
        <>
            <StandardUserForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default NewStandardUser
