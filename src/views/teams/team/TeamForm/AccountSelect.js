import React, { useState } from 'react'
import { Button, FormContainer, FormItem, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import AsyncSelect from 'react-select/async'
import { apiGetAccountsList } from 'services/SelectDropDownServices'

const validationSchema = Yup.object().shape({
    account: Yup.string().required('Account is required'),
})

const getDropDownAccounts = async (data) => {
    const response = await apiGetAccountsList(data)
    return response.data
}

const AccountSelect = ({ onUpdate }) => {
    const [selected, setSelected] = useState({})

    const filterAccounts = async (inputValue) => {
        const response = await getDropDownAccounts({
            pageIndex: 1,
            offset: 0,
            limit: 10,
            q: inputValue,
        })

        if (!response.data) {
            return []
        }

        const options =
            response.data &&
            response.data.map((item) => {
                return {
                    label: item.name,
                    value: item._id,
                }
            })

        return options
    }

    const loadOptions = async (inputValue) => {
        return await filterAccounts(inputValue)
    }

    const handleUpdate = (values) => {
        const { label, value } = selected

        const updatedAccount = {
            accounts: {
                label,
                value,
            },
        }
        onUpdate(updatedAccount)
    }

    return (
        <Formik
            initialValues={{
                account: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleUpdate(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="Account"
                            invalid={errors.account && touched.account}
                            errorMessage={errors.account}
                        >
                            <Field name="account">
                                {({ field, form }) => (
                                    <Select
                                        cacheOptions
                                        loadOptions={loadOptions}
                                        placeholder="Type to search"
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option.value
                                            )
                                            setSelected(option)
                                        }}
                                        componentAs={AsyncSelect}
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <FormItem className="mb-0 text-right">
                            <Button block variant="solid" type="submit">
                                Add
                            </Button>
                        </FormItem>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default AccountSelect
