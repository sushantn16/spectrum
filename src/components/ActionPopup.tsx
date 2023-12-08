import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ActionPopupProps {
  isOpen: boolean;
  onClose: (event:React.SyntheticEvent, reason:string) => void;
  status: string; // Include the status prop here
  actionButtonClick: ()=>void;
}

const ActionPopup: React.FC<ActionPopupProps> = ({ isOpen, onClose, status, actionButtonClick }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} disableEscapeKeyDown>
      <DialogTitle>Action Required</DialogTitle>
      <DialogContent>
        <p>Status: {status}</p>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='error' onClick={actionButtonClick}>Take Action</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionPopup;
