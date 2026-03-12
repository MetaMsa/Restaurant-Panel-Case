import { getOrders, addOrder, type Order } from "../services/orderService";
import { useState, useEffect } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const createOrder = async (order: Omit<Order, "id">) => {
    await addOrder(order);
    const fetchedOrders = await getOrders();
    setOrders(fetchedOrders);
  };

  return {
    orders,
    createOrder,
  };
};
