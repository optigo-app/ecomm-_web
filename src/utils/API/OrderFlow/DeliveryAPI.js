import { CommonAPI } from '../../API/CommonAPI/CommonAPI';

export const fetchAddresses = async () => {
    try {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"GETSHIPINGADDRESS\",\"appuserid\":\"${storedData.userid}\"}`,
            "f": "Delivery (FetchAddress)",
            p: encodedCombinedValue
        };
        const response = await CommonAPI(body);
        if (response.Data.rd) {
            return response.Data.rd;
        } else {
            // toast.error('Something went wrong');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const addAddress = async (formData) => {
    try {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            addrid: ``, firstname: `${formData.firstName}`, lastname: `${formData.lastName}`, street: `${formData.address}`, addressprofile: `${formData.firstName + formData.lastName}`, city: `${formData.city}`, state: `${formData.state}`, country: `${formData.country}`, zip: `${formData.zipCode}`, mobile: `${formData.mobileNo}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"ADDADDRESS\",\"appuserid\":\"${storedData.userid}\"}`,
            "f": "Delivery (AddAddress)",
            p: encodedCombinedValue
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
            fetchAddresses();
        } else {
            // toast.error('Something went wrong');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const editAddress = async (index, formData) => {
    try {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        const addressData = JSON.parse(localStorage.getItem('addressData'));

        const combinedValue = JSON.stringify({
            addrid: `${index}`, firstname: `${formData.firstName}`, lastname: `${formData.lastName}`, street: `${formData.address}`, addressprofile: `${formData.firstName + formData.lastName}`, city: `${formData.city}`, state: `${formData.state}`, country: `${formData.country}`, zip: `${formData.zipCode}`, mobile: `${formData.mobileNo}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"EDITADDRESS\",\"appuserid\":\"${storedData.userid}\"}`,
            "f": "Delivery (EditAddress)",
            p: encodedCombinedValue
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
            fetchAddresses();
        } else {
            // toast.error('Something went wrong');
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;

        const combinedValue = JSON.stringify({
            addrid: `${addressId}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"DELETEADDRESS\",\"appuserid\":\"${storedData.userid}\"}`,
            "f": "Delivery (DeleteAddress)",
            p: encodedCombinedValue
        };
        const response = await CommonAPI(body);
        return response.Data.rd[0].stat === 1;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
};

export const setDefaultAddress = async (address) => {
    debugger
    try {
        const storedData = JSON.parse(localStorage.getItem('loginUserDetail'));
        const storeInit = JSON.parse(localStorage.getItem('storeInit'));
        const { FrontEnd_RegNo } = storeInit;
        const addressId = address?.id;

        const combinedValue = JSON.stringify({
            addrid: `${addressId}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${storedData.id}`
        });
        const encodedCombinedValue = btoa(combinedValue);
        const body = {
            "con": `{\"id\":\"\",\"mode\":\"SETDEFAULTADDRESS\",\"appuserid\":\"${storedData.userid}\"}`,
            "f": "Delivery (SetDefaultAddress)",
            p: encodedCombinedValue
        };
        const response = await CommonAPI(body);
        if (response.Data.rd[0].stat === 1) {
            fetchAddresses();
        } else {
            // toast.error('Something went wrong');
            return address;
        }
    } catch (error) {
        console.error('Error:', error);
        return address;
    }
};
