import React, { useEffect, useMemo } from 'react'
import { DataTable } from 'components/shared'
import { HiPencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts, setTableData } from '../store/dataSlice'
import {
    setSortedColumn,
    setSelectedContact,
    setDrawerOpen,
    toggleDeleteConfirmation,
} from '../store/stateSlice'
import { Tooltip } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import shortenString from 'utils/shortenString'
import { ActionLink } from 'components/shared'
import AvatarSvg from 'assets/svg/accounts'
import EditContactDialog from './EditContactDialog'
import ContactDeleteConfirmation from './ContactDeleteConfirmation'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onView = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedContact(row))
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedContact(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer px-2 hover:${textTheme}`}
                onClick={onView}
            >
                <Tooltip title="Edit Contact">
                    <HiPencil />
                </Tooltip>
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

const ContactColumn = ({ row }) => {
    const avatar = row.color ? (
        <AvatarSvg color={row.color} />
    ) : (
        <AvatarSvg color="#CCCCCC" />
    )

    return (
        <div className="flex items-center w-52">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const WalletTypeColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.wallet_type}
            </span>
        </div>
    )
}

const ChainColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.chain}</span>
        </div>
    )
}

const AcceptedAssetsColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.accepted_assets}
            </span>
        </div>
    )
}

const CategoryColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.contact_category}
            </span>
        </div>
    )
}

const DateAddedColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.createdAt ? (
                    <>{dayjs(row.createdAt).format('MM/DD/YYYY')}</>
                ) : (
                    <>--</>
                )}
            </span>
        </div>
    )
}

const AddressColumn = ({ row }) => {
    return (
        <span className="truncate capitalize">
            {row.address ? (
                <ActionLink
                    title={row?.address}
                    className="cursor-pointer hover:text-green"
                    href={`https://debank.com/profile/` + row?.address}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {shortenString(row?.address)}
                </ActionLink>
            ) : (
                '--'
            )}
        </span>
    )
}

const ContactTable = () => {
    const dispatch = useDispatch()
    const {
        pageIndex,
        offset,
        limit,
        sort_column,
        sort_order,
        q,
        total,
    } = useSelector((state) => state.contactList.data.tableData)
    const loading = useSelector((state) => state.contactList.data.loading)
    const data = useSelector((state) => state.contactList.data.contacts)

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
            getContacts({
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
                    return <ContactColumn row={row} />
                },
            },
            {
                Header: 'Address',
                accessor: 'address',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AddressColumn row={row} />
                },
            },
            {
                Header: 'Wallet Type',
                accessor: 'wallet_type',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <WalletTypeColumn row={row} />
                },
            },
            {
                Header: 'Chain',
                accessor: 'chain',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <ChainColumn row={row} />
                },
            },
            {
                Header: 'Accepted Assets',
                accessor: 'accepetd_assets',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AcceptedAssetsColumn row={row} />
                },
            },
            {
                Header: 'Category',
                accessor: 'Category',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <CategoryColumn row={row} />
                },
            },
            {
                Header: 'Date Added',
                accessor: 'createdAt',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <DateAddedColumn row={row} />
                },
            },
            {
                Header: '',
                id: 'action',
                accessor: (row) => row,
                Cell: (props) => {
                    return <ActionColumn row={props.row.original} />
                },
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

            <ContactDeleteConfirmation />
            <EditContactDialog />
        </>
    )
}

export default ContactTable
