import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Delivery.modul.scss';
import NewAddressModal from '../NewAddressModal/NewAddressModal';
import { useAddress } from '../../../../../../utils/Glob_Functions/OrderFlow/useAddress';
import { Breadcrumbs, Grid, Typography } from '@mui/material';
import CardSkeleton from './CardSkeleton';
import AddressCard from './AddressCard';
import DeleteDialog from './DeleteDialog';
import { OrderFlowCrumbs } from '../../Cart/OrderFlowCrumbs';

const Delivery = () => {
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
    const handleBackButton = (e) => {
        e.preventDefault();
        navigate(-1)
    }
    return (
        <>
            <div className="elv_delivery_Main_div">
                <div className="elv_delivery_lists_div">
                    <div className="elv_delivery_lists_header">
                        <div className="elv_delivery_lists_header_breadcrumb">
                            <div className="elv_delivery_lists_name">
                                <div className="elv_delivery_details">
                                    <span className="elv_delivery_details_1">
                                        Delivery
                                        <OrderFlowCrumbs param1={"My cart"} param2={'delivery'} param3={''} />
                                    </span>
                                </div>
                            </div>
                            <div className="elv_delivery_lists_header_logo">
                                <span>
                                    <p className="elv_delivery_ptitle">
                                        <img
                                            className="elv_delivery_logo"
                                            src="https://cdnfs.optigoapps.com/content-global3/estoreWJ3U0B6PVONQHL1TA/estore/images/HomePage/MainBanner/image/featuresImage.png"
                                            alt="Logo"
                                        />
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div className="elv_filteration_block_div">
                            <div className="elv_delblock_rows">
                                <div className="elv_delblock_rows_1" >
                                    <span className="elv_back_title" onClick={handleBackButton}>
                                        <span>Back</span>
                                    </span>
                                </div>
                                <div className="elv_delblock_rows_2" >
                                    <span className="elv_address_title" onClick={() => handleOpen(null)}>
                                        <span>Add new Address</span>
                                    </span>
                                </div>
                                <div className="elv_delblock_rows_3" >
                                    <span className="elv_address_count">
                                        <span>{addressData?.length}&nbsp;</span>
                                        <span>Address</span>
                                    </span>
                                </div>
                                <div className="elv_delblock_rows_4" >

                                </div>
                                <div className="elv_delblock_rows_5" onClick={() => proceedToOrder(navigate)}>
                                    <span className="elv_continue_title">
                                        continue
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='elv_TitleDetailMainDiv'>
                            <p className='elv_deliverydesc'>Order Will be delivered to selected address</p>
                        </div>
                        {!isLoading ? (
                            <div className='elv_getAddrMainDiv'>
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
                            <CardSkeleton />
                        }
                        <NewAddressModal
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
            </div>
        </>
    )
}

export default Delivery