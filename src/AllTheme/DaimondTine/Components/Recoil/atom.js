import { atom } from "recoil";

export const dt_companyLogo = atom({
  key: 'dt_companyLogo',
  default: []
})

export const dt_loginState = atom({
  key: 'dt_loginState',
  default: false,
})

export const dt_CartCount = atom({
  key: 'dt_CartCount',
  default: 0
})

export const dt_WishCount = atom({
  key: 'dt_WishCount',
  default: 0
})

export const defaultAddressStateDT = atom({
  key: 'defaultAddressStateDT',
  default: null,
});
