import React, { useEffect, useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getProjectDashboardData } from './store/dataSlice'
import { Loading } from 'components/shared'
import ProjectDashboardHeader from './components/ProjectDashboardHeader'
import TaskOverview from './components/TaskOverview'
import MyTasks from './components/MyTasks'
import { useDispatch, useSelector } from 'react-redux'
import VendorMonitoring from './components/VendorMonitoring'
import { projectDashboardData } from 'mock/data/projectData'

injectReducer('projectDashboard', reducer)

const ProjectDashboard = () => {
    const dispatch = useDispatch()
    const [item, setItem] = useState([])

    const emailSentData = {
        precent: 50
    }

    const {
        userName,
        taskCount,
        projectOverviewData,
        myTasksData,
    } = useSelector((state) => state.projectDashboard.data.dashboardData)
    // const loading = useSelector((state) => state.projectDashboard.data.loading)
    const loading = false;
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectDashboardData])

    const fetchData = () => {
        if(!projectDashboardData) return;
        setItem(projectDashboardData)
        // dispatch(getProjectDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <ProjectDashboardHeader data={{ userName, taskCount }} />
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-auto">
                        <TaskOverview data={item.projectOverviewData} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="xl:w-[380px]">
                            <VendorMonitoring className="xl:col-span-2" data={emailSentData} />
                        </div>
                    </div>
                </div>
                <div>
                    <MyTasks data={item.myTasksData} />
                </div>
            </Loading>
        </div>
    )
}

export default ProjectDashboard
