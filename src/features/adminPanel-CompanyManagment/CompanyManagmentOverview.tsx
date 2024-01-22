import React from 'react'
import { CardDescription, CardTitle, CardHeader, Card } from "@/components/ui/card"
import { CompanyManagmentOverviewData } from '@/data/adminManagment/CompanyManagmentOverviewData'
export const CompanyManagmentOverview = () => {

    return (
        <>
            {CompanyManagmentOverviewData.map(overviewData => (
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardDescription>{overviewData.text}</CardDescription>
                        <CardTitle>{overviewData.data}</CardTitle>
                    </CardHeader>
                </Card>))}
        </>
    )
}

