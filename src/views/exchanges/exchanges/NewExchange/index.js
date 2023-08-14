import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateExchanges } from 'services/ExchangesServices'
import ExchangesForm from '../ExchangesForm'

const NewExchange = () => {
    const navigate = useNavigate()
    const addStandardSubUser = async (data) => {
        const response = await apiCreateExchanges(data)
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
                    Exchange added successfully
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/exchanges/exchanges')
        }
    }
    const handleDiscard = () => {
        navigate('/exchanges/exchanges')
    }
    return (
        <>
            <ExchangesForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default NewExchange
