import React from 'react'
import { Button, Card, Progress } from 'components/ui'
import { HiDotsVertical } from 'react-icons/hi'
import { AiOutlineThunderbolt } from 'react-icons/ai/index'

const ProgressInfo = ({ precent }) => {
    return (
        <div>
            <h3 className="font-bold">{precent}%</h3>
            <p>Opened</p>
        </div>
    )
}

const CardHeader = ({ percent }) => (
    <div className="flex items-center justify-between">
        <div>
            <h4>Vendors Monitored</h4>
            <p>You’re using {percent}% of available spots.</p>
        </div>
        <Button size="sm" variant="plain" icon={<HiDotsVertical />} />
    </div>
)

const cardFooter = (
    <div className="flex justify-end">
        <Button className="mr-2" icon={<AiOutlineThunderbolt />}>
            <span>Upgrade plan</span>
        </Button>
    </div>
)

const VendorMonitoring = ({ data = [], className }) => {
    return (
        <Card
            className={className}
            header={<CardHeader percent={data.precent} />}
            footer={cardFooter}
        >
            <div className="mt-6">
                <Progress
                    variant="circle"
                    percent={data.precent}
                    width={200}
                    className="flex justify-center"
                    strokeWidth={4}
                    customInfo={<ProgressInfo precent={data.precent} />}
                />
            </div>
            <div className="mt-6">
                <h4 className="font-bold">You’ve almost reached your limit</h4>
                <p className="font-semibold">
                    You have used 80% of your available spots. Upgrade plan to
                    monitor more vendors.
                </p>
            </div>
        </Card>
    )
}

export default VendorMonitoring
