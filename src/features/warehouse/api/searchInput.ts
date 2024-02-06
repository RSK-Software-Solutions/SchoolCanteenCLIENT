export const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, getAllProducts: () => Promise<unknown>) => {
    e.preventDefault();
    getAllProducts();
}