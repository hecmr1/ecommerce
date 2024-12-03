import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import Products from './Components/Products/Products';
import AddProduct from './Admin/src/Components/AddProduct/AddProduct';
import ListProduct from './Admin/src/Components/ListProduct/ListProduct';
import Slidebar from './Admin/src/Components/Slidebar/Slidebar';
import ProtectedRoute from './ProtectedRouted';
import ListUsers from './Admin/src/Components/ListUsers/ListUsers';
import AddAdmin from './Admin/src/Components/AddAdmin/AddAdmin';

function App() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Recupera el estado de isAdmin

  return (
    <div>
      <Navbar />
      <div className="main-container">
        {(location.pathname === '/addproduct' || location.pathname === '/listproduct' || 
          location.pathname === '/listusers'|| location.pathname === '/addadmin') && <Slidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/vertice" element={<ShopCategory category="Vertice" />} />
            <Route path="/culmen" element={<ShopCategory category="Culmen" />} />
            <Route path="/accion" element={<ShopCategory category="Accion" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            {/* Rutas protegidas */}
            <Route 
              path="/addproduct" 
              element={
                <ProtectedRoute isAdmin={isAdmin}>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/listproduct" 
              element={
                <ProtectedRoute isAdmin={isAdmin}>
                  <ListProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/listusers" 
              element={
                <ProtectedRoute isAdmin={isAdmin}>
                  <ListUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/addadmin" 
              element={
                  <ProtectedRoute isAdmin={isAdmin}>
                      <AddAdmin />
                  </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
      {!location.pathname.startsWith('/addproduct') && !location.pathname.startsWith('/listproduct') && <Footer />}
    </div>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Main;