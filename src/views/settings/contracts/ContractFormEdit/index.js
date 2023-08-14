import React, { forwardRef } from 'react'
import { FormContainer, Alert } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import {
    apiContractAddressUniqueData,
    apiContractNameUniqueData,
} from 'services/ValidationServies'
import Web3 from 'web3'
import ContractFormEdit from './ContractFormEdit'

dayjs.extend(customParseFormat)

const isWalletAddressUnique = async (data) => {
    const response = await apiContractAddressUniqueData(data)
    return response.data
}

const isContractNameUnique = async (data) => {
    const response = await apiContractNameUniqueData(data)
    return response?.data
}

function contractValidation(formData) {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Contract name is required')
            .test(
                'unique_name',
                'Contract name already exists',
                async function (value) {
                    if (formData.current_name === value) return true
                    if (!value) return

                    const response = await isContractNameUnique(value)

                    if (!response.data) {
                        throw new Error(response.data.message)
                    }
                    return response.data.available
                }
            ),
        address: Yup.string()
            .required('Contract address is required')
            .test('test-w3address', 'The address is not valid', (value) =>
                Web3.utils.isAddress((value || '').toLowerCase())
            )
            .test(
                'unique_address',
                'Contract address already exists',
                async function (value) {
                    if (!value) return
                    if (formData.current_address === value) return true

                    const response = await isWalletAddressUnique(value)

                    if (!response.data) {
                        throw new Error(response.data.message)
                    }

                    return response.data.available
                }
            ),
        chain: Yup.string().required('Chain is required'),
        contract_type: Yup.string().required('Contract category is required'),
    })
    return validationSchema
}

function backToTop() {
    document.getElementById('scrolled').scrollIntoView({
        behavior: 'smooth',
    })
}

const ContractForm = forwardRef((props, ref) => {
    const { contract, onFormSubmit, error } = props

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: contract.name || '',
                address: contract.address || '',
                chain: contract.chain || '',
                color: contract.color || '',
                contract_type: contract.contract_type || '',
                description: contract.description || '',
            }}
            validationSchema={contractValidation({
                current_name: (contract && contract.name) || '',
                current_address: (contract && contract.address) || '',
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                onFormSubmit?.(values, setSubmitting)
                backToTop()
            }}
        >
            {({ values, touched, errors }) => (
                <Form>
                    <div id="scrolled"></div>
                    <FormContainer>
                        {error && (
                            <Alert
                                className=" top-0 left-0 right-0 mb-4"
                                type="danger"
                                showIcon
                            >
                                {error}
                            </Alert>
                        )}
                        <div className="p-6">
                            <ContractFormEdit
                                touched={touched}
                                errors={errors}
                                values={values}
                            />
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default ContractForm
