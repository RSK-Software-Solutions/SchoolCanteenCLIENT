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
                <TableRow>
                    <TableCell>Report 2</TableCell>
                    <TableCell>2024-01-19</TableCell>
                    <TableCell>Product B</TableCell>
                    <TableCell>Jane Doe</TableCell>
                    <TableCell>$150</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Report 3</TableCell>
                    <TableCell>2024-01-18</TableCell>
                    <TableCell>Product C</TableCell>
                    <TableCell>John Smith</TableCell>
                    <TableCell>$250</TableCell>
                </TableRow>
            </TableBody>
        </Table></div>
    )
}
