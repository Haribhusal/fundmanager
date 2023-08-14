import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import CreatableSelect from 'react-select/creatable'
import { Field } from 'formik'
import { ChromePicker } from 'react-color'
import { accountCategories, accountTypes } from 'constants/defi.constant'
import { IoIosColorPalette } from 'react-icons/io'

export const tags = [
    { label: 'Trading', value: 'trading' },
    { label: 'Skating', value: 'skating' },
    { label: 'Tomb', value: 'tomb' },
]

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
        <div>
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
                <div className="input-suffix-start mt-4">
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

const OtherFields = (props) => {
    const { values, touched, errors } = props

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            {/* <h5>Others</h5>
            <p className="mb-6">Section to config the product attribute</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Category"
                        invalid={errors.category && touched.category}
                        errorMessage={errors.category}
                    >
                        <Field name="category">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={accountCategories}
                                    value={accountCategories.filter(
                                        (category) =>
                                            category.value === values.category
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Type"
                        invalid={errors.type && touched.type}
                        errorMessage={errors.type}
                    >
                        <Field name="type">
                            {({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={accountTypes}
                                    value={accountTypes.filter(
                                        (type) => type.value === values.type
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
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
                </div>
                <div className="col-span-1">
                    <FormItem label="Color">
                        <Field
                            type="text"
                            autoComplete="off"
                            name="account_color"
                            placeholder="Color"
                            value={values.account_color}
                            component={ColorPicker}
                        />
                    </FormItem>
                </div>
            </div>
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
