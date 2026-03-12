import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { type CartItem } from "../App";
import { FieldValue } from "firebase/firestore";

export interface Order {
  id?: string;
  paymentType: string;
  orderType: string;
  tableNumber?: string;
  items: CartItem[];
  total: number;
  createdAt?: Timestamp | FieldValue | null;
}

export const getOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as Order)
    .sort((a, b) => {
      const aTime =
        a.createdAt && "toMillis" in a.createdAt ? a.createdAt.toMillis() : 0;
      const bTime =
        b.createdAt && "toMillis" in b.createdAt ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
};

export const addOrder = async (order: Omit<Order, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding order: ", error);
    throw error;
  }
};
