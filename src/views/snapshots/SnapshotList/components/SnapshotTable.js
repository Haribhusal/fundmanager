import React, { useEffect, useMemo } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { RxPencil2 } from 'react-icons/rx'

import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getSnapShots, setTableData } from '../store/dataSlice'
import {
    setSortedColumn,
    setSelectedSnapShot,
    setDrawerOpen,
    toggleEditConfirmation,
} from '../store/stateSlice'
import { Tooltip } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import SnapshotEditDialog from './SnapshotEditDialog'

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(toggleEditConfirmation(true))
        dispatch(setSelectedSnapShot(row))
    }

    return (
        <div className="flex text-lg">
            <span
                className="cursor-pointer px-2 hover:text-red-500"
                onClick={onEdit}
            >
                <Tooltip title="view">
                    <HiOutlineEye />
                </Tooltip>
            </span>
        </div>
    )
}

const ExportColumn = ({ row }) => {
    return (
        <div className="flex items-center">
            <span className={` rtl:mr-2`}>Export</span>
        </div>
    )
}

const SnapshotColumn = ({ row }) => {
    return (
        <div className="flex items-center w-52">
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.status}</span>
        </div>
    )
}

const PortfolioNetWorth = ({ row }) => {
    return (
        <div className="cursor-pointer">
            <Tooltip title={row.portfoilo_networth}>
                <NumberFormat
                    displayType="text"
                    value={(
                        Math.round(row.portfoilo_networth * 100) / 100
                    ).toFixed(2)}
                    suffix={' USD'}
                    thousandSeparator={true}
                />
            </Tooltip>
        </div>
    )
}

const NoteColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedSnapShot(row))
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

const SnapshotTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.snapShotList.data.tableData)

    const loading = useSelector((state) => state.snapShotList.data.loading)
    const data = useSelector((state) => state.snapShotList.data.snapShotsList)
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
            getSnapShots({
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
                accessor: 'status',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <SnapshotColumn row={row} />
                },
            },
            {
                Header: 'Date',
                accessor: 'sync_time',
                sortable: true,
                Cell: (props) => {
                    const { sync_time } = props.row.original
                    return (
                        <div className="flex items-center">
                            {sync_time ? (
                                <>
                                    {dayjs(sync_time).format(
                                        'M/D/YYYY h:mm:ss A'
                                    )}
                                </>
                            ) : (
                                <>--</>
                            )}
                        </div>
                    )
                },
            },
            {
                Header: 'Portfolio Networth',
                accessor: 'portfoilo_networth',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <PortfolioNetWorth row={row} />
                },
            },
            {
                Header: 'Note',
                accessor: 'note',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <NoteColumn row={row} />
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
            <SnapshotEditDialog />
        </>
    )
}

export default SnapshotTable
