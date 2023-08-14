import React, { useEffect, useMemo } from 'react'
import AccountSvg from '../../../../../assets/svg/accounts'
import { DataTable, WalletAddressEllipsis } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactions, setTableData } from '../store/dataSlice'
import {
    setSelectedTransaction,
    setDrawerOpen,
    setSortedColumn,
} from '../store/stateSlice'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import NumberFormat from 'react-number-format'
import dayjs from 'dayjs'
import { Tooltip, Avatar } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import TransactionEditDialog from './TransactionEditDialog'
import { RxPencil2 } from 'react-icons/rx'
import { ActionLink } from 'components/shared'

const getAmount = (item) => {
    var data = {}

    if (item?.cate_id === 'send' && item.hasOwnProperty('sends')) {
        data.amount = item?.sends[0]?.amount
    }

    if (item?.cate_id === 'receive') {
        data.amount = item?.receives[0]?.amount
    }

    if (item?.tx) {
        if (item?.tx?.value && item?.tx?.value > 0) {
            data.amount = item.tx.value
        }
    }

    return data?.amount ? data?.amount : null
}

const TransactionTypeColumn = ({ row }) => {
    let type = row?.tx?.name
    type = type ? type[0].toUpperCase() + type.slice(1) : ''

    return (
        <div className="flex items-center">
            <span className={`font-semibold`}>{type ? type : '--'}</span>
        </div>
    )
}

const AccountColumn = ({ row }) => {
    const avatar = row?.account_color ? (
        <AccountSvg color={row?.account_color} />
    ) : (
        <AccountSvg color="#CCCCCC" />
    )

    return (
        <div className="flex items-center w-36">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>
                {row.account_name}
            </span>
        </div>
    )
}

const AmountColumn = ({ row }) => {
    const avatar = row?.amount ? <AccountSvg color={'#CCCCCC'} /> : null
    const amount = getAmount(row)

    return (
        <div className="flex items-center w-28">
            {avatar}
            <span className={`ml-2 rtl:mr-2`}>
                {amount ? (
                    <div className="cursor-pointer">
                        <Tooltip title={amount}>
                            <NumberFormat
                                displayType="text"
                                value={(Math.round(amount * 100) / 100).toFixed(
                                    2
                                )}
                                suffix={' USD'}
                                thousandSeparator={true}
                            />
                        </Tooltip>
                    </div>
                ) : (
                    '--'
                )}
            </span>
        </div>
    )
}

const AddressColumn = ({ row }) => {
    const address = row.address

    return (
        <span className="truncate capitalize">
            {address ? (
                <ActionLink
                    title={address}
                    className="cursor-pointer hover:text-green"
                    href={'https://debank.com/profile/' + address}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WalletAddressEllipsis
                        text={address.replace(/<[^>]*>?/gm, '')}
                        maxTextCount={20}
                    />
                </ActionLink>
            ) : (
                '--'
            )}
        </span>
    )
}

const TransactionChainColumn = ({ row }) => {
    const avatar = row?.chain_logo ? (
        <Avatar src={row?.chain_logo} size={20} shape="circle bg-transparent" />
    ) : null

    return (
        <div className="flex gap-1 items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2`}>{row?.chain_name || ''}</span>
        </div>
    )
}

const TransactionGasColumn = ({ row }) => {
    const amountethgas = row?.tx?.eth_gas_fee
    const amountusdgas = row?.tx?.eth_gas_fee

    return (
        <div className="flex items-center w-40">
            <span className={`ml-2 rtl:mr-2`}>
                {amountethgas && amountusdgas ? (
                    <>
                        <NumberFormat
                            displayType="text"
                            value={(
                                Math.round(amountethgas * 100) / 100
                            ).toFixed(2)}
                            suffix={' ETH'}
                            thousandSeparator={true}
                        />{' '}
                        (
                        <NumberFormat
                            displayType="text"
                            value={(
                                Math.round(amountusdgas * 100) / 100
                            ).toFixed(2)}
                            suffix={' USD'}
                            thousandSeparator={true}
                        />
                        )
                    </>
                ) : (
                    '--'
                )}
            </span>
        </div>
    )
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedTransaction(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            <Tooltip title="Add note">
                <RxPencil2 />
            </Tooltip>
        </div>
    )
}

const TransactionTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.defiTransactionList.data.tableData)

    const loading = useSelector(
        (state) => state.defiTransactionList.data.loading
    )
    const data = useSelector(
        (state) => state.defiTransactionList.data.transactionList
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
            getTransactions({
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
                Header: 'Transaction Id',
                accessor: 'tx_hash',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="truncate capitalize font-semibold cursor-pointer">
                            <div title={row.tx_hash}>
                                <WalletAddressEllipsis
                                    text={row.tx_hash.replace(/<[^>]*>?/gm, '')}
                                    maxTextCount={20}
                                />
                            </div>
                        </span>
                    )
                },
            },
            {
                Header: 'Type',
                accessor: 'cate_id',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <TransactionTypeColumn row={row} />
                },
            },
            {
                Header: 'Account',
                accessor: 'account',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <AccountColumn row={row} />
                },
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AmountColumn row={row} />
                },
            },
            {
                Header: 'Address/Protocol',
                accessor: 'address',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AddressColumn row={row} />
                },
            },
            {
                Header: 'Chain',
                accessor: 'chain',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <TransactionChainColumn row={row} />
                },
            },
            {
                Header: 'Gas',
                accessor: 'gas',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <TransactionGasColumn row={row} />
                },
            },
            {
                Header: 'Last Transaction Date',
                accessor: 'time_at',
                sortable: true,
                Cell: (props) => {
                    const { time_at } = props.row.original
                    return (
                        <div className="flex items-center">
                            {time_at ? (
                                <>{dayjs.unix(time_at).format('MM/DD/YYYY')}</>
                            ) : (
                                <>--</>
                            )}
                        </div>
                    )
                },
            },
            {
                Header: 'Note',
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
            <TransactionEditDialog />
        </>
    )
}

export default TransactionTable
