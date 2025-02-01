import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import AddProduct from './pages/AddProduct'

function App() {

  return (
   <Router>
     <nav>
      <Link to="/">Home</Link>
      <Link to="/add">Add Product</Link>
     </nav>
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/add" element={<AddProduct />} />
     </Routes>
   </Router>
  )
}

export default App
