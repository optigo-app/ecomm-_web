import { atom } from "recoil";

export const dt_companyLogo = atom({
  key: 'diat_companyLogo',
  default: []
})

export const dt_companyLogoM = atom({
  key: 'diat_companyLogoM',
  default: []
})

export const dt_homeLoading = atom({
  key: 'diat_homeLoading',
  default: true
})

export const dt_loginState = atom({
  key: 'diat_loginState',
  default: false,
})

export const dt_CartCount = atom({
  key: 'diat_CartCount',
  default: 0
})

export const dt_WishCount = atom({
  key: 'diat_WishCount',
  default: 0
})

export const defaultAddressStateDT = atom({
  key: 'dia_defaultAddressStateDT',
  default: null,
});

export const lookBookDrawer = atom({
  key: 'dia_lookBookDrawer',
  default: false,
});
