import React, { useEffect, useMemo } from 'react'
import AccountSvg from '../../../../../assets/svg/accounts'
import { ActionLink, DataTable, WalletAddressEllipsis } from 'components/shared'
import { HiOutlinePause, HiOutlinePlay, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getAccounts, setTableData } from '../store/dataSlice'
import {
    setSortedColumn,
    setSelectedProduct,
    toggleSyncPauseConfirmation,
    setSyncStatus,
} from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import AccountDeleteConfirmation from './AccountDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import NumberFormat from 'react-number-format'
import dayjs from 'dayjs'
import { Tooltip } from 'components/ui'
import AccountSyncPauseConfirmation from './AccountSyncStausConfirmation'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onSyncPause = () => {
        dispatch(toggleSyncPauseConfirmation(true))
        dispatch(
            setSyncStatus({
                status: row.status,
            })
        )
        dispatch(setSelectedProduct(row._id))
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer px-2 hover:${textTheme}`}
                onClick={onSyncPause}
            >
                {row.status ? (
                    <Tooltip title="Pause Sync">
                        <HiOutlinePause />
                    </Tooltip>
                ) : (
                    <Tooltip title="Resume Sync">
                        <HiOutlinePlay />
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
    const avatar = row.account_color ? (
        <AccountSvg color={row.account_color} />
    ) : (
        <AccountSvg color="#CCCCCC" />
    )

    return (
        <div className="flex items-center w-52">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                <WalletAddressEllipsis
                    text={row.name.replace(/<[^>]*>?/gm, '')}
                    maxTextCount={20}
                />
            </span>
        </div>
    )
}

const AccountTokenColumn = ({ row }) => {
    const avatar =
        row && (row?.tokens || []).length > 0
            ? row.tokens.slice(0, 5).map((token, idx) => {
                if (token.logo_url) {
                    return (
                        <Tooltip title={token.name} key={idx}>
                            <img
                                key={idx}
                                src={token.logo_url}
                                alt=""
                                height="20"
                                width="20"
                            />
                        </Tooltip>
                    )
                }
                return false
            })
            : '--'

    return <div className="flex gap-1 items-center">{avatar}</div>
}

const CurrentProtocolColumn = ({ row }) => {
    const avatar =
        row && (row?.protocols || []).length > 0
            ? row.protocols.slice(0, 5).map((protocol, idx) => {
                if (protocol.logo_url) {
                    return (
                        <Tooltip title={protocol.name} key={idx}>
                            <img
                                key={idx}
                                src={protocol.logo_url}
                                alt=""
                                height="20"
                                width="20"
                            />
                        </Tooltip>
                    )
                }
                return false
            })
            : '--'

    return <div className="flex gap-1 items-center">{avatar}</div>
}

const AccountTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.defiAccountList.data.tableData)

    const loading = useSelector((state) => state.defiAccountList.data.loading)
    const data = useSelector((state) => state.defiAccountList.data.accountList)

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
            getAccounts({
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
                Header: 'Address',
                accessor: 'wallet_address',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="truncate capitalize">
                            <ActionLink
                                title={row.wallet_address}
                                className="cursor-pointer hover:text-green"
                                href="#"
                            >
                                <WalletAddressEllipsis
                                    text={row.wallet_address.replace(
                                        /<[^>]*>?/gm,
                                        ''
                                    )}
                                    maxTextCount={20}
                                />
                            </ActionLink>
                        </span>
                    )
                },
            },
            {
                Header: 'Balance',
                accessor: 'wallet_total',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="w-28">
                            <div className="cursor-pointer">
                                <Tooltip title={row.wallet_total}>
                                    <NumberFormat
                                        displayType="text"
                                        value={(
                                            Math.round(row.wallet_total * 100) /
                                            100
                                        ).toFixed(2)}
                                        suffix={' USD'}
                                        thousand
                                        Separator={true}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    )
                },
            },
            {
                Header: 'Account Tokens',
                accessor: 'Tokens in Account',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AccountTokenColumn row={row} />
                },
            },
            {
                Header: 'Current Protocols',
                accessor: 'Current Protocols',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <CurrentProtocolColumn row={row} />
                },
            },
            {
                Header: 'Last Transaction',
                accessor: 'text',
                sortable: false,
                Cell: (props) => {
                    const { last_transaction } = props.row.original
                    return (
                        <span className="truncate">
                            {last_transaction.text ? (
                                <WalletAddressEllipsis
                                    text={last_transaction.text.replace(
                                        /<[^>]*>?/gm,
                                        ''
                                    )}
                                    maxTextCount={20}
                                />
                            ) : (
                                <>--</>
                            )}
                        </span>
                    )
                },
            },
            {
                Header: 'Last Transaction Date',
                accessor: 'date',
                sortable: false,
                Cell: (props) => {
                    const { last_transaction } = props.row.original
                    return (
                        <div className="flex items-center">
                            {last_transaction.time_at ? (
                                <>
                                    {dayjs
                                        .unix(last_transaction.time_at)
                                        .format('MM/DD/YYYY')}
                                </>
                            ) : (
                                <>--</>
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
            <AccountDeleteConfirmation />
            <AccountSyncPauseConfirmation />
        </>
    )
}

export default AccountTable
