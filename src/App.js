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
import ProvaPage from './pages/ProvaPage';
import Layout from './pages/Layout';
import AddAccount from './pages/AddAccount';
import functions from './pages/functions';

function App() {
  return (
    <Router>
  <div className='App'>
    <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Layout role="admin"><Home /></Layout>}></Route>
        <Route path="/orders" element={<Layout role="admin"><OrdersPage /></Layout>}></Route>
        <Route path="/products" element={<Layout role="admin"><ProductsPage /></Layout>}></Route>
        <Route path="/account" element={<Layout role="admin"><AccountPage /></Layout>}></Route>
        <Route path="/purchases" element={<Layout role="admin"><PurchasesPage /></Layout>}></Route>
        <Route path="/account" element={<Layout role="admin"><AccountPage /></Layout>}></Route>
        <Route path="/AddProduct" element={<Layout role="admin"><AddProduct /></Layout>}></Route>
        <Route path="/AddOrder" element={<Layout role="admin"><AddOrder /></Layout>}></Route>
        <Route path="/AddCategory" element={<Layout role="admin"><AddCategory /></Layout>}></Route>
        <Route path="/usercontrol" element={<Layout role="admin"><UsersControlPage /></Layout>}></Route>
        <Route path="/controlpanel" element={<Layout role="admin"><ControlPanel /></Layout>}></Route>
        <Route path="/addaccount" element={<Layout role="admin"><AddAccount /></Layout>}></Route>
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
