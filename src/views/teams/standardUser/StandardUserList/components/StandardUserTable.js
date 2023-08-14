import React, { useEffect, useMemo } from 'react'
import AccountSvg from '../../../../../assets/svg/accounts'
import { DataTable } from 'components/shared'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getStandardSubUsers, setTableData } from '../store/dataSlice'

import {
    setSortedColumn,
    setDrawerOpen,
    setSelectedAccount,
    toggleDeleteConfirmation,
    toggleDeactiveUserConfirmation,
    setActivateOrDeactivateStatus,
} from '../store/stateSlice'

import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import { Tooltip } from 'components/ui'
import { BsPerson, BsPersonSlash } from 'react-icons/bs'
import dayjs from 'dayjs'
import StandardUserDeleteConfirmation from './StandardUserDeleteConfirmation'
import StandardUserDeactivateConfirmation from './StandardUserDeactivateConfirmation'
import { RxPencil2 } from 'react-icons/rx'
import UserNoteEditDialog from './UserNoteEditDialog'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedAccount(row._id))
    }

    const onEdit = () => {
        dispatch(setDrawerOpen(true))
        dispatch(setSelectedAccount(row))
    }

    const onActivateDeactivate = (value) => {
        dispatch(toggleDeactiveUserConfirmation(true))
        dispatch(
            setActivateOrDeactivateStatus({
                status: row.status,
            })
        )
        dispatch(setSelectedAccount(row))
    }

    return (
        <div className="flex justify-end items-center text-lg">
            <div
                className={`${textTheme} cursor-pointer px-2`}
                onClick={onEdit}
            >
                <Tooltip title="Add note">
                    <RxPencil2 />
                </Tooltip>
            </div>

            <span
                className={`cursor-pointer px-2 hover:${textTheme}`}
                onClick={onActivateDeactivate}
            >
                {row.status ? (
                    <Tooltip title="Deactivate">
                        <BsPerson />
                    </Tooltip>
                ) : (
                    <Tooltip title="Activate">
                        <BsPersonSlash />
                    </Tooltip>
                )}
            </span>
            <span
                className="cursor-pointer px-2 hover:text-red-500"
                onClick={onDelete}
            >
                <Tooltip title="Delete">
                    <HiOutlineTrash />
                </Tooltip>
            </span>
        </div>
    )
}

const AccountColumn = ({ row }) => {
    const avatar = row.color ? (
        <AccountSvg color={row.color} />
    ) : (
        <AccountSvg color="#CCCCCC" />
    )
    return (
        <div className="flex items-center w-52">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const StandardUsersTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.standardUsers.data.tableData)
    const loading = useSelector((state) => state.standardUsers.data.loading)
    const data = useSelector(
        (state) => state.standardUsers.data.standardUserList
    )
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, sort_column, sort_order])
    const tableData = useMemo(
        () => ({ pageIndex, offset, limit, sort_column, sort_order, q, total }),
        [pageIndex, offset, limit, sort_column, sort_order, q, total]
    )
    const fetchData = () => {
        dispatch(
            getStandardSubUsers({
                pageIndex,
                offset,
                limit,
                sort_column,
                sort_order,
                q,
            })
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <AccountColumn row={row} />
                },
            },
            {
                Header: 'Email',
                accessor: 'email',
                sortable: true,
                Cell: (props) => {
                    const { email } = props.row.original
                    return email
                },
            },
            {
                Header: 'Contact Number',
                accessor: 'contact_number',
                sortable: false,
                Cell: (props) => {
                    const { contact_number } = props.row.original
                    return contact_number
                },
            },

            {
                Header: 'Created At',
                accessor: 'createdAt',
                sortable: true,
                Cell: (props) => {
                    const { createdAt } = props.row.original
                    return (
                        <div className="flex items-center">
                            {createdAt ? (
                                <>{dayjs(createdAt).format('MM/DD/YYYY')}</>
                            ) : (
                                createdAt
                            )}
                        </div>
                    )
                },
            },
            {
                Header: '',
                id: 'action',
                accessor: (row) => row,
                Cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        newTableData.offset = (newTableData.pageIndex - 1) * newTableData.limit
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.limit = Number(value)
        newTableData.pageIndex = 1
        newTableData.offset = 0
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort_column = sort.key
        newTableData.sort_order = sort.order
        dispatch(setTableData(newTableData))
        dispatch(setSortedColumn(sortingColumn))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <StandardUserDeleteConfirmation />
            <StandardUserDeactivateConfirmation />
            <UserNoteEditDialog />
        </>
    )
}

export default StandardUsersTable
