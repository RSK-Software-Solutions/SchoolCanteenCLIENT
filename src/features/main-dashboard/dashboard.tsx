import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import useAuthContext from "@/context/AuthContext"
import { FolderIcon } from "lucide-react"
import React from 'react'

const Dashboard = () => {
    const user = useAuthContext()

    return (
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
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                                    <FolderIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">29</div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">+12.5% from last month</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard