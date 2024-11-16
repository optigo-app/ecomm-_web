import React, { Suspense, useEffect, useState } from 'react'
// import Header from './Components/Pages/Home/Header/Header'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { storImagePath } from '../../utils/Glob_Functions/GlobalFunction'
import GoogleAnalytics  from 'react-ga4';
import { LoginWithEmailAPI } from '../../utils/API/Auth/LoginWithEmailAPI'
import Cookies from "js-cookie";
import { dt_companyLogo, dt_companyLogoM, dt_loginState, lookBookDrawer } from './Components/Recoil/atom';
import ScrollToTop from './Components/Pages/ScrollToTop ';
import DiamondTine_PrivateRoutes from './DiamondTine_PrivateRoutes';

const Home = React.lazy(() => import('./Components/Pages/Home/Index'));
const LoginOption = React.lazy(() => import('./Components/Pages/Auth/LoginOption/LoginOption'));
const ContinueWithEmail = React.lazy(() => import('./Components/Pages/Auth/ContinueWithEmail/ContinueWithEmail'));
const ContimueWithMobile = React.lazy(() => import('./Components/Pages/Auth/ContimueWithMobile/ContimueWithMobile'));
const LoginWithEmail = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmail/LoginWithEmail'));
const Register = React.lazy(() => import('./Components/Pages/Auth/Registretion/Register'));
const LoginWithMobileCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithMobileCode/LoginWithMobileCode'));
const LoginWithEmailCode = React.lazy(() => import('./Components/Pages/Auth/LoginWithEmailCode/LoginWithEmailCode'));
const ForgotPass = React.lazy(() => import('./Components/Pages/Auth/forgotPass/ForgotPass'));
const ProductList = React.lazy(() => import('./Components/Pages/Product/ProductList/ProductList'));
const ProductDetail = React.lazy(() => import('./Components/Pages/Product/ProductDetail/ProductDetail'));
const Account = React.lazy(() => import('./Components/Pages/Account/Account'));
const CartMain = React.lazy(() => import('./Components/Pages/Cart/CartMain'));
const Wishlist = React.lazy(() => import('./Components/Pages/Wishlist/MainWish'));
const Delivery = React.lazy(() => import('./Components/Pages/OrderFlow/DeliveryPage/Delivery'));
const Payment = React.lazy(() => import('./Components/Pages/OrderFlow/PaymentPage/Payment'));
const Confirmation = React.lazy(() => import('./Components/Pages/OrderFlow/ConfirmationPage/Confirmation'));
const FAQ = React.lazy(() => import('./Components/Pages/StaticPages/FAQ/FAQ'));
const TermsAndConditions = React.lazy(() => import('./Components/Pages/StaticPages/Terms&Condition/TermsCondition'));
const PrivacyPolicy = React.lazy(() => import('./Components/Pages/StaticPages/privacyPolicy/PrivacyPolicy'));
const ContactUs = React.lazy(() => import('./Components/Pages/StaticPages/contactUs/ContactUs'));
const Lookbook = React.lazy(() => import('./Components/Pages/Home/LookBook/Lookbook'));
const WhtasIcone = React.lazy(() => import('./Components/Pages/Home/ChatMenu/ChatMenu'));
const MaterialCore = React.lazy(() => import('./Components/Pages/StaticPages/MaterialCore/MaterialCore'));
const ShipingReturn = React.lazy(() => import('./Components/Pages/StaticPages/ShipingReturn/ShipingReturn'));
const Exchange = React.lazy(() => import('./Components/Pages/StaticPages/Exchange/Exchange'));
const Location = React.lazy(() => import('./Components/Pages/StaticPages/Location/Location'));
const PaymentFailure = React.lazy(() => import('../../utils/PaymentSuccessFail/PaymentFailure'));
const Header  = React.lazy(()=>import('./Components/Pages/Home/Header/Header'));



const LazyWrapper = ({ children }) => {
  return <Suspense fallback={<></>}>{children}</Suspense>;
};


const DaimondTine_App = () => {
  const navigation = useNavigate();
  const [islogin, setIsLoginState] = useRecoilState(dt_loginState)
  const  setCompanyTitleLogo = useSetRecoilState(dt_companyLogo);
  const  setCompanyTitleLogoM = useSetRecoilState(dt_companyLogoM);
  const location = useLocation();
  const search = location?.search;
  const updatedSearch = search.replace("?LoginRedirect=", "");
  const redirectEmailUrl = `${decodeURIComponent(updatedSearch)}`;
  const [localData, setLocalData] = useState();
  const isDrawerLookBook = useRecoilValue(lookBookDrawer);
  

  const TRACKING_ID = "G-6ETM8Y1KCR";
  // GoogleAnalytics.initialize(TRACKING_ID);

  // useEffect(() => {
  //   GoogleAnalytics.set({ page: location.pathname });
  //   GoogleAnalytics.send("pageview");
  //   GoogleAnalytics.event({
  //     category: "Navigation",
  //     action: "Visited Route",
  //     label: location.pathname,
  //   });
  // }, [location]);

  useEffect(() => {
    const initGA = () => {
      GoogleAnalytics.initialize(TRACKING_ID);
      GoogleAnalytics.set({ page: location.pathname });
      GoogleAnalytics.send("pageview");
      GoogleAnalytics.event({
        category: "Navigation",
        action: "Visited Route",
        label: location.pathname,
      });
    };
  
    // Delay the GA initialization by 500ms to prevent blocking the main thread
    const timeoutId = setTimeout(initGA, 500);
  
    // Cleanup the timeout if component is unmounted
    return () => clearTimeout(timeoutId);
  }, [location]);

  useEffect(() => {
    let webLogo = `${storImagePath()}/logoIcon/webLogo.png`;
    let mobileLogo = `${storImagePath()}/logoIcon/mobileLogo.png`;
    
    // let webLogo = `${storImagePath()}/logoIcon/sona/webLogo.png`;
    // let mobileLogo = `${storImagePath()}/logoIcon/sona/mobileLogo.png`;
    
    
    setCompanyTitleLogo(webLogo);
    setCompanyTitleLogoM(mobileLogo);
  });


  useEffect(() => {
    const cookieValue = Cookies.get("userLoginCookie");
    if (cookieValue) {
      LoginWithEmailAPI("", "", "", "", cookieValue)
        .then((response) => {
          if (response.Data.rd[0].stat === 1) {
            Cookies.set("userLoginCookie", response?.Data?.rd[0]?.Token);
            setIsLoginState(true);
            sessionStorage.setItem("LoginUser", true);
            sessionStorage.setItem(
              "loginUserDetail",
              JSON.stringify(response.Data.rd[0])
            );
            if (redirectEmailUrl) {
              navigation(redirectEmailUrl);
            } else {
              navigation("/");
            }
          }
        })
        .catch((err) => console.log(err));
    }
    let localD = JSON.parse(sessionStorage.getItem("storeInit"));
    setLocalData(localD);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (islogin == true) {
        const restrictedPaths = [
          '/LoginOption',
          '/ContinueWithEmail',
          '/ContinueWithMobile',
          '/LoginWithEmailCode',
          '/LoginWithMobileCode',
          '/ForgotPass',
          '/LoginWithEmail',
          '/register'
        ];

        if (restrictedPaths?.some(path => location.pathname.startsWith(path))) {
          return navigation("/");
        }
      }

    }, 500);
  }, [location?.pathname])


 
  
  return (
    <div>
      {!isDrawerLookBook && 
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      }
      <Routes>
        <Route path="/" element={ <LazyWrapper><Home /></LazyWrapper>} />
        <Route path="/LoginOption" element={ <LazyWrapper><LoginOption /></LazyWrapper>} />
        <Route path="/ContinueWithEmail" element={ <LazyWrapper><ContinueWithEmail /></LazyWrapper>} />
        <Route path="/ContimueWithMobile" element={ <LazyWrapper><ContimueWithMobile /></LazyWrapper>} />
        <Route path="/LoginWithMobileCode" element={ <LazyWrapper><LoginWithMobileCode /></LazyWrapper>} />
        <Route path="/LoginWithEmailCode" element={ <LazyWrapper><LoginWithEmailCode /></LazyWrapper>} />
        <Route path="/LoginWithEmail" element={ <LazyWrapper><LoginWithEmail /></LazyWrapper>} />
        <Route path="/Register" element={ <LazyWrapper><Register /></LazyWrapper>} />
        <Route path="/FAQ" element={ <LazyWrapper><FAQ /></LazyWrapper>} />   
        <Route path="/ContactUs" element={ <LazyWrapper><ContactUs /></LazyWrapper>} />
        <Route path="/PrivacyPolicy" element={ <LazyWrapper><PrivacyPolicy /></LazyWrapper>} />
        <Route path="/term&condition" element={ <LazyWrapper><TermsAndConditions /></LazyWrapper>} />
        <Route path="/ForgotPass" element={ <LazyWrapper><ForgotPass /></LazyWrapper>} />
        <Route path="/ShipingReturn" element={ <LazyWrapper><ShipingReturn /></LazyWrapper>} />
        <Route path="/Exchange" element={ <LazyWrapper><Exchange /></LazyWrapper>} />
        <Route path="/Location" element={ <LazyWrapper><Location /></LazyWrapper>} />
        <Route path="/MaterialCore" element={ <LazyWrapper><MaterialCore /></LazyWrapper>} />
        <Route path="/Lookbook" element={ <LazyWrapper><Lookbook /></LazyWrapper>} />
        <Route path="/" element={<DiamondTine_PrivateRoutes isLoginStatus={islogin} />}>
          <Route path="/p/*" element={ <LazyWrapper><ProductList /></LazyWrapper>} />
          <Route path="/d/*" element={ <LazyWrapper><ProductDetail /></LazyWrapper>} />
          <Route path="/account" element={ <LazyWrapper><Account /></LazyWrapper>} />
          <Route path="/cartPage" element={ <LazyWrapper><CartMain /></LazyWrapper>} />
          <Route path="/myWishList" element={ <LazyWrapper><Wishlist /></LazyWrapper>} />
          <Route path="/Delivery" element={ <LazyWrapper><Delivery /></LazyWrapper>} />
          <Route path="/Payment" element={ <LazyWrapper><Payment /></LazyWrapper>} />
          <Route path="/Confirmation" element={ <LazyWrapper><Confirmation /></LazyWrapper>} />
          <Route path="/failure" element={ <LazyWrapper><PaymentFailure /></LazyWrapper>} />
        </Route>
      </Routes>
      <ScrollToTop />
      <LazyWrapper>
      <WhtasIcone phoneNo='9810976359'/>
      </LazyWrapper>
    </div>
  )
}

export default DaimondTine_App;

