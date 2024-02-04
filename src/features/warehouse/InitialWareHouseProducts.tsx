import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react'

export default function Component() {
    return (
        <div className="flex flex-col h-auto h-max-[500px] w-full">
            <header className="flex items-center justify-between h-16 px-4 bg-gray-100 dark:bg-gray-800">
                <h1 className="text-2xl font-semibold">Stock Management</h1>
                <form className="relative w-64">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
                        placeholder="Search items..."
                        type="search"
                    />
                </form>
            </header>
            <main className="flex-1 overflow-auto p-4">
                <ScrollArea className="h-full border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Apple</TableCell>
                                <TableCell>100</TableCell>
                                <TableCell>Fruits</TableCell>
                                <TableCell>$1.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ScrollArea>
            </main>
        </div>
    )
}

function SearchIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
