import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
import { fetchAddresses, addAddress, editAddress, deleteAddress, setDefaultAddress } from '../../API/OrderFlow/DeliveryAPI';
import { toast } from 'react-toastify';

export const useAddress = () => {
    const [addressData, setAddressData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipCode: ''
    });
    const [errors, setErrors] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [editAddressIndex, setEditAddressIndex] = useState(null);
    const [deleteId, setDeleteId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchInitialData = async () => {
        setIsLoading(true);
        const addresses = await fetchAddresses();
        setAddressData(addresses);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const handleOpen = (addressId) => {
        console.log('addressId', addressData);
        if (addressId) {
            const address = addressData?.find(addr => addr?.id === addressId);
            setFormData({
                firstName: address?.shippingfirstname,
                lastName: address?.shippinglastname,
                mobileNo: address?.shippingmobile,
                address: address?.street,
                country: address?.country,
                state: address?.state,
                city: address?.city,
                zipCode: address?.zip
            });
            setIsEditMode(true);
            setEditAddressId(addressId);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                mobileNo: '',
                address: '',
                country: '',
                state: '',
                city: '',
                zipCode: ''
            });
            setIsEditMode(false);
        }
        setOpen(true);
    };
    console.log('editAddressId', editAddressId);
    const handleClose = () => {
        setOpen(false);
        setErrors({});
        setFormData({
            firstName: '',
            lastName: '',
            mobileNo: '',
            address: '',
            country: '',
            state: '',
            city: '',
            zipCode: ''
        });
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value
        }));

        validateField(field, value);
    };

    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'firstName':
                if (!value) error = 'First name is required';
                break;
            case 'lastName':
                if (!value) error = 'Last name is required';
                break;
            case 'mobileNo':
                if (!value) error = 'Mobile number is required';
                else if (value.length < 10) error = 'Mobile number must be at least 10 digits';
                break;
            case 'address':
                if (!value) error = 'Address is required';
                break;
            case 'country':
                if (!value) error = 'Country is required';
                break;
            case 'state':
                if (!value) error = 'State is required';
                break;
            case 'city':
                if (!value) error = 'City is required';
                break;
            case 'zipCode':
                if (!value) error = 'ZIP code is required';
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';
        if (!formData.mobileNo) {
            formErrors.mobileNo = 'Mobile number is required';
        } else if (formData.mobileNo.length < 10) {
            formErrors.mobileNo = 'Mobile number must be at least 10 digits';
        }
        if (!formData.address) formErrors.address = 'Address is required';
        if (!formData.country) formErrors.country = 'Country is required';
        if (!formData.state) formErrors.state = 'State is required';
        if (!formData.city) formErrors.city = 'City is required';
        if (!formData.zipCode) formErrors.zipCode = 'ZIP code is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            if (isEditMode) {
                const updatedAddress = await editAddress(editAddressId, formData);
                if (updatedAddress) {
                    fetchInitialData()
                    // toast.success('Address updated successfully');
                } else {
                    // toast.error('Something went wrong');
                }
            } else {
                const newAddress = await addAddress(formData);
                if (newAddress) {
                    fetchInitialData()
                    // toast.success('Address added successfully');
                } else {
                    // toast.error('Something went wrong');
                }
            }
            handleClose();
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        setErrors({});
        setFormData({
            firstName: '',
            lastName: '',
            mobileNo: '',
            address: '',
            country: '',
            state: '',
            city: '',
            zipCode: ''
        });
    }

    const handleDelete = async (addressId) => {
        setIsLoading(true);
        const success = await deleteAddress(deleteId);
        if (success[0]?.stat == 1) {
            setAddressData(addressData.filter((item) => item.id !== addressId));
            fetchInitialData();
            // toast.success('Address deleted successfully');
        } else {
            // toast.error('Something went wrong');
        }
        setIsLoading(false);
        handleDeleteClose();
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setDeleteId('');
        setOpenDelete(false);
    };

    const handleDefaultSelection = async (addressId) => {
        const address = addressData.find(addr => addr?.id === addressId?.id);
        if (address && address.isdefault === 1) {
            return;
        }

        setIsLoading(true);

        try {
            const updatedAddressData = await setDefaultAddress(addressId, addressData);
            console.log('updatedAddressData', updatedAddressData);
            if (updatedAddressData[0]?.stat == 1) {
                fetchInitialData();
            }
        } catch (error) {
            console.error('Error setting default address:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const defaultAddressItem = addressData.find(item => item.isdefault === 1);
        if (defaultAddressItem) {
            let deafu = JSON.stringify(defaultAddressItem)
            localStorage.setItem('selectedAddressId', deafu)
        } else {
            return;
        }
    }, [addressData]);


    const proceedToOrder = (navigation) => {
        if (!addressData || addressData.length === 0) {
            toast.error('Please add an address');
            return;
        }
        const requiredFields = ['addressprofile', 'city', 'state', 'country', 'zip', 'street', 'shippingfirstname', 'shippinglastname', 'shippingmobile'];
        const defaultAddress = addressData.find(item => item.isdefault === 1);
    
        if (!defaultAddress) {
            toast.error('Please first select the shipping address');
            return;
        }
        const hasEmptyField = requiredFields.some(field => !defaultAddress[field] || defaultAddress[field].trim() === '');
        if (hasEmptyField) {
            toast.error('Please fill in all required fields');
            return;
        }
        navigation('/payment');
        window.scrollTo(0, 0);
    };
    

    return {
        addressData,
        open,
        openDelete,
        formData,
        errors,
        isEditMode,
        isLoading,
        handleOpen,
        handleClose,
        handleCancel,
        handleInputChange,
        handleSubmit,
        handleDelete,
        handleDeleteClick,
        handleDeleteClose,
        handleDefaultSelection,
        proceedToOrder
    };
};
