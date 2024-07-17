import { atom } from "recoil";

export const companyLogo = atom({
    key:'companyLogo',
    default:[]
})

export const loginState = atom({
  key: 'loginState',
  default: false,
})

export const CartCount = atom({
  key: 'CartCount',
  default: 0
})

export const WishCount = atom({
  key: 'WishCount',
  default: 0
})

export const cartB2CDrawer = atom({
  key: 'cartB2CDrawer',
  default: false
})

export const DiamondRangeArr = atom({
  key: 'DiamondRangeArr',
  default: []
})

export const defaultAddressState = atom({
  key: 'defaultAddressState',
  default: null,
});
