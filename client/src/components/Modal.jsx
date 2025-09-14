import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import '../styles/modal.css';

const CustomModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: `var(--prim)`,
  color: `var(--tert)`,
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export const CustomModal = ({ isOpen, closeModal, title, description }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={CustomModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}

export const LoginModal = ({ isOpen, closeModal, title, description }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={CustomModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}

export const SignUpModal = ({ isOpen, closeModal, title, description }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={CustomModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}

export const PostModal = ({ isOpen, closeModal, title, description }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={CustomModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}

export const CommentModal = ({ isOpen, closeModal, title, description }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={CustomModalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}