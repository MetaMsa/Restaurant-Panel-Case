import { useEffect, useState } from "react"
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  type Product
} from "../services/productService"

export const useProducts = (type: string) => {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts(type);
      setProducts(data);
    }

    loadProducts()
  }, [type])

  const addNewProduct = async (product: Omit<Product, "id">) => {
    await addProduct(product);
    const data = await getProducts(type);
    setProducts(data);
  }

  const updateExistingProduct = async (id: string, updatedProduct: Omit<Product, "id">) => {
    await updateProduct(id, updatedProduct);
    const data = await getProducts(type);
    setProducts(data);
  }

  const deleteExistingProduct = async (id: string) => {
    await deleteProduct(id);
    const data = await getProducts(type);
    setProducts(data);
  }

  return {
    products,
    addNewProduct,
    updateExistingProduct,
    deleteExistingProduct
  }
}