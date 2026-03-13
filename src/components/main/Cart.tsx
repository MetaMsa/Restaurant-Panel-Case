import { useState } from "react";
import type { CartItem } from "../../App.tsx";

function Footer({
  cart,
  isPaying,
  onClick,
  setPaymentType,
  setOrderType,
  orderType,
  setTableNumber,
}: {
  cart: CartItem[];
  onClick: () => void;
  isPaying: boolean;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
  setOrderType: React.Dispatch<React.SetStateAction<string>>;
  orderType: string;
  setTableNumber: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-50 mx-auto">
      <button
        className="btn btn-warning w-50 rounded-0 rounded-top-3 float-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sepet
      </button>

      <div
        className={`offcanvas offcanvas-start ${isOpen ? "show" : ""} bg-dark text-white`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        tabIndex={-1}
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">
            Sepet 🛒
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body small p-3">
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x {item.price.toFixed(2)}₺ ={" "}
                {(item.quantity * item.price).toFixed(2)}₺
              </li>
            ))}
          </ul>
          <p>
            Toplam:
            {" " +
              cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            ₺
          </p>
          <div className="mb-3">
            <label htmlFor="paymentType" className="form-label">
              Ödeme Türü
            </label>
            <select
              id="paymentType"
              className="form-select bg-dark text-white"
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="Nakit">Nakit</option>
              <option value="Kart">Kart</option>
            </select>
            <label htmlFor="orderType" className="form-label">
              Sipariş Türü
            </label>
            <select
              id="orderType"
              className="form-select bg-dark text-white"
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="Paket">Paket</option>
              <option value="Masa">Masa</option>
            </select>
            {orderType === "Masa" && (
              <div className="mt-2">
                <label htmlFor="tableNumber" className="form-label">
                  Masa Numarası
                </label>
                <input
                  type="text"
                  id="tableNumber"
                  className="form-control bg-dark text-white"
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            )}
          </div>
          <button
            className="btn btn-success w-50"
            disabled={cart.length === 0 || isPaying}
            onClick={onClick}
          >
            {isPaying ? "Ödeme Yapılıyor..." : "Ödeme Yap"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
