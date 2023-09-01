import './App.css';
import React from 'react';
import Header from'./components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import webFont from 'webfontloader';
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Products from './components/Product/Products.jsx';
import Search from './components/Product/Search.jsx';
import LoginSignup from './components/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.jsx';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.jsx';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/User/ForgotPassword.jsx';
import ResetPassword from './components/User/ResetPassword.jsx';


function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user);

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    });

    store.dispatch(loadUser());
  },[]);

  return (
    <Router>
      <Header/>

      {isAuthenticated && <UserOptions user = {user}/>}

      <Routes>
        <Route path = "/" Component = {Home} />
        <Route path = "/product/:id" Component = {ProductDetails} />
        <Route path = "/products" Component = {Products}/>
        <Route path = "/products/:keyword" Component = {Products}/>
        <Route path = "/search" Component = {Search}/>
        <Route path = "/login" Component = {LoginSignup}/>
        <Route 
          path = "/account" 
          element = {<ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}
        />
        <Route 
          path = "/me/update" 
          element = {<ProtectedRoute>
            <UpdateProfile/>
          </ProtectedRoute>}
        />
        <Route 
          path = "/password/update" 
          element = {<ProtectedRoute>
            <UpdatePassword/>
          </ProtectedRoute>}
        />
        <Route path = "/password/forgot" element = {<ForgotPassword/>}/>
        <Route path = "/password/reset/:token" element = {<ResetPassword/>}/>
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
