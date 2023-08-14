import React, { useRef } from 'react'
import { Input, Tooltip } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getExchanges, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { HiInformationCircle, HiOutlineSearch } from 'react-icons/hi'
import { setRequestQuery } from '../../../../../utils/requestQuery'

const ExchangesSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.exchanges.data.tableData
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
        dispatch(setTableData(data))
        dispatch(getExchanges(data))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md lg:w-52 lg:mb-0 mb-4"
            size="sm"
            suffix={<Tooltip title="Search works on the basis of name, provider, category and type">
                <HiInformationCircle className="text-lg cursor-pointer" />
            </Tooltip>}
            placeholder="Search Exchange"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}

        />
    )
}

export default ExchangesSearch
