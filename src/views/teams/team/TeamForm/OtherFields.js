import React, { useState } from 'react'
import { AdaptableCard, WalletAddressEllipsis } from 'components/shared'
import { FormItem, Button, Dialog, Tooltip } from 'components/ui'
import { Field } from 'formik'
import classNames from 'classnames'
import isLastChild from 'utils/isLastChild'
import { HiOutlineTrash, HiPlus } from 'react-icons/hi'
import AccountSelect from './AccountSelect'
import MemberSelect from './MemberSelect'
import { toast, Notification } from 'components/ui'

const OtherFields = (props) => {
    const { values, touched, errors, setFieldValue } = props
    const [ccDialogAccountType, setCcDialogAccountType] = useState('')
    const [ccDialogMemberType, setCcDialogMemberType] = useState('')

    const onEditAccount = (type) => {
        setCcDialogAccountType(type)
    }

    const onEditMember = (type) => {
        setCcDialogMemberType(type)
    }

    const onAccountCardDialogClose = () => {
        setCcDialogAccountType('')
    }

    const onMemberCardDialogClose = () => {
        setCcDialogMemberType('')
    }

    const onAccountUpdate = (
        { accounts },
        { values, setFieldValue },
        { name }
    ) => {
        const accountValue = values[name]
        const card = { ...accounts }
        const updatedAccountValue = [...accountValue]

        if (!accountValue.some((item) => item.value === card.value)) {
            updatedAccountValue.push(card)
            setFieldValue(name, updatedAccountValue)
        } else {
            toast.push(
                <Notification
                    title={'Dublicate account'}
                    type="warning"
                    duration={2500}
                >
                    Please select other account to add.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
        onAccountCardDialogClose()
    }

    const onMemberUpdate = (
        { members },
        { values, setFieldValue },
        { name }
    ) => {
        const memberValue = values[name]
        const card = { ...members }
        const updatedMemberValue = [...memberValue]

        if (!memberValue.some((item) => item.value === card.value)) {
            updatedMemberValue.push(card)
            setFieldValue(name, updatedMemberValue)
        } else {
            toast.push(
                <Notification
                    title={'Dublicate member'}
                    type="warning"
                    duration={2500}
                >
                    Please select other member to add.
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
        onMemberCardDialogClose()
    }

    const onDeleteAccount = (id) => {
        const updatedAccount = values.accounts.filter((obj) => {
            return obj.value !== id
        })
        setFieldValue('accounts', updatedAccount)
    }

    const onDeleteMember = (id) => {
        const updatedAccount = values.members.filter((obj) => {
            return obj.value !== id
        })
        setFieldValue('members', updatedAccount)
    }

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            {/* <h5>Others</h5>
            <p className="mb-6">Section to config the product attribute</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Account"
                        invalid={errors.accounts && touched.accounts}
                        errorMessage={errors.accounts}
                    >
                        <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                            {values?.accounts?.map((item, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        'flex items-center justify-between p-4',
                                        !isLastChild(values.accounts, index) &&
                                            'border-b border-gray-200 dark:border-gray-600'
                                    )}
                                >
                                    <div className="flex items-center">
                                        <div className="ml-3 rtl:mr-3">
                                            <div className="flex items-center">
                                                <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                    {item.label}
                                                </div>
                                            </div>
                                            <span className="font-semibold">
                                                <WalletAddressEllipsis
                                                    text={item?.address?.replace(
                                                        /<[^>]*>?/gm,
                                                        ''
                                                    )}
                                                    maxTextCount={20}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span
                                            className="cursor-pointer px-2 hover:text-red-500"
                                            onClick={() =>
                                                onDeleteAccount(item.value)
                                            }
                                        >
                                            <Tooltip title="Delete">
                                                <HiOutlineTrash />
                                            </Tooltip>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <Button
                                type="button"
                                variant="plain"
                                size="sm"
                                icon={<HiPlus className="text-lg" />}
                                onClick={() => onEditAccount('NEW')}
                            >
                                <span className="font-semibold">
                                    Add account
                                </span>
                            </Button>
                        </div>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Member"
                        invalid={errors.members && touched.members}
                        errorMessage={errors.members}
                    >
                        <div className="rounded-lg border border-gray-200 dark:border-gray-600">
                            {values?.members?.map((item, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        'flex items-center justify-between p-4',
                                        !isLastChild(values.members, index) &&
                                            'border-b border-gray-200 dark:border-gray-600'
                                    )}
                                >
                                    <div className="flex items-center">
                                        <div className="ml-3 rtl:mr-3">
                                            <div className="flex items-center">
                                                <div className="text-gray-900 dark:text-gray-100 font-semibold">
                                                    {item.label}
                                                </div>
                                            </div>
                                            <span className="font-semibold">
                                                <WalletAddressEllipsis
                                                    text={item?.address?.replace(
                                                        /<[^>]*>?/gm,
                                                        ''
                                                    )}
                                                    maxTextCount={20}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <span
                                            className="cursor-pointer px-2 hover:text-red-500"
                                            onClick={() =>
                                                onDeleteMember(item.value)
                                            }
                                        >
                                            <Tooltip title="Delete">
                                                <HiOutlineTrash />
                                            </Tooltip>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <Button
                                type="button"
                                variant="plain"
                                size="sm"
                                icon={<HiPlus className="text-lg" />}
                                onClick={() => onEditMember('NEW')}
                            >
                                <span className="font-semibold">
                                    Add member
                                </span>
                            </Button>
                        </div>
                    </FormItem>
                </div>
            </div>

            <Dialog
                isOpen={
                    ccDialogAccountType === 'NEW' ||
                    ccDialogAccountType === 'EDIT'
                }
                onClose={onAccountCardDialogClose}
                onRequestClose={onAccountCardDialogClose}
            >
                <h5 className="mb-4">Add Account</h5>
                <Field name="accounts">
                    {({ field, form }) => {
                        return (
                            <AccountSelect
                                onUpdate={(accountValue) =>
                                    onAccountUpdate(accountValue, form, field)
                                }
                            />
                        )
                    }}
                </Field>
            </Dialog>

            <Dialog
                isOpen={
                    ccDialogMemberType === 'NEW' ||
                    ccDialogMemberType === 'EDIT'
                }
                onClose={onMemberCardDialogClose}
                onRequestClose={onMemberCardDialogClose}
            >
                <h5 className="mb-4">Add Member</h5>
                <Field name="members">
                    {({ field, form }) => {
                        return (
                            <MemberSelect
                                onUpdate={(memberValue) =>
                                    onMemberUpdate(memberValue, form, field)
                                }
                            />
                        )
                    }}
                </Field>
            </Dialog>
        </AdaptableCard>
    )
}

export default OtherFields
