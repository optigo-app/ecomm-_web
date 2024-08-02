import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
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
import Blogs from "./Components/Page/staticPage/blogs/Blogs";
import OurStory from "./Components/Page/staticPage/OurStory/OurStory";
import LabGrownDiamond from "./Components/Page/staticPage/LabGrownDiamond/LabGrownDiamond";
import DiamondEducation from "./Components/Page/staticPage/DiamondEducation/DiamondEducation";
import QualityCertification from "./Components/Page/staticPage/QualityCertification/QualityCertification";
import PrivateRoutes from "./PrivateRoutes";
import { Hoq_companyLogo, Hoq_loginState } from "./Components/Recoil/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { LoginWithEmailAPI } from "../../utils/API/Auth/LoginWithEmailAPI";
import Lookbook from "./Components/Page/LookBook/Lookbook";

const HouseOfQuadri_App = () => {
  const islogin = useRecoilValue(Hoq_loginState);
  const [localData, setLocalData] = useState();
  const navigation = useNavigate();
  const setIsLoginState = useSetRecoilState(Hoq_loginState);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [companyTitleLogo, setCompanyTitleLogo] =
    useRecoilState(Hoq_companyLogo);

  useEffect(() => {
    let data = localStorage.getItem("storeInit");
    let Logindata = JSON.parse(localStorage.getItem("loginUserDetail"));
    let logo = JSON?.parse(data);
    if (Logindata) {
      if (Logindata?.IsPLWOn == 1) {
        setCompanyTitleLogo(Logindata?.Private_label_logo);
      } else {
        setCompanyTitleLogo(logo?.companylogo);
      }
    } else {
      setCompanyTitleLogo(logo?.companylogo);
    }
  });

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  }, [location?.pathname]);
  // useEffect(() => {
  //   const cookieValue = Cookies.get("userLoginCookie");
  //   if (cookieValue) {
  //     LoginWithEmailAPI("", "", "", "", cookieValue)
  //       .then((response) => {
  //         if (response.Data.rd[0].stat === 1) {
  //           Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
  //           setIsLoginState(true);
  //           localStorage.setItem("LoginUser", true);
  //           localStorage.setItem(
  //             "loginUserDetail",
  //             JSON.stringify(response.Data.rd[0])
  //           );
  //           if (redirectEmailUrl) {
  //             navigation(redirectEmailUrl);
  //           } else {
  //             navigation("/");
  //           }
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   let localD = JSON.parse(localStorage.getItem("storeInit"));
  //   setLocalData(localD);
  // }, []);

  return (
    <>
      <Navbar />
      <ChatMenu />
      <Routes>
        {/* Auth Flow  */}
        <Route path="/LoginOption" element={<LoginOption />} />
        <Route
          path="/ContinueWithEmail"
          element={!islogin && <ContinueWithEmail />}
        />
        <Route
          path="/ContimueWithMobile"
          element={!islogin && <ContimueWithMobile />}
        />
        <Route
          path="/LoginWithEmail"
          element={!islogin && <LoginWithEmail />}
        />
        <Route path="/Register" element={!islogin && <Register />} />
        <Route
          path="/LoginWithEmailCode"
          element={!islogin && <LoginWithEmailCode />}
        />
        <Route
          path="/LoginWithMobileCode"
          element={!islogin && <LoginWithMobileCode />}
        />
        <Route path="/ForgotPass" element={!islogin && <ForgotPass />} />
        {/* Auth Flow Ends */}
        <Route path="/" element={<HomePage />} />
        <Route path="/collections/" element={<CollectionPage />} />
        <Route path="/" element={<PrivateRoutes isLoginStatus={islogin} />}>
          <Route path="/p/*" element={<DynamicCollection />} />
          <Route path="/d/*" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Confirmation" element={<Confirmation />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/Lookbook" element={<Lookbook />} />
        {/* static Page */}
        <Route path="/Shipping-Policy" element={<ShippingPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-exchange-policy" element={<ReturnPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditionPage />} />
        <Route path="/faq" element={<FaqSection />} />
        <Route path="/contacts" element={<ContactForm />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/why-quality-matters" element={<QualityMatters />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/lab-grown-diamond" element={<LabGrownDiamond />} />
        <Route path="/diamond-education" element={<DiamondEducation />} />
        <Route
          path="/quality-certification"
          element={<QualityCertification />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default HouseOfQuadri_App;
