import { useEffect, useState } from "react";
import { Button, Container,Form,Table } from "react-bootstrap";
import { getSubCategoryByCategory } from "../../../services/subCategory";
import {toast} from "react-toastify";
import { postSubCategory, editSubCategory } from "../../../services/subCategory";
import { Check, DeleteOutline, EditDocument } from "@mui/icons-material";
const TableSubCategory = (props) => {
  const {data,tab,setTab,tabName,setTabName} = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategory,setSubCategory] = useState([])
  const [showModal, setShowModal ] = useState(false);
  const [showEdit, setShowEdit ] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [data2, setData2] = useState({
    name:"",
    categoryId:data
  })
  const handleSelectItem = (id) => {
      setSelectedItems([id]);
  };
  const handlePostCategory = async () =>{
    const rs = await postSubCategory(data2);
    if(rs){
      setShowModal(false);
      window.location.reload();
    }
  }
  const handleEditCategory = async () =>{
    const rs = await editSubCategory(data2);
    if(rs){
      setShowModal(false);
      window.location.reload();
    }
  }
  useEffect(()=>{
    
    getSubCategory();
  },[])
  const getSubCategory = async()=>{
    try{
      const results = await getSubCategoryByCategory(1,data);
      if(results){
        setSubCategory(results);
      }
    }catch(e){
      toast.dismiss();
      toast.error("Đã có lỗi xảy ra");
    }
  }
  return (
    <>
      <div className="d-flex justify-content-end pb-4">
    <Button onClick={()=>{
      if(showModal === false){
        setData2({...data2, name:""})
        setShowEdit(false);
        setShowModal(true);
      }else{
        if(data2.name !== ""){
            handlePostCategory();
        }
      }
    }}>Create</Button>
   
    </div>
    {
        showModal && <div

          className="pb-4">
          <Form.Group style={{
            position: "relative"
          }}>

            <Form.Label>Nhập tên danh mục:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e)=>{
                setData2({
                  ...data2, 
                  name: e.target.value
                });
              }}
            />
            <DeleteOutline
              onClick={() => {
                setShowModal(false)
              }}
              style={{
                position: "absolute",
                right: "41%",
                top: "55%"
              }} />

          </Form.Group>
        </div>
    }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {subCategory.data && subCategory.data.map((item,index)=>{
            return(
              <tr key={index}>
              <td
               onClick={()=>{
                setTab({id:item.id,tab:2})
                
                setTabName({ ...tabName, subCategory: item.name });
              }}
              >{index + 1 + ((subCategory.currentPage-1) * 10)}</td>
                {!showEdit ? <td>{item.displayName}</td>: currentRow == item.id ? <td style={{position:"relative",display:"flex"}}><Form.Control
              type="text"
              value={data2.name}
              onChange={(e)=>{
                setData2({
                  ...data2, 
                  name: e.target.value
                });
              }}
            />
            <Check
            onClick={()=>{
              handleEditCategory();
            }}
            style={{position:"absolute", right:"41%", top:"32%"}}/>
            </td> : <td>{item.displayName}</td>}
                <td>
                  <EditDocument onClick={()=>{
                  setCurrentRow(item.id)
                    setShowEdit(!showEdit)
                    if(showEdit === false){
                      setData2({...data2,name:item.displayName,id:item.id})
                      setShowModal(false);
                    }else{
                    setData2({...data2,name:""})
                    }
                  }}/>
                  <DeleteOutline/>
                  
                </td>
              </tr>
            
            )
          })}
          
        </tbody>
      </Table>
    </>
  );
};
export default TableSubCategory;
