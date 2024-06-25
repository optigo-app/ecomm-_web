import { CommonAPI } from "../CommonAPI/CommonAPI";

export const updateQuantity = async (num, lastEnteredQuantity) => {
  try {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const { FrontEnd_RegNo } = storeInit;
    const loginUserDetail = JSON.parse(localStorage.getItem("loginUserDetail"))
    const UserEmail = localStorage.getItem("registerEmail")

    const combinedValue = JSON.stringify({
      CartId: `${num}`,
      Quantity: `${lastEnteredQuantity}`,
      FrontEnd_RegNo: `${FrontEnd_RegNo}`,
      Customerid: `${loginUserDetail?.id ?? 0}`,
    });
    const encodedCombinedValue = btoa(combinedValue);
    const body = {
      con: `{\"id\":\"\",\"mode\":\"UpdateQuantity\",\"appuserid\":\"${UserEmail ?? ""}\"}`,
      f: "header (handleUpdateQuantity)",
      p: encodedCombinedValue,
      dp: combinedValue,
    };
    if (lastEnteredQuantity !== "") {
      const response = await CommonAPI(body);

      return response;
    } else {
      // toast.error("ERROR !!!,Please Check QTY");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

