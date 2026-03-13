# Restaurant Panel Case

Bu proje **React + TypeScript + Firebase Firestore** kullanılarak geliştirilmiş basit bir **restoran sipariş panelidir**.
Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve sipariş oluşturabilir.

Proje bir **case çalışması** kapsamında geliştirilmiştir.

Live Demo:
https://restaurant-panel-1c568.web.app/

---

## Özellikler

* Kategoriye göre ürün listeleme
* Sepete ürün ekleme
* Sepette ürün miktarını artırma / azaltma
* Sepetten ürün kaldırma
* Sepetin **LocalStorage ile kalıcı olması**
* Sipariş oluşturma
* **Firebase Firestore** entegrasyonu

---

## Kullanılan Teknolojiler

* **React**
* **TypeScript**
* **Firebase Firestore**
* **Vite**
* **Bootstrap**

---

## Proje Yapısı

```id="j2h5dc"
src
 ├─ components
 │   ├─ main
 │   │   ├─ Cart.tsx
 │   │   └─ Order.tsx
 │   └─ product
 │       └─ Modal.tsx
 │
 ├─ hooks
 │   ├─ useProducts.ts
 │   └─ useOrders.ts
 │
 ├─ services
 │   ├─ orderService.ts
 │   └─ productService.ts
 │
 ├─ firebase
 │   └─ firebase.ts
 │
 └─ App.tsx
```

---

## Kurulum

Projeyi klonla

```id="v7hx4q"
git clone https://github.com/MetaMsa/Restaurant-Panel-Case.git
```

Bağımlılıkları yükle

```id="3ys0p1"
npm install
```

Projeyi çalıştır

```id="gl0s0e"
npm run dev
```

---

## Firebase Kurulumu

Bir Firebase projesi oluşturup aşağıdaki bilgileri `.env` dosyasına ekleyin.

```id="7r2a0n"
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Firestore Veri Yapısı

### products

```id="25nb5p"
products
  └─ productId
       name
       type
       price
       description
       imageUrl
       createdAt
```

### orders

```id="kegc96"
orders
  └─ orderId
       items
        └─name
          type
          price
          description
          imageUrl
          createdAt
       paymentType
       orderType
       tableNumber
       total
       createdAt
```

---

## Geliştirici

GitHub:
https://github.com/MetaMsa