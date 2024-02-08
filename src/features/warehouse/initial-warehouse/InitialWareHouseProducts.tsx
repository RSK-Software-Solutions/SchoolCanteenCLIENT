import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Minus, Plus, SearchIcon, Trash } from "lucide-react"
import AddProductForm from "./add-products-form/AddProductForm"
import { changeQuantityOfProduct } from "../api/changeQuantityOfProduct"
import { deleteProduct } from "../api/delete-product"
import { api, baseApiURL } from "@/lib/axios.interceptors"
import { useToast } from "@/components/ui/use-toast"


export enum TypeOfAction {
    INC = "increase-quantity",
    DEC = "decrease-quantity"
}

export type TQuantity = {
    quantity: number;
}

type TUnit = {
    name: string
}

export type TProduct = {
    name: string;
    price: number;
    quantity: number;
    validityPeriod: number;
    minQuantity: number;
    unit: TUnit;
    productId: number;
}

export default function InitialWareHouseProducts() {
    const [products, setProducts] = useState([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [amount, setAmount] = useState<TQuantity>({
        quantity: 1,
    })
    const [isAddProductToggled, setIsAddProductToggled] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const { toast } = useToast();
    const getAllProducts = async () => {
        try {
            const { data } = await api.get(baseApiURL + `/api/products?name=${searchInput}`)
            if (searchInput) toast({ title: "SUCCESS", description: `Successfully searched for product's similar too: ${searchInput}` })
            if (!data) toast({ variant: "destructive", title: "FAILED", description: `product ${searchInput} not found` })
            if (data) {
                setProducts(data)
            }
        } catch (error) {
            toast({ variant: "destructive", title: "ERROR", description: `Error while fetching product's` })
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
                    <Button variant={"outline"} className={isAddProductToggled ? "hidden" : ""} onClick={(e) => {
                        e.preventDefault();
                        setIsAddProductToggled(prev => !prev);
                    }}>Add Product</Button>
                    <form className="relative w-64" onSubmit={(e) => {
                        e.preventDefault();
                        getAllProducts();
                    }}>
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

            </header >
            <>
                {isAddProductToggled && (
                    <AddProductForm getAllProducts={getAllProducts} setIsAddProductToggled={setIsAddProductToggled} />
                )}
            </>
            <main className="flex-1 overflow-auto p-4">
                <ScrollArea className="h-[500px] border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Min Quantity</TableHead>
                                <TableHead>Validity Period</TableHead>
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
                                    <TableCell>{product.minQuantity}</TableCell>
                                    <TableCell>{product.validityPeriod}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.unit.name}</TableCell>
                                    <TableCell className="flex">
                                        <Button variant={'outline'} onClick={() => changeQuantityOfProduct(product.productId, TypeOfAction.INC, amount, getAllProducts, toast)}><Plus /></Button>
                                        <Button variant={'outline'} onClick={() => changeQuantityOfProduct(product.productId, TypeOfAction.DEC, amount, getAllProducts, toast)}><Minus /></Button>
                                        <Button variant={'outline'} onClick={() => deleteProduct(product.productId, getAllProducts, toast)}><Trash /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </main>
        </div >
    )
}