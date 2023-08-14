import React, { useEffect, useMemo } from 'react'
import AccountSvg from '../../../../../assets/svg/accounts'
import { DataTable } from 'components/shared'
import { HiOutlinePause, HiOutlinePlay, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getExchanges, setTableData } from '../store/dataSlice'
import {
    setSortedColumn,
    setSelectedAccount,
    toggleDeleteConfirmation,
    toggleDeactiveUserConfirmation,
    setActivateOrDeactivateStatus,
    toggleSyncPauseConfirmation,
    setSyncStatus,
    setSelectedProduct,
} from '../store/stateSlice'
import NumberFormat from 'react-number-format'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import { Tooltip } from 'components/ui'
import ExchangesDeleteConfirmation from './ExchangesDeleteConfirmation'
import ExchangesSyncConfirmation from './ExchangesSyncConfirmation'


const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedAccount(row._id))
    }

    const onSyncPause = () => {
        dispatch(toggleSyncPauseConfirmation(true))
        dispatch(
            setSyncStatus({
                status: row.status,
            })
        )
        dispatch(setSelectedProduct(row))
    }

    return (
        <div className="flex justify-end items-center">
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
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}


const ProviderColumn = ({ row })=> {
    const provider = row.cefi_account_provider
    return (
        <span className='capitalize'>
            {provider}
        </span>

    )
}

const CategoryColumn = ({ row })=> {
    const category = row.category
    return (
        <span className='capitalize'>
            {category}
        </span>

    )
}

const TypeColumn = ({ row })=> {
    const type = row.type
    return (
        <span className='capitalize'>
            {type}
        </span>

    )
}

const BalanceColumn = ({ row }) => {
    const amount = row.wallet_total

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


const ExchangesTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.exchanges.data.tableData)
    const loading = useSelector((state) => state.exchanges.data.loading)
    const data = useSelector(
        (state) => state.exchanges.data.exchangesList
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
            getExchanges({
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
                Header: 'Balance',
                accessor: 'balance',
                Cell: (props) => {
                    const row = props.row.original
                    return <BalanceColumn row={row} />
                },
            },
            {
                Header: 'Provider',
                accessor: 'provider',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <ProviderColumn row={row} />
                },
            },
            {
                Header: 'Category',
                accessor: 'category',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <CategoryColumn row={row} />
                },
            },
            {
                Header: 'Type',
                accessor: 'type',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <TypeColumn row={row} />
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
            <ExchangesDeleteConfirmation />
            <ExchangesSyncConfirmation />
        </>
    )
}

export default ExchangesTable
