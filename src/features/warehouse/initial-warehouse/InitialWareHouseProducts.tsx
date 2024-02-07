import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Minus, Plus, SearchIcon, Trash } from "lucide-react"
import AddProductForm from "./add-products-form/AddProductForm"
import { changeQuantityOfProduct } from "../api/changeQuantityOfProduct"
import { deleteProduct } from "../api/delete-product"
import { handleSearchSubmit } from "../api/searchInput"


export enum TypeOfAction {
    INC = "increase-quantity",
    DEC = "decrease-quantity"
}

type TUnit = {
    name: string
}

export type TProduct = {
    name: string;
    price: number;
    quantity: number;
    unit: TUnit;
    productId: number;
}

export default function InitialWareHouseProducts() {
    const [products, setProducts] = useState([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [amount, setAmount] = useState({
        quantity: 1,
    })
    const [isAddProductToggled, setIsAddProductToggled] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const token = localStorage.getItem('token')

    const getAllProducts = async () => {
        const URL = process.env.REACT_APP_URL + `/api/products?name=${searchInput}`
        try {
            const { data } = await axios.get(URL, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setProducts(data)
        } catch (error) {
            console.error(error)
            return error;
        }
    }


    useEffect(() => {
        getAllProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col w-full">
            <header className="flex items-center justify-between h-16 px-4 bg-gray-100 dark:bg-gray-800">
                <h1 className="text-2xl font-semibold">Stock Management</h1>

                <div className="flex gap-5">
                    <Button variant={"outline"} onClick={(e) => {
                        e.preventDefault()
                        setIsAddProductToggled(prev => !prev)
                    }}>{isAddProductToggled ? "Anuluj" : "Dodaj Produkt"}</Button>
                    <form className="relative w-64" onSubmit={(e) => handleSearchSubmit(e, getAllProducts)}>
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
                            placeholder="Search products..."
                            type="search"
                        />
                    </form>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4">
                <ScrollArea className="h-[500px] border rounded-md">
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
                                <TableRow key={product.productId}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.unit.name}</TableCell>
                                    <TableCell className="flex">
                                        <Button variant={'outline'} onClick={() => changeQuantityOfProduct(product.productId, TypeOfAction.INC, amount.quantity, token, getAllProducts)}><Plus /></Button>
                                        <Button variant={'outline'} onClick={() => changeQuantityOfProduct(product.productId, TypeOfAction.DEC, amount.quantity, token, getAllProducts)}><Minus /></Button>
                                        <Button variant={'outline'} onClick={() => deleteProduct(product.productId, token, getAllProducts)}><Trash /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </main>
            {isAddProductToggled && (
                <AddProductForm getAllProducts={getAllProducts} setIsAddProductToggled={setIsAddProductToggled} />
            )}
        </div>
    )
}

