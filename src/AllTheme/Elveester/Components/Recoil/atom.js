import { atom } from "recoil";
import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

export const el_companyLogo = atom({
  key: 'elv_companyLogo',
  default: '',
})

export const el_companyLogoM = atom({
  key: 'elv_companyLogoM',
  default: '',
})

export const el_loginState = atom({
  key: 'elv_loginState',
  default: false,
})

export const el_CartCount = atom({
  key: 'elv_CartCount',
  default: 0
})

export const el_WishCount = atom({
  key: 'elv_WishCount',
  default: 0
})

export const defaultAddressState = atom({
  key: 'elv_defaultAddressState',
  default: null,
});

export const timerExpiredState = atom({
  key: 'elv_timerExpiredState',
  default: false,
});

export const redirectModal = atom({
  key: 'elv_redirectModal',
  default: false,
});