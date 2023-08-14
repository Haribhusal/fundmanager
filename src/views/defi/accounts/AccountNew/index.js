import React from 'react'
import AccountForm from '../AccountForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateAccount } from 'services/DefiService'

const AccountNew = () => {
    const navigate = useNavigate()

    const addAccount = async (data) => {
        const response = await apiCreateAccount(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addAccount(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Account successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/defi/account-list')
        }
    }

    const handleDiscard = () => {
        navigate('/defi/account-list')
    }

    return (
        <>
            <AccountForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default AccountNew
