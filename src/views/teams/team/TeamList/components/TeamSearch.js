import React, { useEffect, useRef } from 'react'
import { Input, Tooltip } from 'components/ui'
import { HiOutlineSearch, HiInformationCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getTeamData, setTableDataTeam } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { setRequestQuery } from '../../../../../utils/requestQuery'

const TeamSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.team.data.tableDataTeam
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        let newTableData = cloneDeep(tableData)
        newTableData     = setRequestQuery(newTableData, {q: val});
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableDataTeam(data))
        dispatch(getTeamData(data))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    useEffect(() => {
        searchInput.current.value = tableData.q
    }, [searchInput])


    return (
        <Input
            ref={searchInput}
            className="max-w-md lg:w-52 lg:mb-0 mb-4"
            size="sm"
            suffix={<Tooltip title="Search works on the basis of team name">
                <HiInformationCircle className="text-lg cursor-pointer" />
            </Tooltip>}
            placeholder="Search Team"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default TeamSearch
