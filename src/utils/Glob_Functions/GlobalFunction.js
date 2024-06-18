export function storImagePath(){
  let storeinit = JSON.parse(localStorage.getItem("storeInit"))
  return `${storeinit?.UploadLogicalPath}/${storeinit?.ukey}/${storeinit?.ufcc}`
}

export function findMetalColor(paramId) {
  let metalColorArr = JSON.parse(localStorage.getItem("MetalColorCombo"))
  let item = metalColorArr.filter(item => item?.id === paramId)
  return item
}


export function findMetalType(paramId) {
  let metalTypeArr = JSON.parse(localStorage.getItem("metalTypeCombo"))
  let item = metalTypeArr.filter(item => item?.Metalid === paramId)
  return item
}