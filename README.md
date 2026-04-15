<div align="center">
  <img src="client/src/assets/Logo/InStock-Logo_2x.png" alt="InStock Logo" width="300"/>

  <h1>InStock — Inventory Management System</h1>

  <p>A full-stack web application for managing warehouses and inventory items in real time.</p>

  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=flat-square)
  ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white&style=flat-square)
  ![MySQL](https://img.shields.io/badge/MySQL-Knex.js-4479A1?logo=mysql&logoColor=white&style=flat-square)
  ![SASS](https://img.shields.io/badge/Styles-SASS-CC6699?logo=sass&logoColor=white&style=flat-square)

</div>

---

## 👥 Team Members

| Name | Role | GitHub |
|------|------|--------|
| **Vasudha** | Scrum Master | [@Vasudha0405](https://github.com/Vasudha0405) |
| **Thejaswini M** |  Customer(Product Owner) | — |
| **Vidhula Shree Shankar** |  Developer | — |
| **Vidya Mathad** |  Developer | [@vidyaMatadh](https://github.com/vidyaMatadh) |
| **Yuktha D** |  Developer | — |
| **Bharath M Gowda** | Tester | — |

---

## 📸 Screenshots

### Warehouse Page
![Warehouse Page](client/src/assets/Screenshots/inStock_warehouse-page.png)

### Inventory Page
![Inventory Page](client/src/assets/Screenshots/inStock_inventory-page.png)

### Add Warehouse
![Add Warehouse](client/src/assets/Screenshots/inStock_add-warehouse.png)

### Edit Warehouse
![Edit Warehouse](client/src/assets/Screenshots/inStock_edit-warehouse.png)

### Delete Warehouse
![Delete Warehouse](client/src/assets/Screenshots/inStock_delete-warehouse.png)

### Add Inventory Item
![Add Inventory](client/src/assets/Screenshots/inStock_add-inventory.png)

### Edit Inventory Item
![Edit Inventory](client/src/assets/Screenshots/inStock_edit-inventory.png)

### Delete Inventory Item
![Delete Inventory](client/src/assets/Screenshots/inStock_delete-inventory.png)

### Additional Screenshots
![Screenshot 1](DOCUMENTATION/Screenshot%202026-02-19%20122718.png)
![Screenshot 2](DOCUMENTATION/Screenshot%202026-02-19%20122846.png)
![Screenshot 3](DOCUMENTATION/Screenshot%202026-02-19%20122902.png)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router v6, Axios, SASS/BEM |
| Backend | Node.js, Express.js |
| Database | MySQL with Knex.js ORM |
| Tools | Postman, Jira, Figma, Git/GitHub |

---

## ✨ Features

- View all warehouses and inventory items
- Add, edit, and delete warehouses
- Add, edit, and delete inventory items
- View inventory list per warehouse
- Real-time validation on all forms
- Responsive design for all screen sizes
- Full CRUD REST API backend

---

## 📋 Prerequisites

- Node.js v14+
- MySQL v5.7+ (MySQL 8 also supported)
- npm

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/Vasudha0405/INVENTORY-MANAGEMENT-SYSTEM.git
cd INVENTORY-MANAGEMENT-SYSTEM
```

### 2. Create MySQL Database

```sql
-- Inside MySQL prompt (mysql -u root -p)
CREATE DATABASE instockmp2;
exit;
```

### 3. Configure environment variables

**Backend:**
```bash
cd server
cp .env.sample .env
```

Edit `server/.env`:
```env
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=your_mysql_password
DB_LOCAL_DBNAME=instockmp2
DB_HOST=127.0.0.1
PORT=8080
CORS_ORIGIN=http://localhost:3000
```

**Frontend:**
```bash
cd client
cp .env.sample .env
```

`client/.env` should contain:
```env
REACT_APP_API_URL=http://localhost:8080
PORT=3000
```

### 4. Install dependencies

```bash
# Install all at once (from root)
npm run install:all

# Or install separately:
cd server && npm install
cd ../client && npm install
```

### 5. Run database migrations and seed data

```bash
cd server
npm run db:migrate   # creates tables
npm run db:seed      # loads sample data
```

---

## ▶️ Running the Application

Open **two terminals**:

**Terminal 1 — Backend (port 8080):**
```bash
cd server
npm start
```

**Terminal 2 — Frontend (port 3000):**
```bash
cd client
npm start
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 API Endpoints

### Warehouses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/warehouses` | List all warehouses |
| GET | `/warehouses/:id` | Get a single warehouse |
| GET | `/warehouses/:id/inventories` | Get inventory for a warehouse |
| POST | `/warehouses` | Add a new warehouse |
| PUT | `/warehouses/:id` | Update a warehouse |
| DELETE | `/warehouses/:id` | Delete a warehouse |

### Inventories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/inventories` | List all inventory items |
| GET | `/inventories/:id` | Get a single inventory item |
| POST | `/inventories` | Add a new inventory item |
| PUT | `/inventories/:id` | Update an inventory item |
| DELETE | `/inventories/:id` | Delete an inventory item |

---

## 📁 Project Structure

```
INVENTORY-MANAGEMENT-SYSTEM/
├── client/                        # React frontend
│   ├── src/
│   │   ├── assets/
│   │   │   ├── Logo/              # App logo
│   │   │   └── Screenshots/       # App screenshots
│   │   ├── components/
│   │   │   ├── AddInventory/
│   │   │   ├── AddWarehouse/
│   │   │   ├── DeleteInventoryModal/
│   │   │   ├── DeleteWarehouseModal/
│   │   │   ├── EditInventory/
│   │   │   ├── EditWarehouse/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── InventoryDetails/
│   │   │   ├── InventoryList/
│   │   │   ├── WarehouseDetails/
│   │   │   ├── WarehouseInventory/
│   │   │   └── WarehouseList/
│   │   ├── pages/
│   │   │   ├── home/              # Warehouses page
│   │   │   └── inventory/         # Inventory page
│   │   └── App.jsx
│   ├── .env.sample
│   └── package.json
├── server/                        # Node.js backend
│   ├── controllers/
│   │   ├── warehouses-controller.js
│   │   └── inventories-controller.js
│   ├── routes/
│   │   ├── warehouses.js
│   │   └── inventories.js
│   ├── migrations/                # Knex DB migrations
│   ├── seeds/                     # Sample data
│   ├── server.js
│   ├── knexfile.js
│   ├── .env.sample
│   └── package.json
├── DOCUMENTATION/                 # Project screenshots & docs
├── DATABASE_SETUP.md              # Detailed DB setup guide
├── HOW_TO_RUN.md                  # Detailed run guide
├── SETUP.md                       # Quick setup guide
└── README.md
```

---

## 🔧 Troubleshooting

**App shows "Loading..." forever**
- Ensure the backend is running on port 8080
- Verify MySQL is running and credentials in `server/.env` are correct

**MySQL auth error (`ER_NOT_SUPPORTED_AUTH_MODE`)**
- Fixed — the project uses the `mysql2` driver which supports MySQL 8+

**Database connection fails**
```sql
-- Run in MySQL to reset auth for MySQL 8+
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

**Port already in use**
- Change `PORT` in `server/.env` (default: `8080`) or `client/.env` (default: `3000`)

**Environment variables not loading in React**
- All frontend env vars must be prefixed with `REACT_APP_`
- Restart `npm start` after editing `.env`

---

<div align="center">
  <p>Built with ❤️ by the InStock Team — 2026</p>
</div>
