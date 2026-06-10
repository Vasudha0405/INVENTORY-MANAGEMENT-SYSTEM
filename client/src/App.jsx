import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './styles/App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import InventoryDetails from './components/InventoryDetails/InventoryDetails';
import Inventory from "./pages/inventory/Inventory";
import Warehouse from "./components/WarehouseDetails/WarehouseDetails";
import EditInventoryForm from "./components/EditInventory/EditInventory";
import AddInventoryForm from "./components/AddInventory/AddInventory";
import AddWarehouseForm from "./components/AddWarehouse/AddWarehouse";
import EditWarehouseForm from './components/EditWarehouse/EditWarehouse';
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children, employeeOnly }) {
  const { isAuthenticated, isEmployee, loading } = useAuth();

  if (loading) return <div className="isLoading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (employeeOnly && !isEmployee) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/warehouses/:warehouse" element={<ProtectedRoute><Warehouse /></ProtectedRoute>} />
        <Route path="/warehouse/add" element={<ProtectedRoute employeeOnly><AddWarehouseForm /></ProtectedRoute>} />
        <Route path="/warehouse/:warehouse_id/edit" element={<ProtectedRoute employeeOnly><EditWarehouseForm /></ProtectedRoute>} />
        <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
        <Route path="/inventory/:itemId" element={<ProtectedRoute><InventoryDetails /></ProtectedRoute>} />
        <Route path="/inventory/:itemId/edit" element={<ProtectedRoute employeeOnly><EditInventoryForm /></ProtectedRoute>} />
        <Route path="/inventory/add" element={<ProtectedRoute employeeOnly><AddInventoryForm /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
