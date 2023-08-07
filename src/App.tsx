import React from "react";
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import NoPage from "./pages/404";
import Products from "./pages/apps/products";
import AddProduct from "./pages/apps/addProduct";
import EditProduct from "./pages/apps/editProduct";
import Layout from "./layouts/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="product-list" element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} /> 
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
