import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { changeQuantityOfFinishedProduct } from "../api/changeQuantityOfFinishedProduct"
import { api } from "@/lib/axios.interceptors"

export enum TypeOfAction {
    INC = "increase-quantity",
    DEC = "decrease-quantity"
}

type TProduct = {
    name: string;
    productId: number;
    quantity: number;
}

type TProductStorages = {
    productStorageId: number;
    price: number;
    productId: number;
    quantity: number;
    validityPeriod: number;
    product: TProduct
}

type TFinishedProducts = {
    costs: number;
    name: string;
    price: number;
    quantity: number;
    finishedProductId: number;
    totalCosts: number;
    totalPrice: number;
    createdAt: Date;
    productStorages: TProductStorages[]
}

export default function FinishProductsWareHouse() {
    const [finishedProducts, setFinishedProducts] = useState([]);
    const [isAddProductToggled, setIsAddProductToggled] = useState<boolean>(false);

    const [chosenProduct, setChosenProduct] = useState<number | null>();

    const getAllFinishedProducts = async () => {
        const URL = process.env.REACT_APP_URL + '/api/articles'
        try {
            const { data } = await api.get(URL)

            setFinishedProducts(data)
        } catch (error) {
            console.error(error)
            return error;
        }

    }

    useEffect(() => {
        getAllFinishedProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col w-full">
            <header className="flex items-center justify-between h-16 px-4 bg-gray-100 dark:bg-gray-800">
                <h1 className="text-2xl font-semibold">Finished Product's Management</h1>
                <div className="flex gap-5">
                    <Button variant={"outline"} onClick={() => setIsAddProductToggled(prev => !prev)}>{isAddProductToggled ? "Cancel" : "Create Finished Product based on the recipe"}</Button>
                    <form className="relative w-64">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
                            placeholder="Search items..."
                            type="search"
                        />
                    </form>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4">
                <div className="flex flex-col">
                    <div className="flex-1 mb-4">
                        <ScrollArea className="h-full border rounded-md">
                            <Label className="w-full flex justify-center mt-5 border-b border-gray-300 pb-5">Finished Product's</Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Cost</TableHead>
                                        <TableHead>Total Cost</TableHead>
                                        <TableHead>Total Price</TableHead>
                                        <TableHead>CreatedAt</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {finishedProducts.map((finishedProduct: TFinishedProducts) => (
                                        <TableRow className="cursor-pointer" onClick={() => setChosenProduct(finishedProduct.finishedProductId)} key={finishedProduct.finishedProductId}>
                                            <>
                                                <TableCell className="font-medium" >{finishedProduct.name}</TableCell>
                                                <TableCell>{finishedProduct.quantity}</TableCell>
                                                <TableCell>{finishedProduct.price}</TableCell>
                                                <TableCell>{finishedProduct.costs}</TableCell>
                                                <TableCell>{finishedProduct.totalCosts}</TableCell>
                                                <TableCell>{finishedProduct.totalPrice}</TableCell>
                                                <TableCell>{new Date(finishedProduct.createdAt).toLocaleString()}</TableCell>
                                                <TableCell className="flex">
                                                    <Button variant={'outline'}
                                                        onClick={() => changeQuantityOfFinishedProduct(finishedProduct.finishedProductId,
                                                            TypeOfAction.DEC,
                                                            1,
                                                            getAllFinishedProducts)}>Serve a meal</Button>
                                                </TableCell>
                                            </>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                    {!chosenProduct ? (
                        <div className="flex-1 w-full flex text-xl justify-center self-center">Select Product to see details</div>
                    ) : (
                        <div className="flex-3 h-[400px] border rounded-md">
                            <ScrollArea className="h-full">
                                <Label className="w-full flex justify-center mt-5 border-b border-gray-300 pb-5">Finished Product details.</Label>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Product Quantity</TableHead>
                                            <TableHead>Product Cost</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {finishedProducts.map((finishedProduct: TFinishedProducts) => (
                                            <React.Fragment key={finishedProduct.finishedProductId}>
                                                {chosenProduct === finishedProduct.finishedProductId && (
                                                    finishedProduct.productStorages.map((productDetails: TProductStorages) => (
                                                        <TableRow key={productDetails.productId}>
                                                            <TableCell className="font-medium">{productDetails.product.name}</TableCell>
                                                            <TableCell>{productDetails.quantity}</TableCell>
                                                            <TableCell>{productDetails.price}</TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        </div>
                    )}
                </div>
            </main >
            {
                isAddProductToggled && (
                    <div></div>
                )
            }

        </div >
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
