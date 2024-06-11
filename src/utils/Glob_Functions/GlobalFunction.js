export function storImagePath(){
  let storeinit = JSON.parse(localStorage.getItem("storeInit"))
  return `${storeinit?.UploadLogicalPath}/${storeinit?.ukey}/${storeinit?.ufcc}`
}
