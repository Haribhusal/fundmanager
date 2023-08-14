import React, { useState } from 'react'
import {
    Select,
    Input,
    FormItem,

} from 'components/ui'
import {
    HiUserCircle,
} from 'react-icons/hi'
import { Field } from 'formik'
import { ChromePicker } from 'react-color'
import { IoIosColorPalette } from 'react-icons/io'

export const contract_type_list = [
    { key: 1, id: '1', label: 'Swap', value: 'Swap' },
    { key: 2, id: '2', label: 'Liquidity', value: 'Liquidity' },
    { key: 3, id: '3', label: 'Farm', value: 'Farm' },
    { key: 4, id: '4', label: 'Lending', value: 'Lending' },
    { key: 5, id: '5', label: 'Boardroom', value: 'Boardroom' },
]

export const chains = [
    { id: 0, key: 0, label: 'Ethereum', value: 'Ethereum' },
    { id: 1, key: 1, label: 'BSC', value: 'BSC' },
    { id: 2, key: 2, label: 'Gnosis', value: 'Gnosis' },
    { id: 3, key: 3, label: 'Polygon', value: 'Polygon' },
    { id: 4, key: 4, label: 'Fantom', value: 'Fantom' },
    { id: 5, key: 5, label: 'OEC', value: 'OEC' },
    { id: 6, key: 6, label: 'HECO', value: 'HECO' },
    { id: 7, key: 7, label: 'Avalanche', value: 'Avalanche' },
    { id: 8, key: 8, label: 'Optimism', value: 'Optimism' },
    { id: 9, key: 9, label: 'Arbitrum', value: 'Arbitrum' },
    { id: 10, key: 10, label: 'Celo', value: 'Celo' },
    { id: 11, key: 11, label: 'Moonriver', value: 'Moonriver' },
    { id: 12, key: 12, label: 'Cronos', value: 'Cronos' },
    { id: 13, key: 13, label: 'Boba', value: 'Boba' },
    { id: 14, key: 14, label: 'Metis', value: 'Metis' },
    { id: 15, key: 15, label: 'BitTorrent', value: 'BitTorrent' },
    { id: 16, key: 16, label: 'Aurora', value: 'Aurora' },
    { id: 17, key: 17, label: 'Moonbeam', value: 'Moonbeam' },
    { id: 18, key: 18, label: 'SmartBch', value: 'SmartBch' },
    { id: 19, key: 19, label: 'Fuse', value: 'Fuse' },
    { id: 20, key: 20, label: 'Harmony', value: 'Harmony' },
    { id: 21, key: 21, label: 'Klaytn', value: 'Klaytn' },
    { id: 22, key: 22, label: 'Astar', value: 'Astar' },
    { id: 23, key: 23, label: 'Shiden', value: 'Shiden' },
    { id: 24, key: 24, label: 'Palm', value: 'Palm' },
    { id: 25, key: 25, label: 'IoTeX', value: 'IoTeX' },
    { id: 26, key: 26, label: 'RSK', value: 'RSK' },
    { id: 27, key: 27, label: 'Wanchain', value: 'Wanchain' },
    { id: 28, key: 28, label: 'KCC', value: 'KCC' },
    { id: 29, key: 29, label: 'Songbird', value: 'Songbird' },
    { id: 30, key: 30, label: 'EvmOS', value: 'EvmOS' },
    { id: 31, key: 31, label: 'DFK', value: 'DFK' },
    { id: 32, key: 32, label: 'Telos', value: 'Telos' },
    { id: 33, key: 33, label: 'Swimmer', value: 'Swimmer' },
    { id: 34, key: 34, label: 'Arbitrum Nova', value: 'Arbitrum Nova' },
    { id: 35, key: 35, label: 'Canto', value: 'Canto' },
]

function ColorPicker({ field, form }) {
    const { name, value } = field
    const { setFieldValue } = form
    const [color, setColor] = useState(field.value)
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

const ContractFormEdit = (props) => {
    const { touched, errors, values } = props
    return (
        <>
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
                    
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="Address"
                invalid={errors.address && touched.address}
                errorMessage={errors.address}
                asterisk
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="address"
                    placeholder="address"
                    component={Input}
                    prefix={<HiUserCircle className="text-xl" />}
                />
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
                            options={chains}
                            value={chains.filter(
                                (chain) => chain.value === values.chain
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>

            <FormItem
                label="Contract Type"
                invalid={errors.contract_type && touched.contract_type}
                errorMessage={errors.contract_type}
                asterisk
            >
                <Field name="contract_type">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={contract_type_list}
                            value={contract_type_list.filter(
                                (contract_type) =>
                                    contract_type.value === values.contract_type
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Description"
                invalid={errors.description && touched.description}
                errorMessage={errors.description}
            >
                <Field
                    name="description"
                    component={Input}
                    textArea
                    type="text"
                    placeholder="Enter Description"
                />
            </FormItem>
        </>
    )
}

export default ContractFormEdit
