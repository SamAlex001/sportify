import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../styles/dialogBox.css';

export const DialogBox = ({ isOpen, closeDialog, handleDeleteConfirm, title, description }) => {

   const handleClose = () => {
      closeDialog();
   };

   return (
      <Dialog
         open={isOpen}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
         <DialogContent >
            <DialogContentText id="alert-dialog-description">
               {description}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose} className='dialog-button-text'>
               Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} className='dialog-button-text'>
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
}