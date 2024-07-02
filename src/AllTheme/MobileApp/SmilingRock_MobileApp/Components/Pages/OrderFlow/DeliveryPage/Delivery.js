import React from 'react';
import './Delivery.scss'
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import DeleteDialog from './DeleteDialog';
import { useAddress } from '../../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import { Grid, Button } from '@mui/material';
import SkeletonLoader from './AddressSkelton';

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
            <div className='smrMo_secondMaindivAdd'>
                <div className='smrMo_addMainDiv'>
                    {!isLoading ? (
                        <div className='smrMo_getAddrMainDiv'>
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
