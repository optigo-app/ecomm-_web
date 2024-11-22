import { atom } from "recoil";

export const PC_AppcompanyLogo = atom({
    key:'proc_t_companyLogo',
    default:[]
})

export const  PC_ApploginState = atom({
  key: 'proc_t_loginState',
  default: false,
})

export const  PC_AppCartCount = atom({
  key: 'proc_t_CartCount',
  default: 0
})

export const  PC_AppWishCount = atom({
  key: 'proc_t_WishCount',
  default: 0
})

export const PC_AppdefaultAddressState = atom({
  key: 'proc_t_defaultAddressState',
  default: null,
});

export const PC_AppShowSnackBar = atom({
  key: 'proc_t_PC_AppShowSnackBar',
  default: false,
});

export const soketProductData_ProCatApp = atom({
  key: 'proc_t_soketProductData',
  default: []
})