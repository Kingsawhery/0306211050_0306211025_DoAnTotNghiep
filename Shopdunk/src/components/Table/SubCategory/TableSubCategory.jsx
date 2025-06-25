import { useEffect, useState } from "react";
import { Button, Container,Form,Table } from "react-bootstrap";
import { getSubCategoryByCategory } from "../../../services/subCategory";
import {toast} from "react-toastify";
import { postSubCategory, editSubCategory } from "../../../services/subCategory";
import { Check, DeleteOutline, EditDocument } from "@mui/icons-material";
import ReactPaginate from "react-paginate";
const TableSubCategory = (props) => {
  const {data,tab,setTab,tabName,setTabName} = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategory,setSubCategory] = useState([])
  const [showModal, setShowModal ] = useState(false);
  const [page,setPage] = useState(1);
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
  const handlePageClick = (e)=>{
    console.log(e);
    
    setPage(e.selected + 1);
  }
  useEffect(()=>{
    getSubCategory();
  },[page])
  const getSubCategory = async()=>{
    try{
      const results = await getSubCategoryByCategory(page,data);
      if(results){
        console.log(results);
        
        setSubCategory(results);
      }
    }catch(e){
      toast.dismiss();
      toast.error("Đã có lỗi xảy ra");
    }
  }

  return(
    <>
  {/* Nút Create luôn hiển thị */}
  <div className="d-flex justify-content-end pb-4">
    <Button
      onClick={() => {
        if (!showModal) {
          setData2({ ...data2, name: "" });
          setShowEdit(false);
          setShowModal(true);
        } else {
          if (data2.name !== "") {
            handlePostCategory();
          }
        }
      }}
    >
      Create
    </Button>
  </div>

  {/* Form nhập danh mục khi showModal = true */}
  {showModal && (
    <div className="pb-4">
      <Form.Group style={{ position: "relative" }}>
        <Form.Label>Nhập tên danh mục:</Form.Label>
        <Form.Control
          type="text"
          value={data2.name}
          onChange={(e) => {
            setData2({
              ...data2,
              name: e.target.value,
            });
          }}
        />
        <DeleteOutline
          onClick={() => {
            setShowModal(false);
          }}
          style={{
            position: "absolute",
            right: "41%",
            top: "55%",
          }}
        />
      </Form.Group>
    </div>
  )}

  {/* Bảng dữ liệu nếu có dữ liệu */}
  {subCategory.data?.length > 0 ? (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategory.data.map((item, index) => (
            <tr key={index}>
              <td
                onClick={() => {
                  setTab({ id: item.id, tab: 2 });
                  setTabName({ ...tabName, subCategory: item.name });
                }}
              >
                {index + 1 + (subCategory.currentPage - 1) * 10}
              </td>
              {!showEdit ? (
                <td>{item.displayName}</td>
              ) : currentRow === item.id ? (
                <td style={{ position: "relative", display: "flex" }}>
                  <Form.Control
                    type="text"
                    value={data2.name}
                    onChange={(e) => {
                      setData2({
                        ...data2,
                        name: e.target.value,
                      });
                    }}
                  />
                  <Check
                    onClick={() => {
                      handleEditCategory();
                    }}
                    style={{
                      position: "absolute",
                      right: "41%",
                      top: "32%",
                    }}
                  />
                </td>
              ) : (
                <td>{item.displayName}</td>
              )}
              <td>
                <EditDocument
                  onClick={() => {
                    setCurrentRow(item.id);
                    setShowEdit(!showEdit);
                    if (!showEdit) {
                      setData2({
                        ...data2,
                        name: item.displayName,
                        id: item.id,
                      });
                      setShowModal(false);
                    } else {
                      setData2({ ...data2, name: "" });
                    }
                  }}
                />
                <DeleteOutline />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={subCategory.totalPages === 0 ? 1 : subCategory.totalPages}
        previousLabel="<"
        renderOnZeroPageCount={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  ) : (
    <div className="not-found-product d-flex justify-content-center">
      <img
        style={{ width: "50%" }}
        src={`${process.env.REACT_APP_LOCALHOST_SERVER}/no-product-found.png`}
        alt="Không tìm thấy sản phẩm"
      />
    </div>
  )}
</>

  )
};
export default TableSubCategory;
