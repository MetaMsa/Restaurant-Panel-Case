import { useState } from "react";
import { useOrders } from "../../hooks/useOrders.ts";
import { Timestamp } from "firebase/firestore";

function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { orders } = useOrders();

  return (
    <div className="w-50 mx-auto">
      <button
        className="btn btn-warning w-50 rounded-0 rounded-top-3 float-end"
        onClick={() => setIsOpen(!isOpen)}
      >
        Siparişler
      </button>

      <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""} bg-dark text-white`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        tabIndex={-1}
        id="offcanvasEnd"
        aria-labelledby="offcanvasEndLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasEndLabel">
            Restoran Sipariş Geçmişi 🕗
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order.id} className="my-3">
                  # {order.id} <br /> -{" "}
                  {order.items
                    .map((i) => {
                      return `${i.name} x ${i.quantity} (${(i.price * i.quantity).toFixed(2)}₺)`;
                    })
                    .join(", ")}{" "}
                  <br />
                  {order.paymentType} - {order.orderType}
                  {order.tableNumber && (` ${order.tableNumber}`)} <br />
                  {order.createdAt instanceof Timestamp
                    ? order.createdAt?.toDate().toLocaleString()
                    : "Tarih yok"}{" "}
                  <br />- Toplam:{" "} 
                  {order.items
                    .reduce(
                      (orderTotal, item) =>
                        orderTotal + item.price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                  ₺
                </li>
              ))
            ) : (
              <li className="spinner-border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </li>
            )}
          </ul>
          <p>
            Toplam:{" "}
            {" " +
              orders
                .reduce(
                  (total, order) =>
                    total +
                    order.items.reduce(
                      (orderTotal, item) =>
                        orderTotal + item.price * item.quantity,
                      0,
                    ),
                  0,
                )
                .toFixed(2)}
            ₺
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
