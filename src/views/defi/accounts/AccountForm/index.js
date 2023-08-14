import React, { forwardRef, useState } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import OtherFields from './OtherFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import Web3 from 'web3'
import { apiAccountNameUniqueData, apiWalletAddressUniqueData } from 'services/ValidationServies'

const isWalletAddressUnique = async (data) => {
    const response = await apiWalletAddressUniqueData(data)
    return response.data
}

const isAccountNameUnique = async (data) => {
    const response = await apiAccountNameUniqueData(data)
    return response.data
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Account Name is required')
        .test(
            'unique_name',
            'Account name already exists',
            async function (value) {
                if(!value) return;
                const response = await isAccountNameUnique(value)

                if (!response.data) {
                    throw new Error(response.data.message)
                }

                return response.data.unique
            }
        ),
    wallet_address: Yup.string()
        .required('Account Address is required')
        .test('test-w3address', 'The address is not valid', (value) =>
            Web3.utils.isAddress((value || '').toLowerCase())
        )
        .test(
            'w3address',
            'Wallet address already exists',
            async function (value) {
                if(!value) return;
                const response = await isWalletAddressUnique(value)

                if (!response.data) {
                    throw new Error(response.data.message)
                }

                return response.data.unique
            }
        ),
})

const DeleteProductButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Delete account"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this account? All record
                    related to this account will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const convertToString = (arr) => {
    return arr.map((item) => item.value).join(',')
}

const AccountForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = convertToString(formData.tags)

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
                                    />
                                    <OtherFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>
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

AccountForm.defaultProps = {
    type: 'edit',
    initialData: {
        id: '',
        account_color: '',
        account_type: 'defi',
        category: '',
        description: '',
        name: '',
        tags: [],
        type: '',
        wallet_address: '',
    },
}

export default AccountForm
