import { atom } from "recoil";

export const smrMA_companyLogo = atom({
    key:'smr_r_m_companyLogo',
    default:[]
})

export const  smrMA_loginState = atom({
  key: 'smr_r_m_loginState',
  default: false,
})

export const  smrMA_CartCount = atom({
  key: 'smr_r_m_CartCount',
  default: 0
})

export const  smrMA_WishCount = atom({
  key: 'smr_r_m_WishCount',
  default: 0
})

export const smrMA_defaultAddressState = atom({
  key: 'smr_r_m_defaultAddressState',
  default: null,
});

export const smrMA_ShowSnackBar = atom({
  key: 'smr_r_m_smrMA_ShowSnackBar',
  default: false,
});

export const smrMA_homeLoading = atom({
  key: 'smr_r_m_smrMA_homeLoading',
  default: true
})
