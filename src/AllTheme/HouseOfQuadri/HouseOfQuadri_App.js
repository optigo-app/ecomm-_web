import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Page/Home/Navbar/Navbar";
import Footer from "./Components/Page/Home/Footer/Footer";
import HomePage from "./Components/Page/Home";
import CollectionPage from "./Components/Page/Collection/CollectionPage";
import DynamicCollection from "./Components/Page/Home/CategoryTab/DynamicCollection/DynamicCollection";
import ProductPage from "./Components/Page/Product/Product";
import WishlistPage from "./Components/Page/Wishlist/WishlistPage";
import CartPage from "./Components/Page/Cart/CartPage";

const HouseOfQuadri_App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/" element={<CollectionPage />} /> 
        <Route path="/collections/:query" element={<DynamicCollection />} />
        <Route
          path="/collections/:query/products/:productId"
          element={<ProductPage />}
        />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default HouseOfQuadri_App;
