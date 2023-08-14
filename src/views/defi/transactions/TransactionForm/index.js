import React, { forwardRef } from 'react'
import { FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import PersonalInfoForm from './PersonalInfoForm'

const TransactionForm = forwardRef((props, ref) => {
    const { transaction, onFormSubmit } = props

    return (
        <Formik
            innerRef={ref}
            initialValues={{
                id: transaction.note?.id || '',
                note: transaction.note?.note || '',
            }}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>
                        <div className="p-6">
                            <PersonalInfoForm
                                touched={touched}
                                errors={errors}
                            />
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
})

export default TransactionForm
