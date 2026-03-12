import { type Product } from "../../services/productService";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts.ts";
import type { CartItem } from "../../App.tsx";

export default function Modal({
  onClose,
  product,
  modalType,
  type,
  setCart,
}: {
  onClose: () => void;
  product: Product | null;
  modalType: "add" | "edit";
  type: string;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) {
  const [formData, setFormData] = useState(() => ({
    type: type,
    name: product?.name ?? "",
    price: product?.price ?? 0,
    description: product?.description ?? "",
    imageUrl: product?.imageUrl ?? "",
  }));
  const { addNewProduct, updateExistingProduct } = useProducts(type);

  return (
    <div className="modal show d-block" tabIndex={-1} onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modalType === "add" ? "Yeni Ürün Ekle" : "Ürünü Düzenle"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (modalType === "add") {
                  await addNewProduct(formData);
                } else {
                  await updateExistingProduct(product!.id!, formData);

                  setCart((prev) =>
                    prev.map((item) =>
                      item.id === product!.id ? { ...item, ...formData } : item,
                    ),
                  );
                }
                onClose();
                window.location.reload();
              }}
            >
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Ürün Tipi
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  id="productName"
                  value={formData.type}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Fiyat (₺)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">
                  Açıklama
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="productImage" className="form-label">
                  Resim
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="productImage"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({
                        ...formData,
                        imageUrl: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Kaydet
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
