import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]

const BasicInformationFields = (props) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="Account Name"
                    invalid={errors.name && touched.name}
                    errorMessage={errors.name}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="name"
                        placeholder="Name"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Account Address"
                    invalid={errors.wallet_address && touched.wallet_address}
                    errorMessage={errors.wallet_address}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="wallet_address"
                        placeholder="Address"
                        component={Input}
                    />
                </FormItem>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
