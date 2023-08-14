import React, { forwardRef } from 'react'
import { FormContainer, Alert } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import ContactFormEdit from './ContactFormEdit'
import {
    apiContactAddressUniqueData,
    apiContactNameUniqueData,
} from 'services/ValidationServies'
import Web3 from 'web3'

dayjs.extend(customParseFormat)

const isWalletAddressUnique = async (data) => {
    const response = await apiContactAddressUniqueData(data)
    return response.data
}

const isContactNameUnique = async (data) => {
    const response = await apiContactNameUniqueData(data)
    return response?.data
}

function contactValidation(formData) {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Contact Name is required')
            .test(
                'unique_name',
                'Contact name already exists',
                async function (value) {
                    if (formData.current_name === value) return true
                    if (!value) return
                    const response = await isContactNameUnique(value)

                    if (!response.data) {
                        throw new Error(response.data.message)
                    }
                    return response.data.available
                }
            ),

        address: Yup.string()
            .required('Contact Address is required')
            .test('test-w3address', 'The address is not valid', (value) =>
                Web3.utils.isAddress((value || '').toLowerCase())
            )
            .test(
                'w3address',
                'Contact address already exists',
                async function (value) {
                    if (!value) return
                    if (formData.current_address === value) return true
                    const response = await isWalletAddressUnique(value)

                    if (!response.data) {
                        throw new Error(response.data.message)
                    }

                    return response.data.unique
                }
            ),
        chain: Yup.string().required('Chain is required'),
        contact_category: Yup.string().required('Contact category is required'),
        wallet_type: Yup.string().required('Wallet type is required'),
        accepted_assets: Yup.string().required('Accepted address is required'),
    })
    return validationSchema
}

function backToTop() {
    document.getElementById('scrolled').scrollIntoView({
        behavior: 'smooth',
    })
}

const ContactForm = forwardRef((props, ref) => {
    const { contact, onFormSubmit, error } = props

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                name: contact.name || '',
                address: contact.address || '',
                wallet_type: contact.wallet_type || '',
                chain: contact.chain || '',
                color: contact.color || '',
                contact_category: contact.contact_category || '',
                description: contact.description || '',
                accepted_assets: contact.accepted_assets || '',
            }}
            validationSchema={contactValidation({
                current_name: (contact && contact.name) || '',
                current_address: (contact && contact.address) || '',
            })}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
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
                            <ContactFormEdit
                                touched={touched}
                                errors={errors}
                                contact={contact}
                                values={values}
                            />
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default ContactForm
