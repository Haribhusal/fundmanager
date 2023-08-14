import React, { useEffect, useState } from 'react'
import { Loading } from 'components/shared'
import Statistic from './Statistic'
import DefiReport from './DefiReport'
import DefiByCategories from './DefiByCategories'
import LatestOrder from './LatestOrder'
import TopProduct from './TopProduct'
import { getSalesDashboardData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { salesDashboardData } from 'mock/data/salesData'

const DefiDashboardBody = () => {
    const dispatch = useDispatch()
    const [item, setItem] = useState([])

    const {
        statisticData,
        salesReportData,
        topProductsData,
        latestOrderData,
        salesByCategoriesData,
    } = useSelector((state) => state.salesDashboard.data.dashboardData)
    // const loading = useSelector((state) => state.salesDashboard.data.loading)
    const loading = false;


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesDashboardData])

    const fetchData = () => {
        if(!salesDashboardData) return;
        setItem(salesDashboardData)
        // dispatch(getSalesDashboardData())
    }

    return (
        <Loading loading={loading}>
            <Statistic data={item.statisticData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DefiReport data={item.salesReportData} className="col-span-2" />
                <DefiByCategories data={item.salesByCategoriesData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <LatestOrder data={item.latestOrderData} className="lg:col-span-2" />
                <TopProduct data={item.topProductsData} />
            </div>
        </Loading>
    )
}

export default DefiDashboardBody
