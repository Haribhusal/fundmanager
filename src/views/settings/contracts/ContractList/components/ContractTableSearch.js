import React, { useRef } from 'react'
import { Input,Tooltip } from 'components/ui'
import { HiInformationCircle, HiOutlineSearch } from 'react-icons/hi'

import { useDispatch, useSelector } from 'react-redux'
import { getContracts, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'

const ContractTableSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector((state) => state.contractList.data.tableData)

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)
        newTableData.q = val
        newTableData.pageIndex = 1
        newTableData.offset = 0
        newTableData.limit = 10
        newTableData.sort_column = ''
        newTableData.sort_order = ''
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getContracts(data))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Search contract"
            suffix={
                <Tooltip title="Search works on the basis of name,address,chain and category">
                    <HiInformationCircle className="text-lg cursor-pointer" />
                </Tooltip>
            }
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default ContractTableSearch
