import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Form } from 'react-bootstrap';
import { Label } from '@mui/icons-material';
import { handleCreateNewProdPro } from '../../../services/promotionService';
import { toast } from 'react-toastify';

export default function ModalAddProductPromotion(props) {
  const theme = useTheme();
  const [promotionCode, setPromotionCode] = React.useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
const {setOpenPromotion, listProd, setDataChange} = props;
    const handleSubmit = async() =>{
        if(promotionCode !== ""){
            const rs = await handleCreateNewProdPro({
                code:promotionCode,
                list:listProd
            })
            console.log(rs);

            if(rs.promotion.err == 0){
                
                setDataChange({
                    listProd:[],
                    code:"",
                    type:""
                  });
                toast(rs.promotion.message)
                  setOpenPromotion(false);
            }else{
                toast(rs.promotion.message)
            }
        }else{
            toast("Vui lòng nhập mã khuyến mãi!")
        }
        
    }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        </DialogTitle>
        <DialogContent>
          <Form>
            <Form.Label>Nhập mã khuyến mãi</Form.Label>
            <Form.Control style={{
                width:"300px"
            }} value={promotionCode} onChange={(e)=>{
            setPromotionCode(e.target.value)
            }}/>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{
            setOpenPromotion(false)
          }}>
            Hủy
          </Button>
          <Button  autoFocus onClick={()=>{
            // handleDelete();
            // setOpen(false);
            handleSubmit()
          }}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}