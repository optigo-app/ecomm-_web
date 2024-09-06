import { atom } from "recoil";

export const roop_companyLogo = atom({
    key:'companyLogo',
    default:[]
})

export const roop_loginState = atom({
  key: 'loginState',
  default: false,
})

export const roop_CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const roop_WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const roop_cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const roop_DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})

export const roop_defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});
