import logo from './logo.svg';
import { Toaster } from 'react-hot-toast'
import './App.css';
import Header from './components/headercomponents/header';

import Home from './components/home_components/home';
import Footer from './components/footercomponents/footer';
import Backbutton from './components/back to top/back_top_button';
import Service from './components/service_components/service';
import Register from './components/register_components/register';
import Contact from './components/contact_components/contact';
import About from './components/about_components/about';
import Login from './components/logincomponents/login';
import Userhome from './components/userhome_components/userhome';
import Adminhome from './components/adminhome_components/adminhome';
import { Route, Routes } from 'react-router-dom'
import Logout from './components/logoutcomponents/logout';
import Manageuser from './components/manageusercomponents/manageuser';
import EpAdmin from './components/EpAdmincomponents/EpAdmin';
import CpAdmin from './components/CpAdmin/CpAdmin';
import AddCategory from './components/AddCategory/AddCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
import ViewCategory from './components/ViewCategory/ViewCategory';
import ViewSubCategory from './components/ViewSubCategory/ViewSubCategory';
import ViewProduct from './components/ViewProduct/ViewProduct';
import VerifyUser from './components/Verifyusercomponent/Verifyuser';
import AddProduct from './components/AddProduct/AddProduct';
import Cart from './components/cartComponent/cart.js'
import Product from './components/productComponent/product';
import Thankyou from './components/ThankYou/thankyou';
import UnSuccessful from './components/unSuccessfull/unSuccessfull';
function App() {
    return (
        <>
            <div class="container-xxl bg-white p-0">
                <Toaster
                    position="top-center"
                />
                <Header />





                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/contact' element={<Contact />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/services' element={<Service />}></Route>
                    <Route path="/admin" element={<Adminhome />}></Route>
                    <Route path='/user' element={<Userhome />}></Route>
                    <Route path='/logout' element={<Logout />}></Route>
                    <Route path='/manageuser' element={<Manageuser />}></Route>
                    <Route path='/epadmin' element={<EpAdmin />}></Route>
                    <Route path='/Cpadmin' element={<CpAdmin />}></Route>
                    <Route path='/addcategory' element={<AddCategory />}></Route>
                    <Route path='/addsubcategory' element={<AddSubCategory />}></Route>
                    <Route path='/viewcategory' element={<ViewCategory />}></Route>
                    <Route path='/viewsc/:catnm' element={<ViewSubCategory />}></Route>
                    <Route path='/viewp/:Subcatnm' element={<ViewProduct />}></Route>
                    <Route path='/verify/:email' element={<VerifyUser />}></Route>
                    <Route path='/addproduct' element={<AddProduct />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/product' element={<Product />}></Route>
                    <Route path='/thankyou' element={<Thankyou />}></Route>
                    <Route path='/unsuccessfull' element={<UnSuccessful />}></Route>
                </Routes>
                <Footer />

                <Backbutton />

            </div>

        </>
    );
}

export default App;
