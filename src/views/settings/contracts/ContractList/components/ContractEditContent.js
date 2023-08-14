import React, { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDrawerClose } from '../store/stateSlice'

import ContractForm from 'views/settings/contracts/ContractFormEdit'
import { getContracts } from '../store/dataSlice'
import { toast, Notification } from 'components/ui'
import { apiPutContract } from 'services/ContractService'

const ContractEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const contract = useSelector(
        (state) => state.contractList.state.selectedContract
    )
    const tableData = useSelector((state) => state.contractList.data.tableData)

    const id = contract?._id

    const updateContract = async (data, id) => {
        const response = await apiPutContract(data, id)
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

        return response
    }

    const onFormSubmit = async (values) => {
        const { name, address, chain, color, contract_type, description } =
            values

        const basicInfo = {
            name,
            address,
            chain,
            color,
            contract_type,
            description,
        }
        const data = await updateContract(basicInfo, id)
        if (data.success) {
            toast.push(
                <Notification
                    title={'Successfuly updated'}
                    type="success"
                    duration={2500}
                >
                    Contract successfuly updated
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            dispatch(setDrawerClose())
        } else {
            setError(data.data.data.message)
            return
        }
        dispatch(getContracts(tableData))
    }

    return (
        <ContractForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            contract={contract}
            type="edit"
            error={error}
        />
    )
})

export default ContractEditContent
