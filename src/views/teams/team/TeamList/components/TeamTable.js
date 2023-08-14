import React, { useEffect, useMemo } from 'react'
import AccountSvg from '../../../../../assets/svg/accounts'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getTeamData, setTableDataTeam } from '../store/dataSlice'
import { setSortedColumn } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'components/ui'

const TeamColumn = ({ row }) => {
    const navigate = useNavigate()

    const toMembers = () => {
        navigate(`/teams/${row?._id}/members`)
    }

    const avatar = row.color ? (
        <AccountSvg color={row.color} />
    ) : (
        <AccountSvg color="#CCCCCC" />
    )
    return (
        <div className="flex items-center w-52">
            {avatar}
            <span
                className={`ml-2 rtl:mr-2 font-semibold cursor-pointer`}
                onClick={toMembers}
            >
                {row.name}
            </span>
        </div>
    )
}

const AccountColumn = ({ row }) => {
    const navigate = useNavigate()
    const visibleAccounts = row.accounts.slice(0, 3)

    const handleMoreClick = () => {
        console.log(`/teams/${row._id}/accounts`)
        navigate(`/teams/${row._id}/accounts`)
    }

    return (
        <div className="w-52">
            {visibleAccounts.length
                ? visibleAccounts.map((account, index) => (
                      <div className="flex items-center mt-1" key={index}>
                          <Tooltip title={account.name}>
                              <AccountSvg color={account.account_color} />
                          </Tooltip>
                          <span className="ml-2">{account.name}</span>
                      </div>
                  ))
                : '--'}
            {row.accounts.length > 3 && (
                <div className="flex items-center mt-1">
                    <button className="text-blue-500" onClick={handleMoreClick}>
                        + {row.accounts.length - 3} more
                    </button>
                </div>
            )}
        </div>
    )
}

const MemberColumn = ({ row }) => {
    const navigate = useNavigate()
    const visibleMembers = row.members.slice(0, 3)

    const handleMoreClick = () => {
        console.log(`/teams/${row._id}/members`)
        navigate(`/teams/${row._id}/members`)
    }

    return (
        <div className="w-52">
            {visibleMembers.length
                ? visibleMembers.map((member, index) => (
                      <div className="flex items-center mt-1" key={index}>
                          <Tooltip title={member._id}>
                              <AccountSvg color={member.color} />
                          </Tooltip>
                          <span className="ml-2">{member.name}</span>
                      </div>
                  ))
                : '--'}
            {row.members.length > 3 && (
                <div className="flex items-center mt-1">
                    <button className="text-blue-500" onClick={handleMoreClick}>
                        + {row.members.length - 3} more
                    </button>
                </div>
            )}
        </div>
    )
}

const TeamTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
        useSelector((state) => state.team.data.tableDataTeam)

    const loading = useSelector((state) => state.team.data.loading)
    const dataTeam = useSelector((state) => state.team.data.teamList)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, offset, limit, sort_column, sort_order, q, total])

    const tableDataTeam = useMemo(
        () => ({ pageIndex, offset, limit, sort_column, sort_order, q, total }),
        [pageIndex, offset, limit, sort_column, sort_order, q, total]
    )
    const fetchData = () => {
        dispatch(
            getTeamData({
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
                    return <TeamColumn row={row} />
                },
            },
            {
                Header: 'Accounts',
                accessor: 'accounts',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <AccountColumn row={row} />
                },
            },
            {
                Header: 'Members',
                accessor: 'members',
                sortable: false,
                Cell: (props) => {
                    const row = props.row.original
                    return <MemberColumn row={row} />
                },
            },
            {
                Header: 'Created Date',
                accessor: 'createdAt',
                sortable: true,
                Cell: (props) => {
                    const { createdAt } = props.row.original
                    return (
                        <div className="flex items-center">
                            {createdAt ? (
                                <>{dayjs(createdAt).format('MM/DD/YYYY')}</>
                            ) : (
                                createdAt
                            )}
                        </div>
                    )
                },
            },
        ],
        []
    )
    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableDataTeam)
        newTableData.pageIndex = page
        newTableData.offset = (newTableData.pageIndex - 1) * newTableData.limit
        dispatch(setTableDataTeam(newTableData))
    }
    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableDataTeam)
        newTableData.limit = Number(value)
        newTableData.pageIndex = 1
        newTableData.offset = 0
        dispatch(setTableDataTeam(newTableData))
    }
    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableDataTeam)
        newTableData.sort_column = sort.key
        newTableData.sort_order = sort.order
        dispatch(setTableDataTeam(newTableData))
        dispatch(setSortedColumn(sortingColumn))
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={dataTeam}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableDataTeam}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </>
    )
}

export default TeamTable
