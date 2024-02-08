import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { api } from '@/lib/axios.interceptors';
import { Label } from '@radix-ui/react-label';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AddRecipeForm from "./add-recipe-form/AddRecipeForm"

type TUnit = {
  unitId: number;
  name: string;
};

type TProduct = {
  productId: number;
  unitId: number;
  unit: TUnit;
  name: string;
  price: number;
  quantity: number;
  validityPeriod: number;
  active: boolean;
};

type TRecipeDetail = {
  recipeDetailId: number;
  productId: number;
  product: TProduct;
  unitId: number;
  unit: TUnit;
  quantity: number;
};

type TRecipe = {
  recipeId: number;
  name: string;
  quantity: number;
  createdAt: string;
  details: TRecipeDetail[];
  validityPeriod: number;
};

type TFinishedProductCreate = {
  recipeId: number | null;
  quantity: number;
  profit: number;
};

const RecipesWareHouse = () => {
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [chosenRecipe, setChosenRecipe] = useState<number | null>(null);
  const [finishedProduct, setFinishedProduct] = useState<TFinishedProductCreate>({ recipeId : 0, quantity:0, profit :0 });
  const [detailsChosenRecipe, setDetailsChosenRecipe] = useState<TRecipeDetail[]>();
  const [isAddRecipeToggled, setIsAddRecipeToggled] = useState<boolean>(false);
  const [isCreateFinishedProductToggled, setIsCreateFinishedProductToggled] = useState<{ [key: string]: boolean }>({});

  const getAllRecipes = async () => {
    const URL = `${process.env.REACT_APP_URL}/api/recipes`;
    try {
      const { data } = await api.get(URL);
      setRecipes(data);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const getDetailsRecipe = async () => {
    if (chosenRecipe === null) return;

    const URL = `${process.env.REACT_APP_URL}/api/recipe?id=${chosenRecipe}`;
    try {
      const { data } = await api.get(URL);
      setDetailsChosenRecipe(data.details);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const createFinishedProduct = async () => {
    if (finishedProduct.quantity === 0) return;
    if (finishedProduct.recipeId === null) return;

    const URL = `${process.env.REACT_APP_URL}/api/article`;
    try {
      const { data } = await api.post(URL, finishedProduct );
      setDetailsChosenRecipe(data.details);
      handleCreateFinishedProduct(finishedProduct.recipeId);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const handleChangeInputProfit = (e : string) => {
    setFinishedProduct({
      ...finishedProduct,
      recipeId : chosenRecipe, 
      profit : parseInt(e)
    })
  }

  const handleChangeInputQuantity = (e : string) => {
    setFinishedProduct({
      ...finishedProduct,
      recipeId : chosenRecipe, 
      quantity : parseInt(e)
    })
  }
  const handleCreateFinishedProduct = (recipeId: number) => {
    setIsCreateFinishedProductToggled((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId], 
    }));
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  useEffect(() => {
    console.log(detailsChosenRecipe);
  }, [detailsChosenRecipe]);

  useEffect(() => {
    if (chosenRecipe !== null) {
      console.log(chosenRecipe);
      getDetailsRecipe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenRecipe]);
  
  console.log(finishedProduct);

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between h-16 px-4 bg-gray-100 dark:bg-gray-800 w-full">
        <h1 className="text-2xl font-semibold">Recipes</h1>
        <div className="flex gap-5">
          <Button variant={"outline"} className={isAddRecipeToggled ? "hidden" : ""} onClick={(e) => {
            e.preventDefault();
            setIsAddRecipeToggled(prev => !prev);
          }}>Create new recipe</Button>
          <form className="relative w-64" onSubmit={(e) => {
            e.preventDefault();
            getAllRecipes();
          }}>

            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
              placeholder="Search items..."
              type="search"
            />
          </form>
        </div>
      </header>
      <>
        {isAddRecipeToggled && (
          <AddRecipeForm getAllRecipes={getAllRecipes} setIsAddRecipeToggled={setIsAddRecipeToggled} />
        )}
      </>
      <main className="flex-1 overflow-auto p-4">
        <div className="flex flex-col">
          <div className="flex-1 mb-4">
            <ScrollArea className="h-full border rounded-md">
              <Label className="w-full flex justify-center mt-5 border-b border-gray-300 pb-5">Recipes</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-4/8">Recipe Name</TableHead>
                    <TableHead className="w-1/8">Quantity</TableHead>
                    <TableHead className="w-1/8">Validity Period [days]</TableHead>
                    <TableHead className="w-2/8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipes.map((recipe: TRecipe, index: number) => (
                    <TableRow
                      className="cursor-pointer"
                      onClick={() => setChosenRecipe(recipe.recipeId)}
                      key={recipe.recipeId}
                    >
                      <>
                        <TableCell className="font-medium w-4/8">{recipe.name}</TableCell>
                        <TableCell className="w-1/8">{recipe.quantity}</TableCell>
                        <TableCell className="w-1/8">{recipe.validityPeriod}</TableCell>
                        <TableCell className="w-2/8 grid grid-cols-4 gap-3">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCreateFinishedProduct(recipe.recipeId)}
                          >
                            {isCreateFinishedProductToggled[recipe.recipeId] ? "Cancel" : "Set Profit"}
                          </Button>
                          {isCreateFinishedProductToggled[recipe.recipeId] && ( 
                            <>
                                      <Input
                                      className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
                                      placeholder="profit %"
                                      type="number"
                                      onChange={(e) => handleChangeInputProfit(e.target.value)}
                                      />
                                      <Input
                                      className="pl-8 bg-white shadow-none appearance-none dark:bg-gray-950"
                                      placeholder="quantity"
                                      type="number"
                                      onChange={(e) => handleChangeInputQuantity(e.target.value)}
                                      />
                                      <Button size="sm"
                                      variant="outline"
                                      onClick={() => createFinishedProduct()}>Create based on this recipe</Button>
                            </>
                            )}
                        </TableCell>
                      </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
          {chosenRecipe !== null && (
            <div className="flex-3 h-[400px] border rounded-md">
              <ScrollArea className="">
                <Label className="w-full flex justify-center mt-5 border-b border-gray-300 pb-5">Recipe details</Label>
              </ScrollArea>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product Price</TableHead>
                    <TableHead>Product Quantity</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailsChosenRecipe?.map((detail: TRecipeDetail, index: number) => (
                    <TableRow key={index}>
                      {detail.product && (
                        <React.Fragment>
                          <TableCell>{detail.product.name}</TableCell>
                          <TableCell>{detail.product.price}</TableCell>
                          <TableCell>{detail.quantity}</TableCell>
                        </React.Fragment>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipesWareHouse;
