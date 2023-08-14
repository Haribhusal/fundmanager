import React from 'react'
import TeamForm from '../../team/TeamForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateTeam } from 'services/StandardSubUserService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addTeam = async (data) => {
        const response = await apiCreateTeam(data)
        return response.data
    }
    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addTeam(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    New team added successfully
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/teams')
        }
    }
    const handleDiscard = () => {
        navigate('/teams')
    }
    return (
        <>
            <TeamForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
