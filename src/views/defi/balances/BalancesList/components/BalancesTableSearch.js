import React, { useEffect, useRef } from 'react'
import { Input, Tooltip } from 'components/ui'
import { HiInformationCircle, HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getBalances, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { setRequestQuery } from '../../../../../utils/requestQuery'

const BalancesTableSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.defiBalancesList.data.tableData
    )

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val) {
        let newTableData = cloneDeep(tableData)
        newTableData = setRequestQuery(newTableData, { q: val });
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getBalances(data))
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
            placeholder="Search Balance"
            suffix={<Tooltip title="Search works on the basis of wallet name, account, balance">
                <HiInformationCircle className="text-lg cursor-pointer" />
            </Tooltip>}
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default BalancesTableSearch
