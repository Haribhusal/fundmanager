import React, { useEffect, useRef, useState } from 'react'
import { Input, Tooltip } from 'components/ui'
import { HiInformationCircle, HiOutlineSearch } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { getMembers, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { useLocation } from 'react-router-dom'
import { setRequestQuery } from 'utils/requestQuery'

const MemberTableSearch = () => {
    const dispatch = useDispatch()
    const searchInput = useRef()

    const tableData = useSelector((state) => state.memberList.data.tableData)
    const debounceFn = debounce(handleDebounceFn, 500)

    const location = useLocation()

    const [id, setId] = useState()

    useEffect(() => {
        const id = location.pathname.split('/')[2]

        setId(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    function handleDebounceFn(val) {
        let newTableData = cloneDeep(tableData)
        console.log({newTableData},{tableData})
        newTableData = setRequestQuery(newTableData, { q: val })
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        const { pageIndex, offset, limit, sort_column, sort_order, q, total } =
            data
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

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    useEffect(() => {
        searchInput.current.value = tableData.q
    }, [searchInput, tableData.q])

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search member"
            suffix={
                <Tooltip title="Search works on the basis of name and email">
                    <HiInformationCircle className="text-lg cursor-pointer" />
                </Tooltip>
            }
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default MemberTableSearch
