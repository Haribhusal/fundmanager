import React, { useEffect, useMemo } from 'react'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import {  getTeamAccounts, setTableData } from '../store/dataSlice'
import {  setSortedColumn } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'


const AccountColumn = ({ row }) => {
    return (
        <div className="flex">
            <div className="ltr:ml-2 rtl:mr-2">
                <span className="mb-2 font-semibold">{row.name}</span>
            </div>
        </div>
    )
}

const AccountTypeColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-1 rtl:mr-2`}>{row.account_type}</span>
        </div>
    )
}

const TypeColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-1 rtl:mr-2`}>{row.type}</span>
        </div>
    )
}

const CategoryColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-1 rtl:mr-2`}>{row.category}</span>
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

const AccountTable = (props) => {
    const dispatch = useDispatch()

    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.teamAccountList.data.tableData)

    const loading = useSelector((state) => state.teamAccountList.data.loading)
    const data = useSelector((state) => state.teamAccountList.data.accountList)
    useEffect(() => {
        fetchData(props?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, limit, sort_column, sort_order, props?.id])

    const tableData = useMemo(
        () => ({ pageIndex, offset, limit, sort_column, sort_order, q, total }),
        [pageIndex, offset, limit, sort_column, sort_order, q, total]
    )
    const fetchData = (id) => {
        dispatch(
            getTeamAccounts({
                id,
                pageIndex,
                offset,
                limit,
                sort_column,
                sort_order,
                q,
                total,
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
                Header: 'Account Type',
                accessor: 'account_type',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <AccountTypeColumn row={row} />
                },
            },
            {
                Header: 'Type ',
                accessor: 'type',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <TypeColumn row={row} />
                },
            },
            {
                Header: 'Category ',
                accessor: 'category',
                sortable: true,
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
        </>
    )
}

export default AccountTable
