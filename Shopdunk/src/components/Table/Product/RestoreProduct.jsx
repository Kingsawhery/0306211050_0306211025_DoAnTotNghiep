import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function RestoreProduct(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const {item,handleRestore, setOpenRestore} = props;


  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        {item.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn khôi phục {item.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{
            setOpenRestore(false)
          }}>
            Hủy
          </Button>
          <Button  autoFocus onClick={()=>{
            handleRestore();
            setOpenRestore(false);
          }}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}