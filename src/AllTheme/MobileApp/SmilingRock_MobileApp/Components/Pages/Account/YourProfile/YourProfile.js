import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import { TextField, Modal, CircularProgress, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { saveEditProfile } from '../../../../../../../utils/API/AccountTabs/YourProfile';
import MobViewHeader from '../MobViewHeader/MobViewHeader';
import { smrMA_defaultAddressState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { getAddressData } from '../../../../../../../utils/API/AccountTabs/manageAddress';

export default function YourProfile() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const defaultAddress = useRecoilValue(smrMA_defaultAddressState);
    const [addressPresentFlag, setAddressPresentFlag] = useState(false);

    const [toastMsg, setToastMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const handleCloseSnackbar = () => {
        setShowToast(false);
    };
    // useEffect(() => {
    //     const storedUserData = localStorage.getItem('loginUserDetail');
    //     if (storedUserData) {
    //         const parsedUserData = JSON.parse(storedUserData);
    //         if (defaultAddress) {
    //             const updatedUserData = {
    //                 ...parsedUserData,
    //                 defaddress_shippingfirstname: defaultAddress?.shippingfirstname,
    //                 defaddress_shippinglastname: defaultAddress?.shippinglastname,
    //                 defaddress_shippingmobile: defaultAddress?.shippingmobile,
    //                 defaddress_addressprofile: defaultAddress?.addressprofile,
    //                 defaddress_street: defaultAddress?.street,
    //                 defaddress_city: defaultAddress?.city,
    //                 defaddress_state: defaultAddress?.state,
    //                 defaddress_country: defaultAddress?.country,
    //                 defaddress_zip: defaultAddress?.zip,
    //                 IsDefault: defaultAddress?.isdefault
    //             };
    //             setUserData(updatedUserData);
    //         } else {
    //             console.log(parsedUserData);
    //             setUserData(parsedUserData);
    //         }
    //     }
    // }, [defaultAddress]);

    useEffect(() => {
        const storedUserData = localStorage.getItem('loginUserDetail');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            if (defaultAddress) {
                const updatedUserData = {
                    ...parsedUserData,
                    defaddress_shippingfirstname: defaultAddress?.shippingfirstname,
                    defaddress_shippinglastname: defaultAddress?.shippinglastname,
                    defaddress_shippingmobile: defaultAddress?.shippingmobile,
                    defaddress_addressprofile: defaultAddress?.addressprofile,
                    defaddress_street: defaultAddress?.street,
                    defaddress_city: defaultAddress?.city,
                    defaddress_state: defaultAddress?.state,
                    defaddress_country: defaultAddress?.country,
                    defaddress_zip: defaultAddress?.zip,
                    IsDefault: defaultAddress?.isdefault
                };
                setUserData(updatedUserData);
            } else {
                console.log(parsedUserData);
                setUserData(parsedUserData);
            }
        }
    }, [defaultAddress]);



    console.log('userDatauserDatauserData', userData);

    const handleEdit = () => {
        setEditedUserData({ ...userData });
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));


        // Validate the field
        const errorsCopy = { ...errors };

        switch (id) {
            case 'defaddress_shippingfirstname':
                if (!value.trim()) {
                    errorsCopy.defaddress_shippingfirstname = 'First Name is required';
                } else if (value?.length < 2) {
                    errorsCopy.defaddress_shippingfirstname = 'First Name is too short';
                } else if (value?.length > 25) {
                    errorsCopy.defaddress_shippingfirstname = 'First Name is too long';
                    // } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                    errorsCopy.defaddress_shippingfirstname = 'Invalid First Name';
                } else {
                    errorsCopy.defaddress_shippingfirstname = '';
                }
                break;
            case 'defaddress_shippinglastname':
                if (!value.trim()) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is required';
                } else if (value?.length < 2) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is too short';
                } else if (value?.length > 25) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is too long';
                    // } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                    errorsCopy.defaddress_shippinglastname = 'Invalid Last Name';
                } else {
                    errorsCopy.defaddress_shippinglastname = '';
                }
                break;
            case 'defaddress_street':
                if (!value.trim()) {
                    errorsCopy.defaddress_street = 'Address is required';
                } else {
                    errorsCopy.defaddress_street = '';
                }
                // if (!value.trim()) {
                //     errorsCopy.defaddress_street = 'Address is required';
                // } else if(value?.length < 3){
                //     errorsCopy.defaddress_street = 'Address is too short';
                // } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                //     errorsCopy.defaddress_street = 'Invalid Address';
                // } else {
                //     errorsCopy.defaddress_street = '';
                // }
                break;
            case 'defaddress_shippingmobile':
                if (!value.trim()) {
                    errorsCopy.defaddress_shippingmobile = 'Mobile No. is required';
                } else if (!/^\d{10}$/.test(value.trim())) {
                    errorsCopy.defaddress_shippingmobile = 'Enter Valid mobile number';
                } else {
                    errorsCopy.defaddress_shippingmobile = '';
                }
                break;
            default:
                break;
        }

        setErrors(errorsCopy);

    };


    const validate = () => {

        let tempErrors = {};
        if (!editedUserData.defaddress_shippingfirstname?.length) {
            tempErrors.defaddress_shippingfirstname = "First Name is required";
        } else if (editedUserData.defaddress_shippingfirstname.length < 2) {
            tempErrors.defaddress_shippingfirstname = "First Name is too short";
        } else if (editedUserData.defaddress_shippingfirstname.length > 25) {
            tempErrors.defaddress_shippingfirstname = "First Name is too long";
        } 

        // Last Name validation
        if (!editedUserData.defaddress_shippinglastname?.length) {
            tempErrors.defaddress_shippinglastname = "Last Name is required";
        } else if (editedUserData.defaddress_shippinglastname.length < 2) {
            tempErrors.defaddress_shippinglastname = "Last Name is too short";
        } else if (editedUserData.defaddress_shippinglastname.length > 25) {
            tempErrors.defaddress_shippinglastname = "Last Name is too long";
        }

        // Mobile Number validation
        if (!editedUserData.defaddress_shippingmobile?.length) {
            tempErrors.defaddress_shippingmobile = "Mobile Number is required";
        } else if (editedUserData.defaddress_shippingmobile.length !== 10 || isNaN(editedUserData.defaddress_shippingmobile)) {
            tempErrors.defaddress_shippingmobile = "Mobile Number must contain exactly 10 digits";
        }

        // User ID validation
        if (!editedUserData.userid) {
            tempErrors.userid = "User ID is required";
        }

        // Street Address validation
        if (!editedUserData.defaddress_street) {
            tempErrors.defaddress_street = "Street Address is required";
        }

        setErrors(tempErrors);

        // Check if all errors are empty strings or undefined
        return Object.values(tempErrors).every(x => !x);
    };

    // const handleSave = async (event) => {
    //     event.preventDefault();

    //     if (validate()) {

    //         setEditMode(false);
    //         try {
    //             setIsLoading(true);
    //             const storedData = localStorage.getItem('loginUserDetail');
    //             const data = JSON.parse(storedData);
    //             const storeInit = JSON.parse(localStorage.getItem('storeInit'));
    //             const { FrontEnd_RegNo } = storeInit;
    //             const response = await saveEditProfile(editedUserData, data, FrontEnd_RegNo);
    //             if (response?.Data?.rd[0]?.stat === 1) {
    //                 toast.success('Edit success');
    //                 setUserData(editedUserData);
    //                 localStorage.setItem('loginUserDetail', JSON.stringify(editedUserData));
    //             } else {
    //                 toast.error('Error in saving profile.');
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //             toast.error('An error occurred. Please try again.');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     //  else {
    //     //     toast.error('Please fill out form fields correctly.');
    //     // }
    // };
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(event);
        if (validate()) {
            
            setEditMode(false);
            try {
                setIsLoading(true);
                const storedData = localStorage.getItem('loginUserDetail');
                const data = JSON.parse(storedData);
                const storeInit = JSON.parse(localStorage.getItem('storeInit'));
                const { FrontEnd_RegNo } = storeInit;
                const response = await saveEditProfile(editedUserData, data, FrontEnd_RegNo);
                if (response?.Data?.rd[0]?.stat === 1) {
                    console.log('response yp mapp', response);
                    // toast.success('Edit success');
                    setToastMsg('Update successfully');
                    setShowToast(true);
                    setUserData(editedUserData);
                    localStorage.setItem('loginUserDetail', JSON.stringify(editedUserData));
                } else {
                    // toast.error('Error in saving profile.');
                    setToastMsg('Error in saving profile.');
                    setShowToast(true);
                }
            } catch (error) {
                console.error('Error:', error);
                // toast.error('An error occurred. Please try again.');
                setToastMsg('An error occurred. Please try again.');
                setShowToast(true);
            } finally {
                setIsLoading(false);
            }
        } else {
            // toast.error('Please fill necessary details.');
            setToastMsg('Please fill necessary details.');
            setShowToast(true);
        }
    };


    const handleClose = () => {
        setEditMode(false);
    };


    console.log('userDatauserData', userData);

    useEffect(() => {
        fetchAddress();
    }, [])

    const fetchAddress = async() => {
        setIsLoading(true);
        try {
            const storedData = localStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const customerid = data.id;
            
            const storeInit = JSON.parse(localStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;
            
            const response = await getAddressData(FrontEnd_RegNo, customerid, data);
            if(response?.Data?.rd?.length > 0){
                setAddressPresentFlag(true);
                setIsLoading(false);
            }else{
                setIsLoading(false);
            }    
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
        
    }

    const handleCancel = () => {
        setEditMode(false)
        setErrors({});
    }

    return (
        <div>
            <ToastContainer />

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
             <div className="sticky-header">
                <MobViewHeader title="Your Profile" />
             </div>

            {/* <div className='comptitle fw-bold'>Your Profile</div> */}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
               {
                addressPresentFlag &&  <div className='userProfileMain' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {userData && (
                    <>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                autoFocus
                                id="defaddress_shippingfirstname"
                                label="First Name"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px', color: 'black' }}
                                // value={userData.defaddress_shippingfirstname ? userData.defaddress_shippingfirstname : userData.firstname}
                                value={userData?.defaddress_shippingfirstname || ''}
                                // value={userData?.defaddress_shippingfirstname || ''}
                                // disabled={!editMode}
                                disabled
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="defaddress_shippinglastname"
                                label="Last Name"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                // value={userData.defaddress_shippinglastname ? userData.defaddress_shippinglastname : userData.lastname}
                                value={userData?.defaddress_shippinglastname || ''}
                                // value={userData?.defaddress_shippinglastname || ''}
                                // disabled={!editMode}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                id="userid"
                                label="Email"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                // value={userData.userid !== "undefined" ? userData.userid : ""}
                                value={userData?.userid || ''}
                                // disabled={!editMode}
                                disabled
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="defaddress_shippingmobile"
                                label="Mobile No."
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                // value={(userData.defaddress_shippingmobile || userData.mobile) !== "undefined" ? (userData.defaddress_shippingmobile || userData.mobile) : ""}
                                // value={userData?.defaddress_shippingmobile || ''}
                                value={userData?.defaddress_shippingmobile || ''}
                                // disabled={!editMode}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='mobileEditProfileDiv'>
                            <TextField
                                id="defaddress_street"
                                label="Address"
                                variant="outlined"
                                className='labgrowRegister'
                                style={{ margin: '15px' }}
                                // value={userData.defaddress_street !== "undefined" ? userData.defaddress_street : ""}
                                // value={userData?.defaddress_street || ''}
                                value={userData?.defaddress_street || ''}
                                // disabled={!editMode}
                                disabled
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}
            </div>
               }
                { addressPresentFlag && <div className='btnPaddingYP'>
                    <button onClick={handleEdit} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Edit Profile</button>
                </div>}
            </div>

            <Modal open={editMode} onClose={handleClose} style={{ padding: '10px' }} >
                <div className='smilingEditProfilePopup pop_yp_MAPP' style={{ position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, boxShadow: 24 }}>
                    <form  onSubmit={(event) => handleSubmit(event)} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Edit Profile</h2>
                        {editedUserData && (
                            <>
                                <TextField
                                    id="defaddress_shippingfirstname"
                                    label="First Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippingfirstname !== "undefined" ? editedUserData.defaddress_shippingfirstname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippingfirstname}
                                    helperText={errors.defaddress_shippingfirstname}
                                />
                                <TextField
                                    id="defaddress_shippinglastname"
                                    label="Last Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippinglastname !== "undefined" ? editedUserData.defaddress_shippinglastname : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippinglastname}
                                    helperText={errors.defaddress_shippinglastname}
                                />
                                <TextField
                                    id="userid"
                                    label="Email"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.userid !== "undefined" ? editedUserData.userid : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.userid}
                                    helperText={errors.userid}
                                    disabled
                                />
                                <TextField
                                    id="defaddress_shippingmobile"
                                    label="Mobile No."
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippingmobile !== "undefined" ? editedUserData.defaddress_shippingmobile : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_shippingmobile}
                                    helperText={errors.defaddress_shippingmobile}
                                />
                                <TextField
                                    id="defaddress_street"
                                    label="Address"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_street !== "undefined" ? editedUserData.defaddress_street : ""}
                                    onChange={handleInputChange}
                                    error={!!errors.defaddress_street}
                                    helperText={errors.defaddress_street}
                                />
                            </>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '25px', padding: '10px' }}>
                            <button type='submit'  className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginInline: '5px' }}>Save</button>
                            <button onClick={() => handleCancel()} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray' }}>Cancel</button>
                        </div>
                    </form>

                </div>
            </Modal>
            <Snackbar
                open={showToast}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message={`${toastMsg}`}
                className='smr_MoSnakbarTM'
            />
        </div>
    );
}