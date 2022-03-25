import logo from "./logo.svg";
import "./App.css";
import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages";
import AuthLayout from './pages/auth'
import Login from './pages/auth/bodys/Login'
import Register from './pages/auth/bodys/Register'
import AdminLayout from "./pages/admin";
import HomeLayout from "./pages/home";
import Home from "./pages/home/bodys/Home";
import Users from "./pages/admin/bodys/users/Users";
import Roles from "./pages/admin/bodys/Roles";
import PageError403 from "./pages/error/ErrorPage403";
import HomeAdmin from './pages/admin/bodys/HomeAdmin'
import UserUpdate from "./pages/admin/bodys/users/UserUpdate";
import UserCreate from "./pages/admin/bodys/users/UserCreate";
import ForgotPassword from "./pages/auth/bodys/ForgotPassword";
import EmailSent from "./pages/auth/bodys/EmailSent";
import FormResetPassword from "./pages/auth/bodys/FormResetPassword";
import PasswordChanged from "./pages/auth/bodys/PasswordChanged";
import Checkout from "./pages/home/bodys/payment/Checkout";

function App() {
  return (
    <Suspense
      fallback={
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>

          <Route path="" element={<HomeLayout />}>
            <Route path="home" element={<Home />}>
              <Route path="checkout" element={<Checkout />}></Route>
            </Route>
            
            <Route path="error403" element={<PageError403 />}></Route>
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgotPassword" element={<ForgotPassword />}></Route>
            <Route path="emailSent" element={<EmailSent />}></Route>
            <Route path="resetPassword" element={<FormResetPassword />}></Route>
            <Route path="passwordChanged" element={<PasswordChanged />}></Route>
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<HomeAdmin />}></Route>
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<UserCreate edit={false} />} />
            <Route path="users/:idUser/edit" element={<UserUpdate edit={true} />} />
            <Route path="roles" element={<Roles />}></Route>
          </Route>

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
