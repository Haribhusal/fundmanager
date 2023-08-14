import React, { useEffect, useMemo } from 'react'
import { Avatar, Tooltip } from 'components/ui'
import AccountSvg from '../../../../../assets/svg/accounts'
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getBalances, setTableData } from '../store/dataSlice'
import { WalletAddressEllipsis } from 'components/shared'
import DataTableExpandableBalance from 'components/shared/DataTableExpandableBalance'
import { cloneDeep } from 'lodash'
import { setSortedColumn } from '../store/stateSlice'
import NumberFormat from 'react-number-format'

const Balance = ({ row }) => {
    const total_balance = row.total_balance
    return (
        <div className="flex gap-1 items-center w-32">
            {total_balance ? (
                <div className="cursor-pointer">
                    <Tooltip title={total_balance}>
                        <NumberFormat
                            displayType="text"
                            value={(
                                Math.round(total_balance * 100) / 100
                            ).toFixed(2)}
                            suffix={' USD'}
                            thousandSeparator={true}
                        />
                    </Tooltip>
                </div>
            ) : (
                '--'
            )}
        </div>
    )
}


const PriceColumn = ({ row }) => {
    return (
        <div className="flex gap-1 items-center w-32">
            {row?.price ? (
                <div className="cursor-pointer">
                    <Tooltip title={row.price}>
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(row.price * 100) / 100).toFixed(
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
        </div>
    )
}

const Price24HourChange = ({ row }) => {
    return (
        <div className="flex gap-1 items-center w-32">
            {row?.price_change_24h ? (
                <div className="cursor-pointer">
                    <Tooltip title={row.price_change_24h}>
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(row.price_change_24h * 100) / 100).toFixed(
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
        </div>
    )
}


const Balance24HourChange = ({ row }) => {
    return (
        <div className="flex gap-1 items-center w-32">
            {row?.balance_change_24h ? (
                <div className="cursor-pointer">
                    <Tooltip title={row.balance_change_24h}>
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(row.balance_change_24h * 100) / 100).toFixed(
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
        </div>
    )
}


const BalanceColumn = ({ row }) => {
    const avatar = row?.logo_url ? (
        <Avatar src={row?.logo_url} size={20} shape="circle bg-transparent" />
    ) : <AccountSvg color={row.account_color} />

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


function BalancesTable() {
    const columns = useMemo(() => [
        {
            id: 'expander',
            header: ({ table }) => {
                return (
                    <button
                        className="text-xl"
                        {...{
                            onClick: table.getToggleAllRowsExpandedHandler(),
                        }}
                    >
                        {table.getIsAllRowsExpanded() ? (
                            <HiOutlineMinusCircle />
                        ) : (
                            <HiOutlinePlusCircle />
                        )}
                    </button>
                )
            },
            cell: ({ row, getValue }) => {
                return (
                    <>
                        {row.getCanExpand() ? (
                            <button
                                className="text-xl"
                                {...{
                                    onClick: row.getToggleExpandedHandler(),
                                }}
                            >
                                {row.getIsExpanded() ? (
                                    <HiOutlineMinusCircle />
                                ) : (
                                    <HiOutlinePlusCircle />
                                )}
                            </button>
                        ) : null}
                        {getValue()}
                    </>
                )
            },
        },

        {
            header: 'Wallet',
            accessor: 'wallet',
            sortable: true,
            cell: (props) => {
                const row = props.row.original
                return <BalanceColumn row={row} />
            },
        },

        {
            header: 'Balance',
            accessor: 'total_balance',
            sortable: true,
            cell: (props) => {
                const row = props.row.original
                return <Balance row={row} />
            },
        },

        {
            header: 'Price',
            accessor: 'price',
            sortable: true,
            cell: (props) => {
                const row = props.row.original
                return <PriceColumn row={row} />
            },
        },
        {
            header: 'Price 24 Hour Change',
            accessor: 'price_change_24h',
            sortable: true,
            cell: (props) => {
                const row = props.row.original
                return <Price24HourChange row={row} />
            },
        },
        {
            header: 'Balance 24 Hour Change',
            accessor: 'balance_change_24h',
            sortable: true,
            cell: (props) => {
                const row = props.row.original
                return <Balance24HourChange row={row} />
            },
        },
    ],
        [])

    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.defiBalancesList.data.tableData)

    const loading = useSelector((state) => state.defiBalancesList.data.loading)
    const data = useSelector(
        (state) => state.defiBalancesList.data.balancesList
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
            getBalances({
                pageIndex,
                offset,
                limit,
                sort_column,
                sort_order,
                q,
            })
        )
    }

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
            <DataTableExpandableBalance
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                subRowDataField="assets"
            />
        </>
    )
}

export default BalancesTable
