import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Storeinit } from '../../utils/API/Home/Storeinit/Storeinit';

const PrivateRoutes = ({ isLoginStatus }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            window.scrollTo(0, 0);
        }, 100);

        return () => clearTimeout(timeout);
    }, [isLoginStatus]);

    console.log('isLoginStatus', isLoginStatus)

    if (isLoading) {
        return <div></div>;
    }

    const redirectUrl = `/loginOption/?LoginRedirect=${encodeURIComponent(location?.pathname)}${location?.search}`;
    if (storeInit?.IsB2BWebsite != 0) {
        if (isLoginStatus != true) {
            if (location.pathname.startsWith('/p')
                || location.pathname.startsWith('/d')
                || location.pathname.startsWith('/cartPage')
                || location.pathname.startsWith('/myWishList')
                || location.pathname.startsWith('/Lookbook')) {
                let storeInt = JSON.parse(localStorage.getItem("storeInit"));
                if (!storeInt) {
                    Storeinit();
                }
                return <Navigate to={redirectUrl} replace/>;
            }
            else {
                return <Navigate to="/" replace/>;
            }
        }
    }
    return <Outlet />;
};

export default PrivateRoutes;
