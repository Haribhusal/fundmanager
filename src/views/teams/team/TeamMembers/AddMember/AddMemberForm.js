import React from 'react'
import { Field, Form, Formik } from 'formik'
import {
    Button,
    FormContainer,
    FormItem,
    Select,
    Notification,
    toast,
    Tooltip,
} from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import * as Yup from 'yup'
import { apiCreateTeamMember, apiGetAvailableUsers } from 'services/MemberService'
import { toggleeAddDialog } from '../MemberList/store/stateSlice'
import { HiInformationCircle } from 'react-icons/hi'
import { getMembers } from '../MemberList/store/dataSlice'


const getDropDownUsers=async (data)=>{
    const response = await apiGetAvailableUsers(data);
    return response.data
}


function AddMemberForm() {
    const location = useLocation()
    const dispatch = useDispatch()
    const id = location.pathname.split('/')[2]

    const closeDialog = () => {
        dispatch(toggleeAddDialog(false))
    }

    const validationSchema = Yup.object().shape({
        user: Yup.string().required('Name is required'),
    })

   

    const {
        pageIndex,
        offset,
        limit,
        q,
        total,
        sort_column,
        sort_order,
    } = useSelector((state) => state.memberList?.data?.tableData)


    const filterAccounts =async (inputValue) => {
        const response = await getDropDownUsers({
            id,
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
                    value: item.user_id,
                }
            })
        return options
    }

    const loadOptions = async (inputValue) => {
        return await filterAccounts(inputValue)
    }

    const addTeamMember = async (data) => {
        const response = await apiCreateTeamMember(data)
        return response.data
    }

    const handleSubmitting = async (values, setSubmitting) => {
        setSubmitting(true)
        const success = await addTeamMember(values)
        if (success) {
            dispatch(
                getMembers({
                    id,
                    pageIndex,
                    offset,
                    limit,
                    q,
                    total,
                    sort_column,
                    sort_order,
                })
            )
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Member Successfuly Created
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
        closeDialog()
    }

    return (
        <>
            <Formik
                initialValues={{
                    team: id,
                    user: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmitting(values, setSubmitting)
                    setSubmitting(false)
                }}
                validationSchema={validationSchema}
            >
                {({ touched, errors, values }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label={
                                    <>
                                        <span className="mr-2">
                                            Available Users{' '}
                                        </span>
                                        <Tooltip
                                            placement="right-end"
                                            title="Type username to see the available users"
                                        >
                                            <HiInformationCircle className="text-lg cursor-pointer " />
                                        </Tooltip>
                                    </>
                                }
                                invalid={errors.user && touched.user}
                                errorMessage={errors.user}
                            >
                                <Field name="user">
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
        </>
    )
}

export default AddMemberForm
