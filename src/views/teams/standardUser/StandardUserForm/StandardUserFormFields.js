import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { ChromePicker } from 'react-color'
import CreatableSelect from 'react-select/creatable'
import { tags } from 'constants/standardSubUserConstants'
import { IoIosColorPalette } from 'react-icons/io'



function ColorPicker({ field, form }) {
    const { name, value } = field
    const { setFieldValue } = form
    const [color, setColor] = useState('#000000')
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleColorChange = (color) => {
        setFieldValue(name, color.hex)
        setColor(color.hex)
    }

    const toggleColorPicker = () => {
        setDisplayColorPicker(!displayColorPicker)
    }

    return (
        <div className='relative'>
            <div>
                <input
                    autoComplete="off"
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onClick={toggleColorPicker}
                    readOnly
                    className="pl-8 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                />
                <div className="input-suffix-start">
                    <IoIosColorPalette className="text-xl" color={color} />
                </div>
            </div>

            {displayColorPicker ? (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                        }}
                        onClick={toggleColorPicker}
                    />
                    <ChromePicker
                        color={color}
                        onChange={(e) => handleColorChange(e)}
                    />
                </div>
            ) : null}
        </div>
    )
}


const StandardUserFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>User Informations</h5>
            <p className="mb-6">Enter new user details</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <FormItem
                    label="First Name"
                    invalid={errors.first_name && touched.first_name}
                    errorMessage={errors.first_name}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="first_name"
                        placeholder="First Name"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Last Name"
                    invalid={errors.last_name && touched.last_name}
                    errorMessage={errors.last_name}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="last_name"
                        placeholder="Last Name"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Email"
                    invalid={errors.email && touched.email}
                    errorMessage={errors.email}
                    asterisk
                >
                    <Field
                        type="email"
                        autoComplete="off"
                        name="email"
                        placeholder="Email"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Contact Number"
                    invalid={errors.contact_number && touched.contact_number}
                    errorMessage={errors.contact_number}
                    asterisk
                >
                    <Field
                        type="tel"
                        autoComplete="off"
                        name="contact_number"
                        placeholder="Contact Number"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Address"
                    invalid={errors.address && touched.address}
                    errorMessage={errors.address}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="address"
                        placeholder="Address"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Tags"
                    invalid={errors.tags && touched.tags}
                    errorMessage={errors.tags}
                >
                    <Field name="tags">
                        {({ field, form }) => (
                            <Select
                                componentAs={CreatableSelect}
                                isMulti
                                field={field}
                                form={form}
                                options={tags}
                                value={values.tags}
                                onChange={(option) =>
                                    form.setFieldValue(field.name, option)
                                }
                            />
                        )}
                    </Field>
                </FormItem>

                <FormItem label="Color" invalid={errors.color && touched.color}
                    errorMessage={errors.color}>

                    <Field
                        type="text"
                        autoComplete="off"
                        name="color"
                        placeholder="Color"
                        value={values.color}
                        component={ColorPicker}

                    />
                </FormItem>





            </div>

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


        </AdaptableCard>
    )
}

export default StandardUserFields
