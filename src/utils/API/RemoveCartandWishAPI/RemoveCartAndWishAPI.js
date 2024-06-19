export const RemoveCartAndWishAPI = () =>{
    let body = {
        con: `{\"id\":\"Store\",\"mode\":\"removeFromCartList\",\"appuserid\":\"${UserEmail}\"}`,
        f: "onloadFirstTime (getdesignpricelist)",
        p: btoa(FinalObj),
        dp: JSON.stringify(FinalObj),
      };
}