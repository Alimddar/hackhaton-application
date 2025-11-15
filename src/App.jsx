import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import NotFound from './pages/NotFound';
import './styles.css';

function App() {
  const [cart, setCart] = useState([]);
  const [discountActive, setDiscountActive] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="*" element={
            <>
              <Header cartCount={cart.length} />
              <Routes>
                <Route path="/" element={<Products cart={cart} setCart={setCart} discountActive={discountActive} />} />
                <Route path="/products" element={<Products cart={cart} setCart={setCart} discountActive={discountActive} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} discountActive={discountActive} />} />
                <Route path="/profile" element={<Profile discountActive={discountActive} setDiscountActive={setDiscountActive} />} />
                <Route path="/dashboard" element={<Dashboard cart={cart} setCart={setCart} />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
