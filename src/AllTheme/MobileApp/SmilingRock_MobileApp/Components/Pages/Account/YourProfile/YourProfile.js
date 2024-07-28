import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import { TextField, Modal, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { saveEditProfile } from '../../../../../../../utils/API/AccountTabs/YourProfile';
import MobViewHeader from '../MobViewHeader/MobViewHeader';

export default function YourProfile() {
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedUserData = localStorage.getItem('loginUserDetail');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    console.log('userDatauserDatauserData',userData);

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
                } else if (value?.length < 1) {
                    errorsCopy.defaddress_shippingfirstname = 'First Name is too short';
                } else if (value?.length > 25) {
                    errorsCopy.defaddress_shippingfirstname = 'First Name is too long';
                } else if (!/^(?![\d\s!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`])[^\s][^\n]+$/.test(value.trim())) {
                    errorsCopy.defaddress_shippingfirstname = 'Invalid First Name';
                } else {
                    errorsCopy.defaddress_shippingfirstname = '';
                }
                break;
            case 'defaddress_shippinglastname':
                if (!value.trim()) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is required';
                } else if (value?.length < 1) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is too short';
                } else if (value?.length > 25) {
                    errorsCopy.defaddress_shippinglastname = 'Last Name is too long';
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

    const handleSave = async () => {

        setEditMode(false);
        try {
            setIsLoading(true);
            const storedData = localStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const storeInit = JSON.parse(localStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;

            // const combinedValue = JSON.stringify({
            //     firstname: `${editedUserData.defaddress_shippingfirstname}`, 
            //     lastname: `${editedUserData.defaddress_shippinglastname}`, 
            //     street: `${editedUserData.defaddress_state}`, 
            //     addressprofile: `${editedUserData.defaddress_shippingfirstname + ' ' + editedUserData.defaddress_shippinglastname}`, 
            //     city: `${editedUserData.city}`, 
            //     state: `${editedUserData.state}`, 
            //     country: `${userData.defaddress_country}`, 
            //     zip: `${userData.defaddress_zip}`, 
            //     mobile: `${userData.defaddress_shippingmobile}`, FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${editedUserData.id}`
            // });

            // const encodedCombinedValue = btoa(combinedValue);

            // const body = {
            //     "con": `{\"id\":\"\",\"mode\":\"EDITPROFILE\",\"appuserid\":\"${data.userid}\"}`,
            //     "f": "YourProfile (EditProfile)",
            //     p: encodedCombinedValue
            // };

            // const response = await CommonAPI(body);

            const response = await saveEditProfile(editedUserData, data, FrontEnd_RegNo, userData);

            if (response?.Data?.rd[0]?.stat === 1) {

                toast.success('Edit success');
                setUserData(editedUserData);
                localStorage.setItem('loginUserDetail', JSON.stringify(editedUserData));

            } else {
                toast.error('error');
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setEditMode(false);
    };


    console.log('userDatauserData', userData);


    return (
        <div>
            <ToastContainer />

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}

            <MobViewHeader title="Your Profile" />

            {/* <div className='comptitle fw-bold'>Your Profile</div> */}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', padding: '10px' }}>
                <div className='userProfileMain' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                                    // value={userData.defaddress_shippingfirstname !== undefined ? userData.defaddress_shippingfirstname : userData.firstname}
                                    value={userData?.defaddress_shippingfirstname || ''}
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
                                    // value={userData.defaddress_shippinglastname !== undefined ? userData.defaddress_shippinglastname : userData.lastname}
                                    value={userData?.defaddress_shippinglastname || ''}
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
                                    value={userData?.defaddress_street || ''}
                                    // disabled={!editMode}
                                    disabled
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className='btnPaddingYP'>
                    <button onClick={handleEdit} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Edit Profile</button>
                </div>
            </div>

            <Modal open={editMode} onClose={handleClose} style={{ padding: '10px' }} >
                <div className='smilingEditProfilePopup' style={{ position: 'absolute', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, boxShadow: 24, p: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
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
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '25px', padding: '10px' }}>
                        <button onClick={handleSave} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginInline: '5px' }}>Save</button>
                        <button onClick={() => setEditMode(false)} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray' }}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

// import React from 'react'

// const YourProfile = () => {
//   return (
//     <div>YourProfile</div>
//   )
// }

// export default YourProfile