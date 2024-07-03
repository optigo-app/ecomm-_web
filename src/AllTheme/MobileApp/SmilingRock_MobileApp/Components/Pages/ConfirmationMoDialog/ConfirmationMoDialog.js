import React from 'react';
import "./smrMo_confirmation.scss"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

const ConfirmationMoDialog = ({ open, onClose, onConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title-for-mobile"
      aria-describedby="alert-dialog-title-for-description"
      className='smrMo_dialogMainDiv'
    >
      <DialogTitle className='smrMo_dialogTitle'>{title}</DialogTitle>
      <DialogContent className='smrMo_dialogContent'>
        <DialogContentText className='smrMo_dialogContentText'>
          {content}
        </DialogContentText>
      </DialogContent>
      <Divider/>
      <DialogActions className='smrMo_dialogAction'>
      <Button className='smrMo_DialogBtn' onClick={onConfirm} autoFocus fullWidth>
          Remove
        </Button>
        <Divider  orientation="vertical" flexItem/>
        <Button  className='smrMo_DialogBtn' onClick={onClose}  fullWidth>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationMoDialog;
