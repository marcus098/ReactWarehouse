import './App.css';
import Login from './pages/Login';
import Home from './pages/HomePage';
import Missing from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Logout from './pages/Logout';
import { Navbar } from './components/Navbar';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import AccountPage from './pages/AccountPage';
import PurchasesPage from './pages/PurchasesPage';
import AddProduct from './pages/AddProduct';
import AddOrder from './pages/AddOrder';
import AddCategory from './pages/AddCategory';
import UsersControlPage from './pages/UsersControlPage';
import ControlPanel from './pages/ControlPanel';
import Layout from './pages/Layout';
import SuppliersPage from './pages/SuppliersPage';
import AddAccount from './pages/AddAccount';
import PositionPage from './pages/PositionPage';
import AddSupplier from './pages/AddSupplier';

function App() {
  return (
    <Router>
  <div className='App'>
    <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={ <RequireAuth role=""><Layout role="admin"><Home /></Layout></RequireAuth>}></Route>
        <Route path="/orders" element={<RequireAuth role=""><Layout role="admin"><OrdersPage /></Layout></RequireAuth>}></Route>
        <Route path="/products" element={<RequireAuth role=""><Layout role="admin"><ProductsPage /></Layout></RequireAuth>}></Route>
        <Route path="/account" element={<RequireAuth role=""><Layout role="admin"><AccountPage /></Layout></RequireAuth>}></Route>
        <Route path="/purchases" element={<RequireAuth role=""><Layout role="admin"><PurchasesPage /></Layout></RequireAuth>}></Route>
        <Route path="/account" element={<RequireAuth role=""><Layout role="admin"><AccountPage /></Layout></RequireAuth>}></Route>
        <Route path="/AddProduct" element={<RequireAuth role=""><Layout role="admin"><AddProduct /></Layout></RequireAuth>}></Route>
        <Route path="/AddOrder" element={<RequireAuth role=""><Layout role="admin"><AddOrder /></Layout></RequireAuth>}></Route>
        <Route path="/AddCategory" element={<RequireAuth role=""><Layout role="admin"><AddCategory /></Layout></RequireAuth>}></Route>
        <Route path="/usercontrol" element={<RequireAuth role=""><Layout role="admin"><UsersControlPage /></Layout></RequireAuth>}></Route>
        <Route path="/suppliers" element={<RequireAuth role=""><Layout role="admin"><SuppliersPage /></Layout></RequireAuth>}></Route>
        <Route path="/controlpanel" element={<RequireAuth role=""><Layout role="admin"><ControlPanel /></Layout></RequireAuth>}></Route>
        <Route path="/addaccount" element={<RequireAuth role=""><Layout role="admin"><AddAccount /></Layout></RequireAuth>}></Route>
        <Route path="/addSupplier" element={<RequireAuth role=""><Layout role="admin"><AddSupplier /></Layout></RequireAuth>}></Route>
        <Route path="/position" element={<RequireAuth role=""><Layout role="admin"><PositionPage /></Layout></RequireAuth>}></Route>
        <Route path="/home2" element={
          <RequireAuth role="">
            <Home />
            
          </RequireAuth>
          } 
        />
        <Route path="/" element={
          <RequireAuth role="">
            <Home />
          </RequireAuth>
          } 
        />
      
      <Route path="/*" element={<Missing />} />
    </Routes>
  </div>
  
</Router>

  );
}

export default App;
