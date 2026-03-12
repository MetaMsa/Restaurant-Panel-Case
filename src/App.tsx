import { useState, useEffect } from "react";
import "./App.css";
import Cart from "./components/main/Cart.tsx";
import { useProducts } from "./hooks/useProducts.ts";
import { useOrders } from "./hooks/useOrders.ts";
import type { Product } from "./services/productService.ts";
import Modal from "./components/product/Modal.tsx";
import { serverTimestamp } from "firebase/firestore";
import Order from "./components/main/Order.tsx";

export type CartItem = Product & {
  quantity: number;
};

function App() {
  const [offset, setOffset] = useState<number>(0);
  const [type, setType] = useState<string>(() => {
    const savedType = localStorage.getItem("type");
    return savedType ? savedType : "BURGER";
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [product, setProduct] = useState<Product | null>(null);

  const [isPaying, setIsPaying] = useState<boolean>(false);

  const [paymentType, setPaymentType] = useState<string>("Nakit");
  const [orderType, setOrderType] = useState<string>("Paket");

  const [tableNumber, setTableNumber] = useState<string>("");

  const { products, deleteExistingProduct } = useProducts(type);

  const { createOrder } = useOrders();

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("type", type);
  }, [type]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (!existing) return prev;
      if (existing.quantity === 1)
        return prev.filter((p) => p.id !== product.id);
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p,
      );
    });
  };

  const handlePay = async () => {
    setIsPaying(true);
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const order = {
      paymentType: paymentType,
      orderType: orderType,
      tableNumber: orderType === "Masa" ? tableNumber : "",
      items: cart,
      total,
      createdAt: serverTimestamp(),
    };

    await createOrder(order);
    setCart([]);
    setIsPaying(false);
    window.location.reload();
  };

  return (
    <div>
      <main className="rounded-3 bg-white h-25">
        {isModalOpen && (
          <Modal
            onClose={() => {
              setIsModalOpen(false);
              setProduct(null);
            }}
            modalType={modalType}
            product={product}
            type={type}
            setCart={setCart}
          />
        )}

        <div
          style={{
            height: "30vh",
            backgroundImage: `url('./${type}.jpg')`,
            backgroundPosition: `center ${offset * 0.1 + 70}%`,
          }}
          className="d-flex justify-content-center align-items-center rounded-top-3"
        >
          <h1 className="text-white display-1">SUITABLE</h1>
        </div>

        <div>
          <button
            className="btn btn-success m-3"
            onClick={() => {
              setModalType("add");
              setIsModalOpen(true);
              setProduct(null);
            }}
          >
            Yeni Ürün Ekle
          </button>
        </div>

        <ul className="nav justify-content-center gap-3 p-3">
          {["BURGER", "PİZZA", "SALATA", "TATLI", "İÇECEK"].map((t) => (
            <li className="nav-item mx-5" key={t}>
              <button className="bg-info" onClick={() => setType(t)}>
                <h1>
                  {t === "BURGER"
                    ? "🍔"
                    : t === "PİZZA"
                      ? "🍕"
                      : t === "SALATA"
                        ? "🥗"
                        : t === "TATLI"
                          ? "🧁"
                          : "☕"}
                </h1>
              </button>
            </li>
          ))}
        </ul>
        <div className="fs-1">
        {type.toUpperCase()}
        </div>

        <div className="p-3 d-flex flex-wrap justify-content-center gap-2">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="card bg-info"
                style={{ width: "18rem" }}
              >
                <img
                  src={product.imageUrl || undefined}
                  className="card-img img-thumbnail h-50"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">{product.price.toFixed(2)}₺</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setProduct(product);
                      setModalType("edit");
                      setIsModalOpen(true);
                    }}
                  >
                    Güncelle 📝
                  </button>

                  <button
                    className="btn btn-danger ms-2"
                    onClick={async () => {
                      await deleteExistingProduct(product.id!);
                      setCart((prev) =>
                        prev.filter((item) => item.id !== product.id),
                      );
                    }}
                  >
                    Sil 🗑️
                  </button>

                  <br />

                  <button
                    className="btn btn-success m-2"
                    onClick={() => addToCart(product)}
                  >
                    {(() => {
                      const cartItem = cart.find(
                        (item) => item.id === product.id,
                      );
                      return cartItem
                        ? `Adet: ${cartItem.quantity} +`
                        : "Sepete Ekle 🛒";
                    })()}
                  </button>

                  {(() => {
                    const cartItem = cart.find(
                      (item) => item.id === product.id,
                    );
                    return (
                      cartItem && (
                        <button
                          className="btn btn-secondary"
                          onClick={() => removeFromCart(product)}
                        >
                          -
                        </button>
                      )
                    );
                  })()}
                </div>
              </div>
            ))
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Yükleniyor...</span>
            </div>
          )}
        </div>
      </main>

      <footer className="fixed-bottom d-flex">
        <Cart
          cart={cart}
          onClick={async () => await handlePay()}
          isPaying={isPaying}
          setPaymentType={setPaymentType}
          setOrderType={setOrderType}
          setTableNumber={setTableNumber}
          orderType={orderType}
        />
        <Order />
      </footer>
    </div>
  );
}

export default App;
