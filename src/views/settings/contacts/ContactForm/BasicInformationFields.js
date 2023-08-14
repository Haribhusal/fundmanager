import React,{useState} from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { ChromePicker } from 'react-color'
import { IoIosColorPalette } from 'react-icons/io'

const wallet_type_list = [
    { key: 1, id: '1', label: 'Defi Wallet', value: 'Defi Wallet' },
    { key: 2, id: '2', label: 'Exchange Wallet', value: 'Exchange Wallet' },
]

export const contact_categories = [
    { key: '1', id: '1', label: 'Employee', value: 'Employee' },
    { key: '2', id: '2', label: 'Supplier', value: 'Supplier' },
    { key: '3', id: '3', label: 'OTC', value: 'OTC' },
]

export const accepted_assets_list = [
    { key: '1', id: '1', label: 'USDC', value: 'USDC' },
    { key: '2', id: '2', label: 'USDT', value: 'USDT' },
    { key: '3', id: '3', label: 'L3USD', value: 'L3USD' },
    { key: '4', id: '4', label: 'DAI', value: 'DAI' },
    { key: '5', id: '5', label: 'MIM', value: 'MIM' },
    { key: '6', id: '6', label: 'LIF3', value: 'LIF3' },
    { key: '7', id: '7', label: 'LSHARE', value: 'LSHARE' },
    { key: '8', id: '8', label: 'TOMB', value: 'TOMB' },
    { key: '9', id: '9', label: 'TBOND', value: 'TBOND' },
    { key: '10', id: '10', label: 'FTM', value: 'FTM' },
    { key: '11', id: '11', label: 'ETH', value: 'ETH' },
    { key: '12', id: '12', label: 'BTC', value: 'BTC' },
    { key: '13', id: '13', label: 'TSHARE', value: 'TSHARE' },
    { key: '14', id: '14', label: 'TSHARE', value: 'TSHARE' },
    { key: '15', id: '15', label: 'AVAX', value: 'AVAX' },
    { key: '16', id: '16', label: 'BNB', value: 'BNB' },
    { key: '17', id: '17', label: 'LINK', value: 'LINK' },
    { key: '18', id: '18', label: 'ZOO', value: 'ZOO' },
]

export const chain_list = [
    {
        key: '1',
        id: '1',
        label: 'Ethereum',
        value: 'Ethereum',
    },
    {
        key: '2',
        id: '2',
        label: 'BSC',
        value: 'BSC',
    },
    {
        key: '3',
        id: '3',
        label: 'Gnosis',
        value: 'Gnosis',
    },
    {
        key: '4',
        id: '4',
        label: 'Polygon',
        value: 'Polygon',
    },
    {
        key: '5',
        id: '5',
        label: 'Fantom',
        value: 'Fantom',
    },
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



const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormItem
                    label="Contact Name"
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
                    label="Contact Address"
                    invalid={errors.address && touched.address}
                    errorMessage={errors.address}
                    asterisk
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="address"
                        placeholder="Enter Address"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Wallet Type"
                    invalid={errors.wallet_type && touched.wallet_type}
                    errorMessage={errors.wallet_type}
                    asterisk
                >
                    <Field name="wallet_type">
                        {   
                            ({ field, form }) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={wallet_type_list}
                                    value={wallet_type_list.filter(
                                        (wallet_type) =>
                                            wallet_type.value ===
                                            values.wallet_type
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option.value
                                        )
                                    }
                                />
                            )
                            // )
                        }
                    </Field>
                </FormItem>

                <FormItem
                    label="Contact Category"
                    invalid={
                        errors.contact_category && touched.contact_category
                    }
                    errorMessage={errors.contact_category}
                    asterisk
                >
                    <Field name="contact_category">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={contact_categories}
                                value={contact_categories.filter(
                                    (contact_category) =>
                                        contact_category.value ===
                                        values.contact_category
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(field.name, option.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem
                    label="Accepted Assets"
                    invalid={errors.accepted_assets && touched.accepted_assets}
                    errorMessage={errors.accepted_assets}
                    asterisk
                >
                    <Field name="accepted_assets">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={accepted_assets_list}
                                value={accepted_assets_list.filter(
                                    (accepted_assets) =>
                                        accepted_assets.value ===
                                        values.accepted_assets
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(field.name, option.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem
                    label="Chain"
                    invalid={errors.chain && touched.chain}
                    errorMessage={errors.chain}
                    asterisk
                >
                    <Field name="chain">
                        {({ field, form }) => (
                            <Select
                                field={field}
                                form={form}
                                options={chain_list}
                                value={chain_list.filter(
                                    (chain) => chain.value === values.chain
                                )}
                                onChange={(option) =>
                                    form.setFieldValue(field.name, option.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem label="Color">
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
        </AdaptableCard>
    )
}

export default BasicInformationFields
