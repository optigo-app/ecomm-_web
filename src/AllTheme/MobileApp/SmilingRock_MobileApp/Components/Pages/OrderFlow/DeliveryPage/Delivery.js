import React from 'react';
import './Delivery.scss'
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import DeleteDialog from './DeleteDialog';
import { useAddress } from '../../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import { Grid, Button } from '@mui/material';
import SkeletonLoader from './AddressSkelton';
import { IoArrowBack } from 'react-icons/io5';

const AddressManagement = () => {
    const {
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
    } = useAddress();

    const navigate = useNavigate();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className='smrMo_DeliverMainDiv'>
            <p className="SmiCartListTitle">
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigate(-1)} />Select delivery address
            </p>
            <div className='smrMo_secondMaindivAdd'>
                <div className='smrMo_addMainDiv'>
                    {!isLoading ? (
                        <div className='smrMo_getAddrMainDiv'>
                            {addressData?.length != 0 ? (
                                <Grid container spacing={2}>
                                    {addressData?.map((data, index) => (
                                        <React.Fragment key={data.id} >
                                            <AddressCard
                                                key={data.id}
                                                name={data.name}
                                                address={data}
                                                index={index}
                                                handleOpen={handleOpen}
                                                handleDeleteClick={handleDeleteClick}
                                                handleDefaultSelection={handleDefaultSelection} />
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            ) :
                                <div className='smrMo_noAddresslistData'>
                                    <p className='smrmo_title'>No Shipping Address Found!</p>
                                    <p className='smrmo_desc'>Please First Add Shipping Address</p>
                                    <button className='smrmo_browseOurCollectionbtn'  onClick={() => handleOpen(null)}>Add New Address</button>
                                </div>
                            }
                        </div>
                    ) :
                        <SkeletonLoader />
                    }
                    <AddressForm
                        open={open}
                        handleClose={handleClose}
                        handleCancel={handleCancel}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        isEditMode={isEditMode}
                    />
                    <DeleteDialog
                        openDelete={openDelete}
                        handleDeleteClose={handleDeleteClose}
                        handleDelete={() => handleDelete()}
                    />
                </div>
            </div>

            <div className='smrMo_AddressBtnGroup'>
                <button fullWidth className='smrMo_AddNewAddrbtn' onClick={() => handleOpen(null)}>Add New Address</button>
                <button fullWidth className='smrMo_ContinueOrderbtn' onClick={() => proceedToOrder(navigate)}>Continue</button>
            </div>
        </div>
    );
};

export default AddressManagement;
