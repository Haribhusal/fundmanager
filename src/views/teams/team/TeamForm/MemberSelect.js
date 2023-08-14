import React, { useState } from 'react'
import { Button, FormContainer, FormItem, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import AsyncSelect from 'react-select/async'
import { apiGetMembersList } from 'services/SelectDropDownServices'

const validationSchema = Yup.object().shape({
    member: Yup.string().required('Member is required'),
})

const getDropDownMembers = async (data) => {
    const response = await apiGetMembersList(data)
    return response.data
}

const MemberSelect = ({ onUpdate }) => {
    const [selected, setSelected] = useState({})

    const filterMembers = async (inputValue) => {
        const response = await getDropDownMembers({
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
        return await filterMembers(inputValue)
    }

    const handleUpdate = (values) => {
        const { label, value } = selected

        const updatedMember = {
            members: {
                label,
                value,
            },
        }
        onUpdate(updatedMember)
    }

    return (
        <Formik
            initialValues={{
                member: '',
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
                            label="Member"
                            invalid={errors.member && touched.member}
                            errorMessage={errors.member}
                        >
                            <Field name="member">
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

export default MemberSelect
