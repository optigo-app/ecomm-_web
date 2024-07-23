import React from 'react';
import "./smr_confirmation.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        bgcolor : "rgba(189, 195, 199,0.01)"
      }}  
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button className='smr_DialogBtn' onClick={onConfirm} autoFocus fullWidth style={{backgroundColor : "#c20000",padding : "10px "}} >
        <span style={{color:"white"}}>  Remove</span>
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button style={{padding : "10px "}} className='smr_DialogBtn' onClick={onClose} autoFocus fullWidth>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
