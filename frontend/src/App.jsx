import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddProduct from './pages/product/AddProduct';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SignUpAdmin from './pages/SignUpAdmin';
import ProfilePage from './pages/Profile';
import { useContext } from 'react';
import { AuthContext } from './utils/AuthContext';
import SingleItem from './pages/SingleItem';

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
  const { user } = useContext(AuthContext);

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
        <Link to="/product">Product</Link>
        {user?.user_type==='admin' ?<Link to="/add">Add Product</Link>:<></>}
        {/* <Link to="/register">Register</Link> */}
        {!user?.email ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/product' element={<SingleItem />} />
        <Route path="/add" element={<AdminRoute element={<AddProduct />} />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/admin" element={<SignUpAdmin />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
