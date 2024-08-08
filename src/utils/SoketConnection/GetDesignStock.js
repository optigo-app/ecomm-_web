import { CommonAPI } from "../API/CommonAPI/CommonAPI";

export const GetDesignStock = async (visiterId) => {
  let response;

  try {
    const storeInit = JSON.parse(localStorage.getItem("storeInit"));
    const email = localStorage.getItem("registerEmail") ?? "";

    let body = {
      con: `{\"id\":\"\",\"mode\":\"GetDesignStock\",\"appuserid\":\"${
        email ?? ""
      }\"}`,
      f: "GetDesignStock",
      dp: "{}",
    };

    response = await CommonAPI(body);
  } catch (error) {
    console.error("Error:", error);
  }

  return response;
};
