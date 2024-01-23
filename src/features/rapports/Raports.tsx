import React from "react"
import { RaportHistory } from "./History.tsx/RaportHistory"
import { RaportsGenerator } from "./Generator/RaportsGenerator"

export const Raports = () => {
    return (
        <div key="1" className="flex h-screen">
            <div className="flex flex-col flex-1 overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-6 py-8">
                        <h3 className=" text-3xl font-medium dark:text-white">Report Form</h3>
                        <div className="mt-8">
                            <RaportsGenerator />
                        </div>
                        <h3 className="text-3xl font-medium dark:text-white">Report History</h3>
                        <div className="mt-8">
                            <RaportHistory />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

