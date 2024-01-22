import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

export const RaportHistory = () => {
    return (
        <div> <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Cost</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Report 1</TableCell>
                    <TableCell>2024-01-20</TableCell>
                    <TableCell>Product A</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$200</TableCell>
                </TableRow>
            </TableBody>
        </Table></div>
    )
}
