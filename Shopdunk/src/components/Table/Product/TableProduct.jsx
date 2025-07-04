import { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { getProductBySubCategory, getProductDetailById, getProduct, deleteProductById, editProduct ,handleRestoreProduct,putPostOrBrand} from "../../../services/product";
import ProductDetail from "../ProductDetail/ProductDetai";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirmDeleteProduct from "./ModalConfirmDeleteProduct";
import _ from "lodash";
import { ArrowRight, Check, DeleteOutline, EditDocument, ReplayOutlined } from "@mui/icons-material";
import ProductEdit from "./ProductEdit";
import RestoreProduct from "./RestoreProduct";
import ModalAddProductPromotion from "./ModalAddProductPromotion";
import { toast } from "react-toastify";
const TableProduct = (props) => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const { data, tabName, setTabName, setTab, tab } = props;
  //
  const navigate = useNavigate();
  const [id, setId] = useState(+localStorage.getItem("detailId"));
  const [dataProduct, setDataProduct] = useState(JSON.parse(localStorage.getItem("detail")) ? JSON.parse(localStorage.getItem("detail")) : [])
  const [page, setPage] = useState(1);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [brand, setBrand] = useState(false);
  const [post, setPost] = useState(false);

  const [open, setOpen] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [restoreProduct, setRestoreProduct] = useState({});
  const [openRestore, setOpenRestore] = useState(false);
  const [openSubProdTab, setOpenSubProdTab] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [data2, setData2] = useState({
    name: "",
    price: ""
  })
  const [dataChange, setDataChange] = useState({
    listProd:[],
    code:"",
    type:""
  })
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts(page);
  }, [])
  const getProducts = async (numberPage) => {
    const results = await getProductBySubCategory(numberPage, data, 1);
    if (results) {
      setProducts(results);
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
    getProducts(value)

  };
  const handleEditProd = async () => {
    const rs = await editProduct(data2);
    if (rs) {
      window.location.reload();
    }
  }
  const handleDelete = _.debounce(async () => {
    const product = await deleteProductById(deleteProduct.id, user, userId)
    if (product.EC === 0) {
      getProducts(page);
    }

  }, 500)
  const handleRestore = _.debounce(async () => {
    const product = await handleRestoreProduct(restoreProduct.id, user, userId)
    if (product.EC === 0) {
      getProducts(page);
    }

  }, 500)


  return (
    <>
      <div className="button-create-new-product d-flex justify-content-end gap-3 p-4">
        <Button variant="success" className=""
        onClick={()=>{
          if(dataChange.listProd.length > 0){
            setOpenPromotion(true);
          }else{
            toast("Vui lòng chọn sản phẩm bằng cách tick vào ô!")
          }
        }}
        >+ Thêm khuyến mãi</Button>
      <Button
    variant={post ? "outline-success" : "success"}
    onClick={() => {
      setBrand(false);
      setPost(!post);
    if(post == false){
      setDataChange({...dataChange,code:"", type:"post"});
    }else{
      setDataChange({...dataChange,code:"", type:""});
    }
    }}
    
  >
    {post ? "← Quay lại" : "+ Thêm bài báo"}
  </Button>
  <Button
    variant={brand ? "outline-success" : "success"}
    onClick={() => {
      setPost(false);
      setBrand(!brand);
    if(brand == false){
      setDataChange({...dataChange,code:"", type:"brand"});
    }else{
      setDataChange({...dataChange,code:"", type:""});
    }
    }}
    
  >
    {brand ? "← Quay lại" : "+ Thêm brand"}
  </Button>

  <Button
    variant="primary"
    onClick={() => navigate("/admin/create-product")}
  >
    + Tạo sản phẩm
  </Button>
</div>

      {products && products.data && products.data.length > 0 ?
        <>
              {post && (
  <Form.Group className="mb-3" controlId="formBrandName"
   style={{
    position:"relative",
  }}>
    <Form.Label>Thêm thông tin:</Form.Label>
    <Form.Control
      type="text"
      placeholder="Nhập mã bài báo ở trang danh sách bài báo: "
      value={dataChange.value}
      onChange={(e) => setDataChange({ ...dataChange, code: e.target.value })}
    />    
    <p style={{
      position:"absolute",
      right:"41%",
      top:"50%"
    }}><Check style={{color:"green", cursor:"pointer"}}
    onClick={async()=>{
      if(dataChange.code !== "" || dataChange.listProd.length > 0){
        const rs = await putPostOrBrand(dataChange)
        if(rs){
          getProducts(page);
          setBrand(false);
          setPost(false);
          setDataChange({
            listProd:[],
            code:"",
            type:""
          });
        }
      }
    }}
    /></p>
  </Form.Group>
)}
       {brand && (
  <Form.Group className="mb-3" controlId="formBrandName"
   style={{
    position:"relative",
  }}>
    <Form.Label>Thêm thông tin:</Form.Label>
    <Form.Control
      type="text"
      placeholder="Nhập thông tin cần thêm mới: "
      value={dataChange.value}
      onChange={(e) => setDataChange({ ...dataChange, code: e.target.value })}
    />    
    <p style={{
      position:"absolute",
      right:"41%",
      top:"50%"
    }}><Check style={{color:"green", cursor:"pointer"}}
    onClick={async()=>{
      if(dataChange.code !== "" || dataChange.listProd.length > 0){
        const rs = await putPostOrBrand(dataChange)
        if(rs){
          getProducts(page);
          setBrand(false);
          setPost(false);
          setDataChange({
            listProd:[],
            code:"",
            type:""
          });
        }
      }
    }}
    /></p>
  </Form.Group>
)}

          <Table bordered hover>
            <thead style={{ background: "gray" }}>
              <tr>
                <th style={{ color: "#ffffff" }}></th>
                <th style={{ color: "#ffffff" }}>STT</th>
                <th style={{ color: "#ffffff" }}>Name</th>
                <th style={{ color: "#ffffff" }}>Price</th>
                <th style={{ color: "#ffffff" }}>Brand</th>
                <th style={{ color: "#ffffff" }}>Post code</th>

                <th style={{ color: "#ffffff" }}>Action</th>

              </tr>
            </thead>
            <tbody>
              {products.data && products.data.map((item, index) => {
                //setTabName({ ...tabName, category: item.name });
                return (
                  <tr key={index}>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      <Form.Check
                        checked={dataChange.listProd.includes(item.id)}
                        onChange={() => {
                          const alreadyExists = dataChange.listProd.includes(item.id);
                          const newList = alreadyExists
                            ? dataChange.listProd.filter(id => id !== item.id)
                            : [...dataChange.listProd, item.id];

                          setDataChange({
                            ...dataChange,
                            listProd: newList,
                          });
                        }}
                      />

                    </td>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      {index + 1 + (products.currentPage - 1) * 10}
                    </td>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      {item.name}
                    </td>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      {item.price.toLocaleString("VN-vi").replace(/,/g, ".")} VNĐ
                    </td>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      {item.brand?.name}
                    </td>
                    <td style={!item.status ? { color: "gray" } : {}}>
                      {item.postId}
                    </td>
                    <td>
                      {item.status ? (
                        <>
                          <EditDocument
                            onClick={() => {
                              setCurrentRow(item.id);
                              setShowEdit(true);
                              setData2({
                                name: item.name,
                                price: item.price,
                                id: item.id,
                              });
                            }}
                          />
                          <span
                            onClick={() => {
                              setDeleteProduct(item);
                              setOpen(true);
                            }}
                          >
                            <DeleteIcon style={{ cursor: "pointer" }} />
                          </span>
                          <span>
                            <Link to={`${process.env.REACT_APP_API_CLIENT}/admin/sub-prod/${item.id}`}>
                              <ArrowRight />
                            </Link>
                          </span>
                        </>
                      ) : (
                        <ReplayOutlined style={{ color: "black" }} 
                        onClick={() => {
                          setRestoreProduct(item);
                          setOpenRestore(true);
                        }}
                        />
                      )}
                    </td>
                  </tr>

                )
              })}
            </tbody>
          </Table>

          <Stack spacing={2}>
            <Pagination onChange={handleChange} count={products.totalPages} color="primary" />

          </Stack>

          {open && <ModalConfirmDeleteProduct item={deleteProduct} handleDelete={handleDelete} setOpen={setOpen} />}
          {openRestore && <RestoreProduct item={restoreProduct} handleRestore={handleRestore} setOpenRestore={setOpenRestore} />}
              {openPromotion && <ModalAddProductPromotion setOpenPromotion={setOpenPromotion} listProd={dataChange.listProd} setDataChange={setDataChange}/>}
        </> : (<div className="not-found">
          <img src={`${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/no_result.gif`}></img>
        </div>)}
      {showEdit && <ProductEdit showEdit={showEdit} setShowEdit={setShowEdit} data2={data2} setData2={setData2} />}
    </>
  );
};
export default TableProduct;
