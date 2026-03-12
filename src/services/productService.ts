import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, type Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface Product {
  id?: string;
  createdAt?: Timestamp;
  type: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const getProducts = async (type: string): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product)).filter((product) => product.type === type).sort((a, b) => (a.createdAt && b.createdAt ? b.createdAt.toMillis() - a.createdAt.toMillis() : 0));
};

export const addProduct = async (
  product: Omit<Product, "id">,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "products"), { ...product, createdAt: serverTimestamp() });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  updatedProduct: Partial<Omit<Product, "id">>,
): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, { ...updatedProduct, createdAt: serverTimestamp() });
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};
