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
    apiContactAddressUniqueData,
    apiContactNameUniqueData,
} from 'services/ValidationServies'
import OtherFields from './OtherField'

const isContactAddressUnique = async (data) => {
    const response = await apiContactAddressUniqueData(data)
    return response.data
}

const isContactNameUnique = async (data) => {
    const response = await apiContactNameUniqueData(data)
    return response.data
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Contact name is required')
        .test(
            'unique__contact_name',
            'Contact name already exists',
            async function (value) {
                if (!value) return
                const response = await isContactNameUnique(value)

                if (!response.data) {
                    throw new Error(response.data.message)
                }

                return response.data.available
            }
        ),
    address: Yup.string()
        .required('Contact address is required')
        .test('test-w3address', 'The address is not valid', (value) =>
            Web3.utils.isAddress((value || '').toLowerCase())
        )
        .test('w3address', 'Contact address already exists', async function (
            value
        ) {
            const response = await isContactAddressUnique(value)

            if (!response.data) {
                throw new Error(response.data.message)
            }

            return response.data.available
        }),
    chain: Yup.string().required('Chain is required'),
    contact_category: Yup.string().required('Contact category is required'),
    wallet_type: Yup.string().required('Wallet type is required'),
    accepted_assets: Yup.string().required('Accepted assets is required'),
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
                title="Delete contacts"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this contact? All record
                    related to this contacts will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ContactForm = forwardRef((props, ref) => {
    const { type, initialData, onFormSubmit, onDiscard, onDelete } = props

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

ContactForm.defaultProps = {
    type: 'Add',
    initialData: {
        name: '',
        address: '',
        wallet_type: '',
        contact_category: '',
        accepted_assets: '',
        chain: '',
        description: '',
        color: '',
    },
}

export default ContactForm
