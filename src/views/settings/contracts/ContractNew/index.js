import React from 'react'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import ContractForm from 'views/settings/contracts/ContractForm'
import { apiCreateContract } from 'services/ContractService'

const ContractNew = () => {
    const navigate = useNavigate()

    const addContract = async (data) => {
        const response = await apiCreateContract(data)
        console.log("contract response",{response})
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        console.log("hello here ")
        const success = await addContract(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Contract successfuly created
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/settings/contracts')
        }
    }

    const handleDiscard = () => {
        navigate('/settings/contracts-new')
    }

    return (
        <>
            <ContractForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ContractNew
