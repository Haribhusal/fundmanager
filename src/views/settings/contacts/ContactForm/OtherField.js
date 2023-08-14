import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

const OtherFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <FormItem
                        label="Description"
                        invalid={errors.description && touched.description}
                        errorMessage={errors.description}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="description"
                            placeholder="Enter Description"
                            component={Input}
                            textArea
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OtherFields
