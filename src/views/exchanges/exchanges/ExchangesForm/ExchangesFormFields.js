import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import CreatableSelect from 'react-select/creatable'
import { tags } from 'constants/standardSubUserConstants'
import { IoIosColorPalette } from 'react-icons/io'


const categories = [
    { label: 'Third Party Program', value: 'Third Party Program' },
    { label: 'Cold Call', value: 'Cold Call' },
    { label: 'Linkedin', value: 'Linkedin' },
    { label: 'Direct Mail', value: 'Direct Mail' },
    { label: 'Other', value: 'Other' },
]

const types = [
    { label: 'Add on Business', value: 'Add on Business' },
    { label: 'Courtesy', value: 'Courtesy' },
    { label: 'New Business', value: 'New Business' },
    { label: 'Renewal', value: 'Renewal' },
    { label: 'Upgrade', value: 'Upgrade' },
]

const providers = [
    { label: 'Binance', value: 'Binance' },
    { label: 'Binance US', value: 'Binance US' },
    { label: 'Felix', value: 'Felix' },
    { label: 'Kraken', value: 'Kraken' },
    { label: 'Coinbase', value: 'Coinbase' },
    { label: 'Kucoin', value: 'Kucoin' },
]

const ExchangesFormFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormItem
                    label="Name"
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
                    label="Provider"
                    invalid={
                        errors.cefi_account_provider &&
                        touched.cefi_account_provider
                    }
                    errorMessage={errors.cefi_account_provider}
                    asterisk

                >
                    <Field name="cefi_account_provider">
                        {({ field, form }) => (
                            <Select
                                placeholder="Select Provider"
                                field={field}
                                form={form}
                                options={providers}
                                value={providers.filter(
                                    (provider) =>
                                        provider.value ===
                                        values.cefi_account_provider
                                )}
                                onChange={(provider) =>
                                    form.setFieldValue(
                                        field.name,
                                        provider.value
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem>

                <FormItem
                    label="Api Key"
                    invalid={errors.api_key && touched.api_key}
                    errorMessage={errors.api_key}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="api_key"
                        placeholder="Api Key"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Api Secret"
                    invalid={errors.api_secret && touched.api_secret}
                    errorMessage={errors.api_secret}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="api_secret"
                        placeholder="Api Secret"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Category"
                    invalid={errors.category && touched.category}
                    errorMessage={errors.category}
                >
                    <Field name="category">
                        {({ field, form }) => (
                            <Select
                                placeholder="Select Category"
                                field={field}
                                form={form}
                                options={categories}
                                value={categories.filter(
                                    (category) =>
                                        category.value === values.category
                                )}
                                onChange={(category) =>
                                    form.setFieldValue(
                                        field.name,
                                        category.value
                                    )
                                }
                            />
                        )}
                    </Field>
                </FormItem>

                <FormItem
                    label="Type"
                    invalid={errors.type && touched.type}
                    errorMessage={errors.type}
                >
                    <Field name="type">
                        {({ field, form }) => (
                            <Select
                                placeholder="Select Type"
                                field={field}
                                form={form}
                                options={types}
                                value={types.filter(
                                    (type) => type.value === values.type
                                )}
                                onChange={(type) =>
                                    form.setFieldValue(field.name, type.value)
                                }
                            />
                        )}
                    </Field>
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

export default ExchangesFormFields
