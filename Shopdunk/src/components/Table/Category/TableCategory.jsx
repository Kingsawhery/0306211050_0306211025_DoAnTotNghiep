import { Check, DeleteOutline, EditAttributes, EditDocument, PinDrop } from "@mui/icons-material";
import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import {postCategory,editCategory, putDisplay} from "../../../services/categoryService"
const TableCategory = (props) => {
  const { data, setTab, tabName, setTabName } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal ] = useState(false);
  const [showEdit, setShowEdit ] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [data2, setData2] = useState({
    name:""
  })
  const handleSelectItem = async (id) => {
      setSelectedItems([id]);
      const rs = await putDisplay({id});
      if(rs.errCode === 1){
        window.location.reload();
      }
  };
  const handlePostCategory = async () =>{
    const rs = await postCategory(data2);
    if(rs){
      setShowModal(false);
      window.location.reload();
    }
  }
  const handleEditCategory = async () =>{
    const rs = await editCategory(data2);
    if(rs){
      setShowModal(false);
      window.location.reload();
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
            <th></th>
            <th>STT</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => {
            return (
              <tr
                key={index}   
                style={{ background: !item.status ? "#858282" : "" }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={item.display}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                <td
                  onClick={() => {
                    setTab({ tab: 1, id: item.id });
                    setTabName({ ...tabName, category: item.name });
                  }}
                >{index + 1 + (data.currentPage - 1) * 10}</td>
                
                {!showEdit ? <td>{item.name}</td>: currentRow == item.id ? <td style={{position:"relative",display:"flex"}}><Form.Control
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
            </td> : <td>{item.name}</td>}
                <td>
                  <EditDocument onClick={()=>{
                  setCurrentRow(item.id)
                    setShowEdit(!showEdit)
                    if(showEdit === false){
                      setData2({...data2,name:item.name,id:item.id})
                      setShowModal(false);
                    }else{
                    setData2({...data2,name:""})
                    }
                  }}/>
                  <DeleteOutline/>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default TableCategory;
