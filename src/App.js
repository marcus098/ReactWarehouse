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
import Unauthorized from './pages/Unauthorized';
import AutomationPage from './pages/AutomationPage';
import React from 'react';

function App() {
  return (
    <Router>
  <div className='App'>
    <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/home" element={ <RequireAuth><Layout page="1"><Home /></Layout></RequireAuth>}></Route>
        <Route path="/orders" element={<RequireAuth><Layout page="2"><OrdersPage /></Layout></RequireAuth>}></Route>
        <Route path="/products" element={<RequireAuth><Layout page="3"><ProductsPage /></Layout></RequireAuth>}></Route>
        <Route path="/account" element={<RequireAuth><Layout page="4"><AccountPage /></Layout></RequireAuth>}></Route>
        <Route path="/purchases" element={<RequireAuth><Layout page="5"><PurchasesPage /></Layout></RequireAuth>}></Route>
        <Route path="/AddProduct" element={<RequireAuth><Layout page="6"><AddProduct /></Layout></RequireAuth>}></Route>
        <Route path="/AddOrder" element={<RequireAuth><Layout page="7"><AddOrder /></Layout></RequireAuth>}></Route>
        <Route path="/AddCategory" element={<RequireAuth><Layout page="8"><AddCategory /></Layout></RequireAuth>}></Route>
        <Route path="/usercontrol" element={<RequireAuth><Layout page="9"><UsersControlPage /></Layout></RequireAuth>}></Route>
        <Route path="/suppliers" element={<RequireAuth><Layout page="10"><SuppliersPage /></Layout></RequireAuth>}></Route>
        <Route path="/controlpanel" element={<RequireAuth><Layout page="11"><ControlPanel /></Layout></RequireAuth>}></Route>
        <Route path="/addaccount" element={<RequireAuth><Layout page="12"><AddAccount /></Layout></RequireAuth>}></Route>
        <Route path="/addSupplier" element={<RequireAuth><Layout page="13"><AddSupplier /></Layout></RequireAuth>}></Route>
        <Route path="/position" element={<RequireAuth><Layout page="14"><PositionPage /></Layout></RequireAuth>}></Route>
        <Route path="/automation" element={<RequireAuth><Layout page="15"><AutomationPage /></Layout></RequireAuth>}></Route>
        <Route path="/" element={
          <RequireAuth hasRole={false} role="">
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
