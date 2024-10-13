import { useEffect, useState } from "react";
import { Container,Table } from "react-bootstrap";
import { getProductBySubCategory,getProductDetailById, getProduct } from "../../../services/product";
import ProductDetail from "../ProductDetail/ProductDetai";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const TableProduct = (props) => {
  const {data, tabName, setTabName, setTab, tab} = props;
  //
  const navigate = useNavigate();
    const [id,setId] = useState(+localStorage.getItem("detailId"));
    const [dataProduct, setDataProduct] = useState(JSON.parse(localStorage.getItem("detail")) ? JSON.parse(localStorage.getItem("detail")) : [])
  const [products, setProducts] = useState([])
    useEffect(()=>{
        getProducts();
    },[])
    


    const getProducts = async() =>{
        const results = await getProductBySubCategory(1,data);
        if(results){
            setProducts(results);
        }
    }
  return (
    <>
    <div className="button-create-new-product d-flex justify-content-end">
      <Button variant="success" className="m-4" onClick={()=>{
          navigate("/admin/create-product")
      }}>+ Create</Button>
    </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th> 
            <th>Price</th>
            <th>Tồn kho</th>
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
                <td>{item.product_detail.stock}</td>
                
          </tr>
            )
                })}
        </tbody>
      </Table>
      {tabName.product !== "" && localStorage.getItem("detail") &&  (<ProductDetail id = {+localStorage.getItem("detailId")} data={dataProduct}/>)}
    </>
  );
};
export default TableProduct;
