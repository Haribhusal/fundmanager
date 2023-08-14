import React, { useEffect, useMemo } from 'react'
import { Avatar, Tooltip } from 'components/ui'
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getProtocols, setTableData } from '../store/dataSlice'
import { ActionLink, WalletAddressEllipsis } from 'components/shared'
import DataTableExpandable from 'components/shared/DataTableExpandable'
import { cloneDeep } from 'lodash'
import { setSortedColumn } from '../store/stateSlice'
import AccountSvg from '../../../../../assets/svg/accounts'
import NumberFormat from 'react-number-format'
import dayjs from 'dayjs'

const ProtocolColumn = ({ row }) => {
    const avatar = row?.logo_url ? (
        <Avatar src={row?.logo_url} size={20} shape="circle bg-transparent" />
    ) : null

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

const BalanceColumn = ({ row }) => {
    const amount = row.total_usd_price

    return (
        <>
            {amount ? (
                <div className="cursor-pointer w-32">
                    <Tooltip title={amount}>
                        <NumberFormat
                            displayType="text"
                            value={(Math.round(amount * 100) / 100).toFixed(2)}
                            suffix={' USD'}
                            thousandSeparator={true}
                        />
                    </Tooltip>
                </div>
            ) : (
                '--'
            )}
        </>
    )
}

const ProtocolChainColumn = ({ row }) => {
    const avatar = row?.chain_logo ? (
        <Avatar src={row?.chain_logo} size={20} shape="circle bg-transparent" />
    ) : null

    return (
        <div className="flex gap-1 items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2`}>
                {row?.chain_name || <>--</>}
            </span>
        </div>
    )
}

const ProtocolTokenColumn = ({ row: { portfolio_item_list } }) => {
    const arrayOfPortfolio_item_list = portfolio_item_list
        ? portfolio_item_list.flatMap((p_item) => ({
              name: p_item.name,
              url: p_item.logo_url,
          }))
        : []

    const avatar = arrayOfPortfolio_item_list.slice(0, 5).map((item, idx) => (
        <Tooltip title={item.name} key={idx}>
            <Avatar src={item.url} size={20} shape="circle bg-transparent" />
        </Tooltip>
    ))

    return (
        <div className="flex gap-1 items-center cursor-pointer w-40">
            {avatar.length ? avatar : <>--</>}
        </div>
    )
}

const ProtocolRewardsColumn = ({ row: { rewards } }) => {
    const totalRewardValue = rewards.amount * rewards.balance

    return (
        <div className="flex gap-1 items-center w-32">
            {totalRewardValue ? (
                <div className="cursor-pointer">
                    <Tooltip title={totalRewardValue}>
                        <NumberFormat
                            displayType="text"
                            value={(
                                Math.round(totalRewardValue * 100) / 100
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

const AccountColumn = ({ row }) => {
    const avatar = row.account_color ? (
        <AccountSvg color={row.account_color} />
    ) : (
        <AccountSvg color="#CCCCCC" />
    )

    return (
        <span className="truncate font-normal cursor-pointer flex items-center w-52">
            {row.account ? (
                <>
                    {avatar}
                    <ActionLink
                        title={row.account}
                        className="cursor-pointer hover:text-green ml-2 rtl:mr-2"
                        href="#"
                    >
                        <WalletAddressEllipsis
                            text={row.account_name.replace(/<[^>]*>?/gm, '')}
                            maxTextCount={20}
                        />
                    </ActionLink>
                </>
            ) : (
                <>--</>
            )}
        </span>
    )
}

function ProtocolTable() {
    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: ({ table }) => {
                    return (
                        <button
                            className="text-xl"
                            {...{
                                onClick:
                                    table.getToggleAllRowsExpandedHandler(),
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
                header: 'Name',
                accessorKey: 'name',
                sortable: true,
                cell: (props) => {
                    const row = props.row.original
                    return <ProtocolColumn row={row} />
                },
            },
            {
                header: 'Balance',
                accessorKey: 'total_usd_price',
                sortable: true,
                cell: (props) => {
                    const row = props.row.original
                    return <BalanceColumn row={row} />
                },
            },
            {
                header: 'Chain',
                accessorKey: 'chain',
                sortable: true,
                cell: (props) => {
                    const row = props.row.original
                    return <ProtocolChainColumn row={row} />
                },
            },
            {
                header: 'Account Tokens',
                accessor: 'Tokens in Account',
                sortable: false,
                cell: (props) => {
                    const row = props.row.original
                    return <ProtocolTokenColumn row={row} />
                },
            },
            {
                header: 'Rewards',
                accessor: 'rewards',
                sortable: false,
                cell: (props) => {
                    const row = props.row.original
                    return <ProtocolRewardsColumn row={row} />
                },
            },
            {
                header: 'Last Transaction Date',
                accessor: 'time_at',
                sortable: false,
                cell: (props) => {
                    const { portfolio_item_list } = props.row.original
                    return (
                        <div className="flex items-center">
                            {portfolio_item_list ? (
                                portfolio_item_list[0]?.time_at ? (
                                    <>
                                        {dayjs
                                            .unix(
                                                portfolio_item_list[0]?.time_at
                                            )
                                            .format('MM/DD/YYYY')}
                                    </>
                                ) : (
                                    <>--</>
                                )
                            ) : (
                                <>
                                    {dayjs
                                        .unix(props.row.original.time_at)
                                        .format('MM/DD/YYYY')}
                                </>
                            )}
                        </div>
                    )
                },
            },
            {
                header: 'Account',
                accessor: 'account',
                sortable: false,
                cell: (props) => {
                    const row = props.row.original
                    return <AccountColumn row={row} />
                },
            },
        ],
        []
    )

    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.defiProtocolList.data.tableData)

    const loading = useSelector((state) => state.defiProtocolList.data.loading)
    const data = useSelector(
        (state) => state.defiProtocolList.data.protocolList
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
            getProtocols({
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
            <DataTableExpandable
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
        </>
    )
}

export default ProtocolTable
