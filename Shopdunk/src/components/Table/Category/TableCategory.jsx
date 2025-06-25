import { Check, DeleteOutline, EditAttributes, EditDocument, PinDrop, ReplayOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import {postCategory,editCategory, putDisplay, changeStatus} from "../../../services/categoryService"
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
const TableCategory = (props) => {
  const { data, setTab, tabName, setTabName, page,setPage,showCategories } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal ] = useState(false);
  const [showEdit, setShowEdit ] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [data2, setData2] = useState({
    name:""
  })
  const handlePageClick = (e) => {
    setPage(e.selected + 1)
}
  const handleSelectItem = async (id) => {
      setSelectedItems([id]);
      const rs = await putDisplay({id});
      if(rs.errCode === 1){
        showCategories("")
      }
  };
  const handlePostCategory = async () =>{
    const rs = await postCategory(data2);
    if(rs){
      setShowModal(false);
      showCategories("")
    }
  }
  const handleEditCategory = async () =>{
    const rs = await editCategory(data2);
    if(rs){
      setShowModal(false);
    }
    window.location.reload();

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
    <div className="search-box d-flex justify-content-end align-items-center" style={{ position: "relative" }}>
  <span style={{
    position: "absolute",
    right: "10px",
    top: "40%",
    transform: "translateY(-50%)",
    color: "#aaa",
    fontSize: "16px"
  }}>
    🔍
  </span>

  <Form.Control
    type="text"
    placeholder="Tìm danh mục..."
    value={keyword}
    onChange={(e) => {
      setKeyword(e.target.value);
      showCategories(e.target.value);
    }}
    style={{
      paddingLeft: "32px",
      width:"300px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      height: "38px",
      marginBottom:"16px"
    }}
  />
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
          {data.data?.length > 0 ?
          <>
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
                  {item.status ? 
                  
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
                  <DeleteOutline onClick={async()=>{
                          const rs = await changeStatus({id:item.id});
                          toast(rs.message)
                          showCategories("");
                  }}/>
                  
                </td>: <td>
                      
                        <ReplayOutlined onClick={async()=>{
                          const rs = await changeStatus({id:item.id});
                          toast(rs.message);
                          showCategories("");
                        }}/>
                        
                      </td>}
                     
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ReactPaginate
                              style={{
                                  position: "absolute",
                                  zIndex: "-1"
                              }}
                              breakLabel="..."
                              nextLabel=">"
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={10}
                              pageCount={data.totalPages === 0 ? 1 : data.totalPages}
                              previousLabel="<"
                              renderOnZeroPageCount={2}
                              pageClassName="page-item"
                              pageLinkClassName="page-link"
                              previousClassName="page-item"
                              previousLinkClassName="page-link"
                              nextClassName="page-item"
                              nextLinkClassName="page-link "
                              breakClassName="page-item"
                              breakLinkClassName="page-link"
                              containerClassName="pagination"
                              activeClassName="active"
                          />
                          </>
          :
          <div className="not-found-product d-flex justify-content-center">
          <img
            style={{ width: "50%" }}
            src={`${process.env.REACT_APP_LOCALHOST_SERVER}/no-product-found.png`}
            alt="Không tìm thấy sản phẩm"
          />
        </div>
          }

    
    
    </>
  );
};
export default TableCategory;
