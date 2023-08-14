import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { apiEmailUniqueData } from 'services/ValidationServies'
import ExchangesFormFields from './ExchangesFormFields'


const isEmailUnique = async (data) => {
    const response = await apiEmailUniqueData(data)
    return response.data
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    cefi_account_provider: Yup.string().required('Cefi account provider is required'),
    api_key: Yup.string().required('API key is required'),
    api_secret: Yup.string().required('API secret is required'),
    category: Yup.string(),
    description: Yup.string(),
    type: Yup.string(),
})


const convertToString = (arr) => {
    return arr.map((item) => item.value).join(',')
}


const ExchangesForm = forwardRef((props, ref) => {
    const { initialData, onFormSubmit, exchanges, onDiscard } = props
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
                            <ExchangesFormFields
                                touched={touched}
                                errors={errors}
                                values={values}
                            />

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

ExchangesForm.defaultProps = {
    type: 'new',
    initialData: {
        name: '',
        cefi_account_provider: '',
        api_key: '',
        api_secret: '',
        category: '',
        description: '',
        type: '',
        account_type: 'cefi',
        tags: [],
    },
}

export default ExchangesForm
