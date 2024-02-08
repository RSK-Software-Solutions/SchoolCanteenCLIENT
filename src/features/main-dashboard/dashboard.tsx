import React, { useEffect, useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import useAuthContext from "@/context/AuthContext";
import { Info } from "lucide-react";
import { getBasicStats } from "./api/getBasicStatistics";
import { dashboardCardData } from "./static/dashboardDardData";

type TData = {
    totalProducts: number;
    lowQuantitiesProducts: number;
    totalRecipes: number;
    totalFinishedProducts: number;
    exceededDateFinishedProducts: number;
};

const Dashboard = () => {
    const [data, setData] = useState<TData | null>(null);
    const user = useAuthContext();
    const setDataFromApi = async () => {
        setData(await getBasicStats());
    };


    useEffect(() => {
        setDataFromApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProperty = <T, K extends keyof T>(obj: T, key: K) => obj[key];

    return (
        <>
            {data && (
                <div key="1" className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 dark:bg-gray-800">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Witaj {user.user?.login}!</h2>
                            </div>
                        </header>
                        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800">
                            <div className="container px-6 py-8 mx-auto">
                                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                    {dashboardCardData.map((cardInfo) => (
                                        <Card key={cardInfo.label}>
                                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                                <CardTitle className="text-sm font-medium">{cardInfo.label}</CardTitle>
                                                <Info />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {getProperty(data, cardInfo.key as keyof TData)}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
