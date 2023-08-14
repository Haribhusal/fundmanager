import React, { forwardRef } from 'react'
import { FormContainer, Button } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import StandardUserFields from './StandardUserFormFields'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { apiEmailUniqueData } from '../../../../services/ValidationServies'


const isEmailUnique = async (data) => {
    const response = await apiEmailUniqueData(data)
    return response.data
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


const validationSchema = Yup.object().shape({
    role: Yup.string(),
    address: Yup.string(),
    note: Yup.string(),
    color: Yup.string(),
    contact_number: Yup.string().required('Contact Number is required').matches(phoneRegExp, "Contact number is not valid"
    ),
    description: Yup.string(),
    email: Yup.string()
        .required('Email is required')
        .test(
            'unique_email',
            'Email already exists',
            async function (value) {
                if (!value) return;
                const response = await isEmailUnique(value)

                if (!response.data) {
                    throw new Error(response.data.message)
                }
                return response.data.unique
            }
        ),

    first_name: Yup.string().required('First Name is required').max(25).min(2).matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
    ,
    last_name: Yup.string().required('Last Name is required').max(25).min(2).matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
    ,
})


const convertToString = (arr) => {
    return arr.map((item) => item.value).join(',')
}


const StandardUserForm = forwardRef((props, ref) => {
    const { initialData, onFormSubmit, user, onDiscard } = props
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
                            <StandardUserFields
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

StandardUserForm.defaultProps = {
    type: 'new',
    initialData: {
        account_type: 'standard',
        role: 'user',
        address: '',
        color: '',
        note: '',
        contact_number: '',
        description: '',
        email: '',
        first_name: '',
        last_name: '',
        tags: [],
    },
}

export default StandardUserForm
