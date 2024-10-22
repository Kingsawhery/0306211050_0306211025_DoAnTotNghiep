import { useEffect, useState } from "react";
import { Container,Table } from "react-bootstrap";
import { getProductBySubCategory,getProductDetailById, getProduct,deleteProductById } from "../../../services/product";
import ProductDetail from "../ProductDetail/ProductDetai";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirmDeleteProduct from "./ModalConfirmDeleteProduct";
import _ from "lodash";
const TableProduct = (props) => {
  const user = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const {data, tabName, setTabName, setTab, tab} = props;
  //
  const navigate = useNavigate();
    const [id,setId] = useState(+localStorage.getItem("detailId"));
    const [dataProduct, setDataProduct] = useState(JSON.parse(localStorage.getItem("detail")) ? JSON.parse(localStorage.getItem("detail")) : [])
    const [page, setPage] = useState(1);
    const [deleteProduct, setDeleteProduct] = useState({});
    const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([])
    useEffect(()=>{
        getProducts(page);
    },[])
    const getProducts = async(numberPage) =>{
      const results = await getProductBySubCategory(numberPage,data);
      if(results){
          setProducts(results);
      }
  }
  const handleChange = (event, value) => {
    setPage(value);
    getProducts(value)
    
  };
  const handleDelete = _.debounce(async()=>{
      const product = await deleteProductById(deleteProduct.id,user,userId)
  },500)

 
  return (
    <>
    <div className="button-create-new-product d-flex justify-content-end">
      <Button variant="success" className="m-4" onClick={()=>{
          navigate("/admin/create-product")
      }}>+ Create</Button>
    </div>
    {products && products.length > 0 ?
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th> 
            <th>Price</th>
            <th>Tồn kho</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
        {products.data && products.data.map((item,index)=>{
            //setTabName({ ...tabName, category: item.name });
            return(
                <tr key={index}
                onClick={()=>{
                    setTabName({ ...tabName, product: item.name });
                    // setTab({...tab, id:item.id})
                    setId(item.id)
                    setDataProduct(item)
                    localStorage.setItem("detail",JSON.stringify(item))
                    localStorage.setItem("tabName",JSON.stringify({ ...tabName, product: item.name }))
                }}>
                <td>{index + 1 + (products.currentPage - 1) * 10}</td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                <td>{item.product_detail.stock ? item.product_detail.stock : ""}</td>
                <td>
                  <span onClick={()=>{
                    setDeleteProduct(item)
                    setOpen(true);
                  }}><DeleteIcon style={{cursor:"pointer"}}/></span>
                  {/* <span><DeleteIcon/></span> */}

                </td>

    
          </tr>
            )
                })}
        </tbody>
      </Table>
    
      <Stack spacing={2}>
      <Pagination onChange={handleChange} count={products.totalPages} color="primary" />

    </Stack>
      {tabName.product !== "" && localStorage.getItem("detail") &&  (<ProductDetail id = {+localStorage.getItem("detailId")} data={dataProduct}/>)}
                {open && <ModalConfirmDeleteProduct item={deleteProduct} handleDelete = {handleDelete} setOpen={setOpen}/>}
    </> : ""}
    </>
  );
};
export default TableProduct;
