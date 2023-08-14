import React, { forwardRef } from 'react'
import { FormContainer, Button, FormItem, Input } from 'components/ui'
import { StickyFooter } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { apiTeamNameUniqueData } from 'services/StandardSubUserService'
import OtherFields from './OtherFields'

const isTeamNameUnique = async (data) => {
    const response = await apiTeamNameUniqueData(data)
    return response.data
}

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .test('unique_name', 'Name already exists', async function (value) {
            if (!value) return
            const response = await isTeamNameUnique(value)

            if (!response.data) {
                throw new Error(response.data.message)
            }

            return response.data.available
        }),
})

const TeamForm = forwardRef((props, ref) => {
    const { initialData, onFormSubmit, onDiscard } = props

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    members: initialData?.members
                        ? initialData.members.map((value) => ({
                              label: value.name,
                              value: value._id,
                          }))
                        : [],
                    accounts: initialData?.accounts
                        ? initialData.accounts.map((value) => ({
                              label: value.name,
                              value: value._id,
                              address: value.wallet_address,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const {
                        name,
                        accounts = [],
                        members = [],
                    } = cloneDeep(values) || {}
                    const newAccountArray = accounts.map((item) => item.value)
                    const newMemberArray = members.map((item) => item.value)

                    const finalObject = {
                        name,
                        accounts: newAccountArray,
                        members: newMemberArray,
                    }

                    onFormSubmit?.(finalObject, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Team Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Team Name"
                                    component={Input}
                                />
                            </FormItem>

                            <OtherFields
                                touched={touched}
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
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

TeamForm.defaultProps = {
    type: 'new',
    initialData: {
        name: '',
        members: [],
        accounts: [],
    },
}

export default TeamForm
