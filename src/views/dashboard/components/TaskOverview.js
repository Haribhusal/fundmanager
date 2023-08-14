import React, { useState, useEffect } from 'react'
import { Card, Button } from 'components/ui'
import { Loading } from 'components/shared'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import isEmpty from 'lodash/isEmpty'
import { useSelector } from 'react-redux'
import { HiDotsVertical } from 'react-icons/hi'

const CardHeader = () => (
    <div className="flex items-center justify-between">
        <div>
            <h4>Vendor Breakdown</h4>
            <p>Keep track of vendors and their security ratings.</p>
        </div>
        <Button size="sm" variant="plain" icon={<HiDotsVertical />} />
    </div>
)

const cardFooter = (
    <div className="flex justify-end">
        <Button className="mr-2">
            <span>View full report</span>
        </Button>
    </div>
)

const TaskOverview = ({ data = {}, className }) => {
    const [timeRange, setTimeRange] = useState(['weekly'])

    const [repaint, setRepaint] = useState(false)

    const sideNavCollapse = useSelector(
        (state) => state.theme.layout.sideNavCollapse
    )

    useEffect(() => {
        setRepaint(true)
        const timer1 = setTimeout(() => setRepaint(false), 300)

        return () => {
            clearTimeout(timer1)
        }
    }, [data, sideNavCollapse])

    return (
        <Card className={className} header={<CardHeader />} footer={cardFooter}>
            {!isEmpty(data) && !repaint && (
                <Chart
                    series={data.chart[timeRange[0]].series}
                    xAxis={data.chart[timeRange[0]].range}
                    type="bar"
                    customOptions={{
                        colors: [COLORS[0], COLORS[2]],
                        legend: { show: false },
                    }}
                    height={303}
                />
            )}
            <Loading loading={repaint} type="cover">
                {repaint && <div className="h-[300px]" />}
            </Loading>
        </Card>
    )
}

export default TaskOverview
