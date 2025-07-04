import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button
} from "@mui/material";
import { createPromotion, putPromotion } from "../../../../../services/promotionService";
import { toast } from "react-toastify";

export default function FormEditPromotion({ open, setOpen, handleGetList, setKeyword, promotion }) {
  const [form, setForm] = useState({
    id: promotion.id,
    code: promotion.code,
    description: promotion.description,
    number: promotion.percent
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate từng field
    if (name === "code") {
      // Chỉ cho nhập chữ, số, không có khoảng trắng
      if (/^[a-zA-Z0-9]*$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === "number") {
      // Chỉ cho nhập số từ 1 đến 100
      if (/^\d*$/.test(value)) {
        const num = parseInt(value, 10);
        if (num >= 1 && num <= 100) {
          setForm({ ...form, [name]: value });
        } else if (value === "") {
          setForm({ ...form, [name]: "" });
        }
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async() => {
    if(form.code !== "" && form.number !== ""){
        const rs = await putPromotion(form);
        if(rs?.promotion?.err == 1){
            toast(rs?.promotion?.message)
        }else{
            toast(rs?.promotion?.message)
            setOpen(false);
            setKeyword("")
            handleGetList();
        }
    }
    else{
        toast("Nhập đầy đủ thông tin!");
    }
    // setOpen(false); // hoặc gọi API rồi close
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={true}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Nhập thông tin</DialogTitle>
      <DialogContent>
        <DialogContentText>Điền đầy đủ 3 trường bên dưới:</DialogContentText>
        <TextField
          margin="dense"
          label="Code (không dấu cách)"
          name="code"
          fullWidth
          value={form.code}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          fullWidth
          value={form.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Number (1-100)"
          name="number"
          fullWidth
          value={form.number}
          onChange={handleChange}
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
}
