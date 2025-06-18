import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import DivClassify from "../../../view/pages/Admin/Management/Product/DivClassify";
// import dataTest from "./dataTest";
import DivClassifyAdmin from "./DivClassifyAdmin";
import { toast } from "react-toastify";
import { handleGetClassify } from "../../../services/product";
const ModalCreateSubProd = ({ show, handleCreateSubProd, onHide, onSubmit, data, setData,dataSubProd}) => {
const handleData = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...dataSubProd,[name]:value})
}
const [dataTest,setDataTest] = useState([]);
const getTypeClassifyDetail = async () =>{
    try{
        const dataClassify = await handleGetClassify(data);
        if(dataClassify){
            setDataTest(dataClassify);
        }else{
            return;
        }
    }catch(e){
        console.log(e);
        toast("Đã có lỗi xảy ra")
 
   }
}
useEffect(()=>{
    getTypeClassifyDetail();
},[])
const [disable, setDisable] = useState({});
const [state, setState] = useState(0);
const [typeClassifyDetail, setTypeClassifyDetail]= useState(dataTest)
const [dataSelect,setDataSelect] = useState([])
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thay đổi giá sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridProductName">
              <Form.Label onClick={()=>{
                console.log(data.fileImage)
              }}>Tên sản phẩm</Form.Label>
              <Form.Control
                onChange={handleData}
                name="name"
                style={{ width: "100%" }}
                type="ProductName"
                placeholder="Enter Product Name"
              />
            </Form.Group>
          </Row>
          <div className="classify" style={{ display: "flex" }}>
               
                {dataTest &&
                  dataTest.length > 0 &&
                  dataTest.map((item, index) => {
                    return (
                      <DivClassifyAdmin
                        data={item}
                        dataSelect={dataSelect}
                        setDataSelect={setDataSelect}
                        dataSubProd={dataSubProd}
                        setData={setData}

                      />
                    );
                  })}
              </div>
         
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>onHide(false)}>
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        // onSubmit()
                        console.log(dataSubProd);
                        handleCreateSubProd()
                    }}
                    // disabled={newPrice}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateSubProd;
