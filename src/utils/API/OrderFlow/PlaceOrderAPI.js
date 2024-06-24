import { CommonAPI } from "../CommonAPI/CommonAPI";

export const handlePaymentAPI = async () => {
    try {
        const storedData = localStorage.getItem('loginUserDetail');
        const selectedAddressId = localStorage.getItem('selectedAddressId');
        const selctedid = JSON.parse(selectedAddressId);


        const data = JSON.parse(storedData);
        const customerid = data?.id;
        const currencyId = data?.CurrencyCodeid

        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            addrid: `${selctedid.id}`, PaymentMethod: 'Cash on Delivery', Istempaddress: '', addrType: 'select', OrderPlacedFrom: "1", CurrencyId: `${currencyId}`, orderRemarks: '', FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
        });

        console.log('combinedValuecombinedValue...', combinedValue);

        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"Store\",\"mode\":\"PlaceOrder\",\"appuserid\":\"${data.userid}\"}`,
            "f": "m-test2.orail.co.in (PlaceOrder)",
            "p": encodedCombinedValue,
            "dp": combinedValue
        };

        const response = await CommonAPI(body); 

        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}