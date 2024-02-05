import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"

type TUnit = {
    name: string
}

type TProduct = {
    name: string;
    price: number;
    quantity: number;
    unit: TUnit;
    productId: number;
}

export default function Component() {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        const URL = process.env.REACT_APP_URL + '/api/products'
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.get(URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setProducts(data)
            console.log(data);

        } catch (error) {
            console.error(error)
            return error;
        }

    }

    const incrementQuantityOfProduct = async (productId: number) => {
        const URL = process.env.REACT_APP_URL + `/api/product/${productId}/increase-quantity`
        try {
            await axios.post(URL,)
        } catch (error) {
            console.error(error)
            return error;
        }
    }


    useEffect(() => {
        getAllProducts()
    }, [])

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
                                <TableHead>Price</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product: TProduct) => (
                                <TableRow>
                                    <>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.unit.name}</TableCell>
                                        <TableCell className="flex">
                                            <Button variant={'outline'} onClick={() => incrementQuantityOfProduct(product.productId)}>Inc</Button>
                                            <Button variant={'outline'}>Dec</Button>
                                        </TableCell>
                                    </>
                                </TableRow>
                            ))}
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
