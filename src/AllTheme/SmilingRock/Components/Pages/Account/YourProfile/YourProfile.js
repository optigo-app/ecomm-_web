import React, { useEffect, useState } from 'react';
import './YourProfile.scss';
import { TextField, Modal,  CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { saveEditProfile } from '../../../../../../utils/API/AccountTabs/YourProfile';
import { defaultAddressState } from '../../../Recoil/atom';
import { useRecoilValue } from 'recoil';


export default function YourProfile() {
    
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const defaultAddress = useRecoilValue(defaultAddressState);

    useEffect(() => {
        const storedUserData = localStorage.getItem('loginUserDetail');
        if (storedUserData) {
             
             
                setUserData(JSON.parse(storedUserData));    
             
            // setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const storedUserData = localStorage.getItem('loginUserDetail');
        if (storedUserData) {
             
                setUserData(JSON.parse(storedUserData));
                let obj = JSON.parse(storedUserData);
                
                obj.defaddress_shippingfirstname = defaultAddress?.shippingfirstname;
                obj.defaddress_shippinglastname = defaultAddress?.shippinglastname;
                obj.defaddress_shippingmobile = defaultAddress?.shippingmobile;
                obj.defaddress_addressprofile = defaultAddress?.addressprofile;
                obj.defaddress_street = defaultAddress?.street;
                obj.defaddress_city = defaultAddress?.city;
                obj.defaddress_state = defaultAddress?.state;
                obj.defaddress_country = defaultAddress?.country;
                obj.defaddress_zip = defaultAddress?.zip;
                obj.IsDefault = defaultAddress?.isdefault;
                setUserData(obj);
             
            // setUserData(JSON.parse(storedUserData));
        }
    }, [defaultAddress]);

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
    };

    const handleSave = async () => {

        setEditMode(false);
        try {
            setIsLoading(true);
            const storedData = localStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const storeInit = JSON.parse(localStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;

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
    return (
        <div className='smr_yourProfile'>
            <ToastContainer />

            {isLoading && (
                <div className="loader-overlay">
                    <CircularProgress className='loadingBarManage' />
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:'20px' }}>
                <div className='userProfileMain' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                                    value={userData?.defaddress_shippingfirstname}
                                    disabled={!editMode}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_shippinglastname"
                                    label="Last Name"
                                    variant="outlined"
                                    className='labgrowRegister'
                                    style={{ margin: '15px' }}
                                    // value={userData.defaddress_shippinglastname !== undefined ? userData.defaddress_shippinglastname : userData.lastname}
                                    value={userData?.defaddress_shippinglastname}
                                    disabled={!editMode}
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
                                    value={userData?.userid}
                                    disabled={!editMode}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_shippingmobile"
                                    label="Mobile No."
                                    variant="outlined"
                                    className='labgrowRegister'
                                    style={{ margin: '15px' }}
                                    // value={(userData.defaddress_shippingmobile || userData.mobile) !== "undefined" ? (userData.defaddress_shippingmobile || userData.mobile) : ""}
                                    value={userData?.defaddress_shippingmobile}
                                    disabled={!editMode}
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
                                    value={userData?.defaddress_street}
                                    disabled={!editMode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={handleEdit} className='SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginTop: '15px' }}>Edit Profile</button>
                </div>
            </div>

            <Modal
                open={editMode}
                onClose={handleClose}
            >
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
                                />
                                <TextField
                                    id="defaddress_shippinglastname"
                                    label="Last Name"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippinglastname !== "undefined" ? editedUserData.defaddress_shippinglastname : ""}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="userid"
                                    label="Email"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.userid !== "undefined" ? editedUserData.userid : ""}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_shippingmobile"
                                    label="Mobile No."
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_shippingmobile !== "undefined" ? editedUserData.defaddress_shippingmobile : ""}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    id="defaddress_street"
                                    label="Address"
                                    variant="outlined"
                                    style={{ margin: '15px' }}
                                    value={editedUserData.defaddress_street !== "undefined" ? editedUserData.defaddress_street : ""}
                                    onChange={handleInputChange}
                                />
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '25px' }}>
                        <button onClick={handleSave} className='smr_SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray', marginInline: '5px' }}>Save</button>
                        <button onClick={() => setEditMode(false)} className='smr_SmilingAddEditAddrwess' style={{ backgroundColor: 'lightgray' }}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
