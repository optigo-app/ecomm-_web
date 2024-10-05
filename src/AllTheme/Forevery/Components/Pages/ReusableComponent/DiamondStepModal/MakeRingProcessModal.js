import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton, Grid, Button, Checkbox, FormControlLabel, Box, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './MakeRingProcessModal.scss';
import { for_MakeMyRingProcessDrawer } from '../../../Recoil/atom';
import { useRecoilState } from 'recoil';

const MakeRingProcessModal = () => {
  const [open, setOpen] = useRecoilState(for_MakeMyRingProcessDrawer);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const isMobile = useMediaQuery('(max-width:800px)');

  // JSON data for the modal content
  const ringProcessData = [
    {
      count: 1,
      image: "https://forevery.one/images_new/complete-ring-popup/lg-ring-mount.webp",
      title: "Select Ring Setting",
      description: "Explore our Ring settings and choose the style that vibes with your taste."
    },
    {
      count: 2,
      image: "https://forevery.one/images_new/complete-ring-popup/lg-ring-diamond.webp",
      title: "Choose a Diamond",
      description: "Choose the diamond shape that perfectly fits your ring setting."
    },
    {
      count: 3,
      image: "https://forevery.one/images_new/complete-ring-popup/lg-complete-ring.webp",
      title: "Here's Your Wish",
      description: "Congratulations! Add the ring to your cart and shop it now."
    }
  ];

  useEffect(() => {
    const showModal = localStorage?.getItem('dontShowModal');
    if (showModal === 'true') {
      setDontShowAgain(showModal);
    }
  }, []);

  const handleDontShowAgain = () => {
    setDontShowAgain(!dontShowAgain);
  };

  const handleContinue = () => {
    localStorage.setItem('dontShowModal', dontShowAgain ? 'true' : 'false');
    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown className='mr_MRMainDrawer'>
        <DialogContent className="mr_modal-content">
          <div className="mr_modal-header">
            <IconButton aria-label="close" onClick={handleClose} className="mr_close-button">
              <CloseIcon className='closeIconBtn' />
            </IconButton>
          </div>
          <div className="mr_modal-Title">
            <p><span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Create</span> Your Own</p>
            <p>Engagement Rings in 3 easy steps</p>
          </div>
          <Grid container spacing={isMobile ? 2 : 11} className="mr_modal-steps">
            {ringProcessData.map((step) => (
              <Grid item xs={4} sm={4} md={4} key={step.count}>
                <div className="mr_step">
                  <p className='mr_count'>{step.count}</p>
                  <img src={step.image} alt={step.title} />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Grid>
            ))}
          </Grid>
          <Box className="mr_ModalBtnGpDiv">
            <FormControlLabel
              control={<Checkbox checked={dontShowAgain} onChange={handleDontShowAgain} className='mr_checkedIcon' />}
              label="Don't show it again"
              className='mr_dtCheckbox'
            />
            <Button variant="contained" color="primary" onClick={handleContinue} className="mr_continue-button">
              Continue
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakeRingProcessModal;
