import React from 'react'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors } = props

    return (
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
    )
}

export default PersonalInfoForm
