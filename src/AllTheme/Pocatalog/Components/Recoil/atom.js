import { atom } from "recoil";

export const proCat_companyLogo = atom({
  key:'poca_t_companyLogo',
  default:[]
})


export const proCat_companyLogoM = atom({
  key:'poca_t_companyLogoM',
  default:[]
})

export const proCat_loginState = atom({
  key: 'poca_t_loginState',
  default: false,
})

export const proCat_CartCount = atom({
  key: 'poca_t_CartCount',
  default: 0
})

export const proCat_WishCount = atom({
  key: 'poca_t_WishCount',
  default: 0
})

export const proCat_cartB2CDrawer = atom({
  key: 'poca_t_cartB2CDrawer',
  default: false
})

export const proCat_DiamondRangeArr = atom({
  key: 'poca_t_DiamondRangeArr',
  default: []
})
export const defaultAddressState = atom({
  key: 'poca_t_defaultAddressState',
  default: []
})

export const soketProductData = atom({
  key: 'poca_t_soketProductData',
  default: []
})