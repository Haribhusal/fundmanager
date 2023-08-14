import React, { useEffect, useMemo} from 'react'
import { DataTable } from 'components/shared'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getMembers, setTableData } from '../store/dataSlice'
import {
    setSelectedMember,
    setSortedColumn,
    toggleDeleteConfirmation,
} from '../store/stateSlice'
import { Tooltip } from 'components/ui'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

import { Tag } from 'components/ui'
import classNames from 'classnames'
import MemberDeleteConfirmation from './MemberDeleteConfirmation'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedMember(row.team_member_id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className="cursor-pointer px-2 hover:text-red-500"
                onClick={onDelete}
            >
                <Tooltip title="Delete">
                    <HiOutlineTrash />
                </Tooltip>{' '}
            </span>
        </div>
    )
}

const MemberColumn = ({ row }) => {
    return (
        <div className="flex">
            <div className="ltr:ml-2 rtl:mr-2">
                <span className="mb-2 font-semibold">{row.name}</span>
            </div>
        </div>
    )
}

const EmailColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-1 rtl:mr-2`}>{row.user_id}</span>
        </div>
    )
}

const StatusColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            {row.status ? (
                <Tag
                    className={classNames(
                        'border-0 rounded-md  rtl:mr-2',
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                    )}
                >
                    active
                </Tag>
            ) : (
                <Tag
                    className={classNames(
                        'border-0 rounded-md  rtl:mr-2',
                        'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100'
                    )}
                >
                    inactive
                </Tag>
            )}
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

const MemberTable = (props) => {
    const dispatch = useDispatch()

    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.memberList.data.tableData)

    const loading = useSelector((state) => state.memberList.data.loading)
    const data = useSelector((state) => state.memberList.data.memberList)

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
            getMembers({
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
                    return <MemberColumn row={row} />
                },
            },
            {
                Header: 'Email',
                accessor: 'email',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <EmailColumn row={row} />
                },
            },
            {
                Header: 'Status ',
                accessor: 'status',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <StatusColumn row={row} />
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
            <MemberDeleteConfirmation />
        </>
    )
}

export default MemberTable
