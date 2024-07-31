import { atom } from "recoil";
import { storImagePath } from "../../../../utils/Glob_Functions/GlobalFunction";

export const el_companyLogo = atom({
    key:'dt_companyLogo',
    default:[`${storImagePath()}/images/HomePage/MainBanner/featuresImage.png`]
  })

  export const el_loginState = atom({
    key: 'el_loginState',
    default: false,
  })

  export const el_CartCount = atom({
    key: 'dt_CartCount',
    default: 0
  })

  export const el_WishCount = atom({
    key: 'dt_WishCount',
    default: 0
  })

  export const defaultAddressState = atom({
    key: 'defaultAddressState',
    default: null,
  });