import React from 'react';
import './Delivery.scss'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Divider } from '@mui/material';

export default function AddressForm({ open, handleClose, handleCancel, handleInputChange, handleSubmit, formData, errors, isEditMode }) {
    return (
        <Dialog open={open} onClose={handleClose}
        PaperProps={{
            style: {
              width: '600px',
              maxWidth: '600px',  // Optional: Limits the maximum width
            },
          }}
             >
            <form onSubmit={handleSubmit}>
                <DialogTitle className='proCat_dialogTitle'>{isEditMode ? 'Edit Shipping Address' : 'Add Shipping Address'}</DialogTitle>
                <Divider/>
                <DialogContent 
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center" ,
                    alignContent:"center",
                    gap:"1rem",
                    flex:"1",
                }}
                >
                    <TextField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange(e, 'firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange(e, 'lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="Mobile No."
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange(e, 'mobileNo')}
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                        fullWidth
                        type='number'
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange(e, 'address')}
                        error={!!errors.address}
                        helperText={errors.address}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="Country"
                        value={formData.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                        error={!!errors.country}
                        helperText={errors.country}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange(e, 'state')}
                        error={!!errors.state}
                        helperText={errors.state}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange(e, 'city')}
                        error={!!errors.city}
                        helperText={errors.city}
                        fullWidth
                        className='proCat_addressTextFields'
                    />
                    <TextField
                        label="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange(e, 'zipCode')}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode}
                        fullWidth
                        type='number'
                        className='proCat_addressTextFields'
                    />
                    <div className='proCat_AddressBtnGroup' style={{
                        width:"100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"space-between",
                        gap:'1rem'
                    }}>
                    <button type='submit' style={{flex:1 ,padding:"8px 0",border:"0",backgroundColor:'#7D7F85',color:"#fff",}} className='proCat_AddNewAddrModalbtn'>{isEditMode ? 'Save Changes' : 'Add Address'}</button>
                    <button type='button' style={{flex:1 ,padding:"8px 0",border:"0",backgroundColor:'#7D7F85',color:"#fff",}} className='proCat_Cancelbtn' onClick={handleCancel}>Cancel</button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
