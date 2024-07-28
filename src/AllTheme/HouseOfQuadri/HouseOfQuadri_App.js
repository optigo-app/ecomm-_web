import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./Components/Page/Home/Navbar/Navbar";
import Footer from "./Components/Page/Home/Footer/Footer";
import HomePage from "./Components/Page/Home";
import CollectionPage from "./Components/Page/Collection/CollectionPage";
import DynamicCollection from "./Components/Page/Home/CategoryTab/DynamicCollection/DynamicCollection";
import ProductPage from "./Components/Page/Product/Product";
import WishlistPage from "./Components/Page/Wishlist/WishlistPage";
import CartPage from "./Components/Page/Cart/CartPage";
import LoginOption from "./Components/Page/Auth/LoginOptions/Hoq_LoginOptions";
import ContinueWithEmail from "./Components/Page/Auth/LoginWithEmail/Hoq_LoginWithEmail";
import ContimueWithMobile from "./Components/Page/Auth/LoginWithMobile/Hoq_LoginWithMobile";
import Register from "./Components/Page/Auth/Register/Hoq_Register";
import LoginWithEmail from "./Components/Page/Auth/EmailLogin/Hoq_EmailLogin";
import LoginWithEmailCode from "./Components/Page/Auth/LoginwithEmailCode/Hoq_LoginwithEmailCode";
import LoginWithMobileCode from "./Components/Page/Auth/LoginWithMobileCode/Hoq_LoginWithMobileCode";
import ForgotPass from "./Components/Page/Auth/ForgetPassword/Hoq_ForgetPassword";
import { useLocation } from "react-router-dom";
import ChatMenu from "./Components/Page/Home/ChatMenu/ChatMenu";
import Delivery from "./Components/Page/OrderFlow/DeliveryPage/Delivery";
import Payment from "./Components/Page/OrderFlow/PaymentPage/Payment";
import Confirmation from "./Components/Page/OrderFlow/ConfirmationPage/Confirmation";
import Account from "./Components/Page/Account/Account";
import ShippingPage from "./Components/Page/staticPage/shippingpage/ShippingPage";
import PrivacyPolicy from "./Components/Page/staticPage/privacyPolicy/PrivacyPolicy";
import ReturnPolicy from "./Components/Page/staticPage/returnPolicy/ReturnPolicy";
import TermsConditionPage from "./Components/Page/staticPage/TermsCondition/TermsConditions";
import FaqSection from "./Components/Page/staticPage/FaqSection/FaqSection";
import ContactForm from "./Components/Page/staticPage/ContactForm/ContactForm";
import SizeGuide from "./Components/Page/staticPage/SizeGuide/SizeGuide";
import QualityMatters from "./Components/Page/staticPage/WhyQualityMatters/QualityMatters";

//
const HouseOfQuadri_App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return (
    <>
      <Navbar />
      <ChatMenu />
      <Routes>
        {/* Auth Flow  */}
        <Route path="/LoginOption" element={<LoginOption />} />
        <Route path="/ContinueWithEmail" element={<ContinueWithEmail />} />
        <Route path="/ContimueWithMobile" element={<ContimueWithMobile />} />
        <Route path="/LoginWithEmail" element={<LoginWithEmail />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/LoginWithEmailCode" element={<LoginWithEmailCode />} />
        <Route path="/LoginWithMobileCode" element={<LoginWithMobileCode />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        {/* Auth Flow Ends */}
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/" element={<CollectionPage />} />
        <Route path="/p/*" element={<DynamicCollection />} />
        <Route path="/d/*" element={<ProductPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/account" element={<Account />} />
        {/* static Page */}
        <Route path="/Shipping-Policy" element={<ShippingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-exchange-policy" element={<ReturnPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditionPage />} />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/why-quality-matters" element={<QualityMatters />} />
        {/* <Route path="/customise" element={<SizeGuide />} /> */}
        {/* ends */}
      </Routes>
      <Footer />
    </>
  );
};

export default HouseOfQuadri_App;
