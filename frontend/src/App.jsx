import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddProduct from './pages/product/AddProduct';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SignUpAdmin from './pages/SignUpAdmin';
import ProfilePage from './pages/Profile';
import { useContext, useEffect } from 'react';
import { AuthContext } from './utils/AuthContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SingleItem from './pages/SingleItem';
import { IconButton } from '@mui/material';
import Cart from './pages/cart/Cart';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user?.email ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user?.user_type === 'admin' ? element : <Navigate to="/" />;
};

function App() {
  const { user, cartItemsCount, setCartItemsCount } = useContext(AuthContext);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemsCount(cartItemsCount);
  }, []);

  return (
    <Router>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <Link to="/">Home</Link>
        {user?.user_type === 'admin' ? <Link to="/add">Add Product</Link> : <></>}
        {!user?.email ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>}
        <Link to="/cart" style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-10px', right: '0', background: 'red', color: 'white', padding: '2px 5px', borderRadius: '50%' }}>
            {cartItemsCount}
          </span>
          <IconButton><AddShoppingCartIcon /></IconButton>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/product/:id' element={<SingleItem />} />
        <Route path="/add" element={<AdminRoute element={<AddProduct />} />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/admin" element={<SignUpAdmin />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
