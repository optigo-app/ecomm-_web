import { atom } from "recoil";

export const roop_companyLogo = atom({
  key:'roop_j_companyLogo',
  default:[]
})

export const roop_companyLogoM = atom({
  key:'roop_companyLogoM',
  default:[]
})

export const roop_loginState = atom({
  key: 'roop_j_loginState',
  default: false,
})

export const roop_CartCount = atom({
  key: 'roop_j_CartCount',
  default: 0
})

export const roop_WishCount = atom({
  key: 'roop_j_WishCount',
  default: 0
})

export const roop_cartB2CDrawer = atom({
  key: 'roop_j_cartB2CDrawer',
  default: false
})

export const roop_DiamondRangeArr = atom({
  key: 'roop_j_DiamondRangeArr',
  default: []
})

export const roop_defaultAddressState = atom({
  key: 'roop_j_defaultAddressState',
  default: null,
});

export const roop_CartNo = atom({
  key: 'roop_j_cartNo',
  default: 0,
});

export const lookBookDrawer = atom({
  key: 'roop_j_lookBookDrawer',
  default: false,
});
