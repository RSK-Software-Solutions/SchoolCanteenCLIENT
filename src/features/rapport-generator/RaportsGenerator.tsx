import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export const RaportsGenerator = () => {
    return (
        <form>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <Input id="reportTitle" placeholder="Report Title" />
                <Input id="reportDate" type="date" />
                <Input id="productName" placeholder="Product Name" />
                <Input id="buyerName" placeholder="Buyer Name" />
                <Input id="productCost" placeholder="Product Cost" />
                <Textarea className="col-span-2" id="reportDetails" placeholder="Report Details" />
                <Button className="col-span-2">Download Report</Button>
            </div>
        </form>
    )
}


