import React, { forwardRef } from 'react'
import { Input, FormContainer, FormItem } from 'components/ui'
import { Field, Form, Formik } from 'formik'

const NoteEditForm = forwardRef((props, ref) => {
    const { user, onFormSubmit } = props
    return (
        <Formik
            innerRef={ref}

            initialValues={{
                note: user.notes || '',
            }}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>
                    <FormContainer>

                        <FormItem
                            label="Note"
                            invalid={errors.note && touched.note}
                            errorMessage={errors.note}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="note"
                                placeholder="Enter note"
                                component={Input}
                                textArea
                            />
                        </FormItem>
                    </FormContainer>

                </Form>
            )}
        </Formik>
    )
})

export default NoteEditForm
