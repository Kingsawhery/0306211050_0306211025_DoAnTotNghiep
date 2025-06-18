import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { formatNumber } from "../../../function/generalFunction";
import { editProduct } from "../../../services/product";

function ProductEdit({showEdit, setShowEdit, setData2, data2}) {

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // chỉ giữ số
        setData2({ ...data2, price: rawValue });
      };
      const handleConfirm = async () => {
        const rs = await editProduct(data2);
        if(rs){
            setShowEdit(false);
            setData2({name:"",price:"",id:""})
            window.location.reload();
        }
      }

  return (
    
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:0,
        bottom:0,
        right:0,
        left:0
    }}>
      <div>

      <Modal show={showEdit} onHide={setShowEdit} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        <label>Product Name</label>
        <input
          className="form-control mb-3 w-100"
          placeholder="Product Name"
          value={data2.name}
          onChange={(e) => setData2({ ...data2, name: e.target.value })}
        />

        <label>Price (VNĐ)</label>
        <input
          className="form-control w-100"
          placeholder="Price"
          value={formatNumber(data2.price)}
          onChange={handlePriceChange}
          inputMode="numeric"
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShowEdit(false)}}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default ProductEdit;