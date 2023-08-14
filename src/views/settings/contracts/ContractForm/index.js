import React, { forwardRef, useState } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import Web3 from 'web3'
import {
    apiContractAddressUniqueData,
    apiContractNameUniqueData,
} from 'services/ValidationServies'

const isWalletAddressUnique = async (data) => {
    const response = await apiContractAddressUniqueData(data)
    return response.data
}

const isContractNameUnique = async (data) => {
    const response = await apiContractNameUniqueData(data)
    return response?.data
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Contract name is required')
        .test(
            'unique_contract_name',
            'Contract name already exists',
            async function (value) {
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
            'w3address',
            'Contract address already exists',
            async function (value) {
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



const ContractForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    /**
                     * check if key is empty, and remove empty key.
                     */
                    Object.keys(formData).forEach((key) => {
                        if (!formData[key]) delete formData[key]
                    })
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        type={type}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-end py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => onDiscard?.()}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ContractForm.defaultProps = {
    type: 'Add',
    initialData: {
        name: '',
        address: '',
        chain: '',
        color: '',
        contract_type: '',
        description: '',
    },
}

export default ContractForm
