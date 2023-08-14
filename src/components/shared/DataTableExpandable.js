import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination, Select } from 'components/ui'
import TableRowSkeleton from './loaders/TableRowSkeleton'
import Loading from './Loading'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const DataTableExpandable = (props) => {
    const {
        skeletonAvatarColumns,
        columns,
        data,
        loading,
        onPaginationChange,
        onSelectChange,
        // onSort,
        pageSizes,
        skeletonAvatarProps,
        pagingData,
    } = props
    const [expanded, setExpanded] = useState({})
    const [sorting, setSorting] = React.useState([])

    const { limit, pageIndex, total } = pagingData

    const pageSizeOption = useMemo(
        () =>
            pageSizes.map((number) => ({
                value: number,
                label: `${number} / page`,
            })),
        [pageSizes]
    )

    // const handleSort = (column) => {
    //     const { id } = column
    //     const isDesc = sorting.id === id && sorting.isSortedDesc
    //     const direction = isDesc ? 'asc' : 'desc'
    //     setSorting({ id, isSorted: true, isSortedDesc: !isDesc })

    //     if (!loading) {
    //       onSort({ order: direction, key: id }, { id, clearSortBy: () => setSorting({}) })
    //     }
    // }

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
            sorting,
        },
        onExpandedChange: setExpanded,
        onSortingChange: setSorting,
        getSubRows: (row) => row.portfolio_item_list,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const handlePaginationChange = (page) => {
        if (!loading) {
            onPaginationChange?.(page)
        }
    }

    const handleSelectChange = (value) => {
        if (!loading) {
            onSelectChange?.(Number(value))
        }
    }

    return (
        <Loading loading={loading && data.length !== 0} type="cover">
            <Table compact={true}>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.column.columnDef.sortable ? (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        ) : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                {loading && data.length === 0 ? (
                    <TableRowSkeleton
                        columns={columns.length}
                        rows={pagingData.limit}
                        avatarInColumns={skeletonAvatarColumns}
                        avatarProps={skeletonAvatarProps}
                    />
                ) : (
                    <TBody>

                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}

                    </TBody>
                )}
            </Table>
            {!loading && data.length === 0 && (
                <div className="mt-8">
                    <div className="flex items-center justify-center">
                        No records found!
                    </div>
                </div>
            )}
            {data.length !== 0 && (
                <div className="flex items-center justify-between mt-4">
                    <Pagination
                        limit={limit}
                        currentPage={pageIndex}
                        total={total}
                        onChange={handlePaginationChange}
                    />
                    <div style={{ minWidth: 130 }}>
                        <Select
                            size="sm"
                            menuPlacement="top"
                            isSearchable={false}
                            value={pageSizeOption.filter(
                                (option) => option.value === limit
                            )}
                            options={pageSizeOption}
                            onChange={(option) =>
                                handleSelectChange(option.value)
                            }
                        />
                    </div>
                </div>
            )}
        </Loading>
    )
}

DataTableExpandable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    loading: PropTypes.bool,
    onPaginationChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    // onSort: PropTypes.func,
    pageSizes: PropTypes.arrayOf(PropTypes.number),
    skeletonAvatarColumns: PropTypes.arrayOf(PropTypes.number),
    skeletonAvatarProps: PropTypes.object,
    pagingData: PropTypes.shape({
        total: PropTypes.number,
        pageIndex: PropTypes.number,
        limit: PropTypes.number,
    }),
}

DataTableExpandable.defaultProps = {
    pageSizes: [10, 25, 50, 100],
    pagingData: {
        total: 0,
        pageIndex: 1,
        limit: 10,
    },
    data: [],
    columns: [],
    loading: false,
}

export default DataTableExpandable
