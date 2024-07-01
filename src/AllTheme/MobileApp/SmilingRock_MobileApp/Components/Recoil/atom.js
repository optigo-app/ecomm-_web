import { atom } from "recoil";

export const smrMA_companyLogo = atom({
    key:'companyLogo',
    default:[]
})

export const  smrMA_loginState = atom({
  key: 'loginState',
  default: false,
})

export const  smrMA_CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const  smrMA_WishCount = atom({
  key: 'WishCount',
  default: 0
})