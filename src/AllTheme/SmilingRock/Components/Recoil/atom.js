import { atom } from "recoil";

export const companyLogo = atom({
    key:'companyLogo',
    default:[]
  })

  export const loginState = atom({
    key: 'loginState',
    default: false,
  })