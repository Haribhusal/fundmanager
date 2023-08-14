import React from 'react'
import {
    Input,
    Notification,
    toast,
    FormContainer,
    FormItem,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineCalendar,
    HiOutlineMap,
    HiOutlinePhone,
} from 'react-icons/hi'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    title: Yup.string(),
    avatar: Yup.string(),
    lang: Yup.string(),
    timeZone: Yup.string(),
    syncData: Yup.bool(),
})

const Profile = ({ data }) => {
    let date = new Date(data?.user?.createdAt)
    let formatedDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`

    const onFormSubmit = (values, setSubmitting) => {
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    //the user has no name so in field of name we have passed user role ,  it can be changed or new row can be added as required
    return (
        <Formik
            initialValues={{
                role: data?.user?.role,
                id: data?.user?._id,
                color: data?.user?.color,
                email: data?.user?.email,
                name: data?.user?.name,
                first_name: data?.user?.first_name,
                last_name: data?.user?.last_name,
                address: data?.user?.address,
                contact_number: data?.user?.contact_number,
                description: data?.user?.description,
                tags: data?.user?.tags,
                createdAt: formatedDate,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                console.log(values.tags)
                return (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    name="firstname"
                                    label="First Name"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstname"
                                        value={values.first_name}
                                        placeholder="First name"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="lastname"
                                    label="Last Name"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastname"
                                        value={values.last_name}
                                        placeholder="Last Name"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="role"
                                    label="Role"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="role"
                                        value={values.role}
                                        placeholder="Role"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineUserCircle className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="email"
                                    label="Email"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name={'email'}
                                        value={values.id}
                                        placeholder="Email"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineMail className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="contactnumber"
                                    label="Contact Number"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="contactnumber"
                                        value={values.contact_number}
                                        placeholder="contact number"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlinePhone className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="address"
                                    label="Address"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="address"
                                        value={values.address}
                                        placeholder="address"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineMap className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="createdAt"
                                    label="Created Date"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="created date"
                                        value={values.createdAt}
                                        placeholder="Created Date"
                                        component={Input}
                                        disabled
                                        prefix={
                                            <HiOutlineCalendar className="text-xl" />
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    name="tags"
                                    label="Tags"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        name="tags"
                                        placeholder="tags"
                                        value={values.tags}
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>                    
                            </div>
                            <FormItem
                                    name="description"
                                    label="Description"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="description"
                                        value={values.description}
                                        placeholder="description"
                                        component={Input}
                                        disabled
                                        textArea
                                    />
                                </FormItem>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
