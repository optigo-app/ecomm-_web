import { atom } from "recoil";

export const mala_companyLogo = atom({
  key:'mala_companyLogo',
  default:[]
})

export const mala_companyLogoM = atom({
  key:'mala_companyLogoM',
  default:[]
})

export const mala_loginState = atom({
  key: 'mala_loginState',
  default: false,
})

export const mala_CartCount = atom({
  key: 'mala_CartCount',
  default: 0
})

export const mala_WishCount = atom({
  key: 'mala_WishCount',
  default: 0
})

export const mala_cartB2CDrawer = atom({
  key: 'mala_cartB2CDrawer',
  default: false
})

export const mala_DiamondRangeArr = atom({
  key: 'mala_DiamondRangeArr',
  default: []
})

export const mala_defaultAddressState = atom({
  key: 'mala_defaultAddressState',
  default: null,
});
