import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ModalConfirm(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const {data ,handleAddCart, setOpen} = props;


  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {data.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn thêm {data.name} vào giỏ hàng
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="error" onClick={()=>{
            setOpen(false)
          }}>
            Cancel
          </Button>
          <Button  autoFocus onClick={()=>{
            handleAddCart();
            setOpen(false);
          }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}