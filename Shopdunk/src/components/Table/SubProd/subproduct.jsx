import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { createSubProd, getSubProdById, putPrice } from "../../../services/product";
import ProductDetail from "../ProductDetail/ProductDetai";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pagination, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalConfirmDeleteProduct from "../Product/ModalConfirmDeleteProduct";
import _ from "lodash";
import { ArrowBack } from "@mui/icons-material";
import ModalChangePrice from "./ModalChangePrice";
import { toast } from "react-toastify";
import ModalCreateSubProd from "./ModalCreateSubProd";
const TableSubProduct = (props) => {
    const user = JSON.parse(localStorage.getItem("user")).token;
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const [openChangePrice, setOpenChangePrice] = useState(false);
    const [openCreateSubProd, setOpenCreateSubProd] = useState(false);
    const [id, setId] = useState(+localStorage.getItem("detailId"));
    const { idSub } = useParams();

    const [dataSubProd,setDataSubProd] = useState({
        name:"",
    typeClassifyDetails:[],
    productId: idSub
    })
    const [newPrice, setNewPrice] = useState('');
    const { data, tabName, setTabName, setTab, tab } = props;
    //
    const [selectedItems, setSelectedItems] = useState([]);



    const navigate = useNavigate();
    const [dataProduct, setDataProduct] = useState(JSON.parse(localStorage.getItem("detail")) ? JSON.parse(localStorage.getItem("detail")) : [])
    const [page, setPage] = useState(1);
    const [deleteProduct, setDeleteProduct] = useState({});
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([])
    useEffect(() => {
        getSubProducts(page);
    }, [])
    const getSubProducts = async (numberPage) => {
        const results = await getSubProdById(numberPage, idSub);
        if (results) {
            setProducts(results);

        }
    }
    const handleSelectItem = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
    };
    const handleCreateSubProd = async () => {
        try {
            const results = await createSubProd(dataSubProd);
            if (results.err == "success") {
                getSubProducts(page);
                setOpenCreateSubProd(false)
            }else{
                toast(results.message)
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Đã có lỗi xảy ra");
        }
    }
    const handleChange = (event, value) => {
        setPage(value);
        getSubProducts(value)

    };

    
    const handleChangePrice = async () => {
        try {
            const results = await putPrice({
                list: selectedItems,
                number: newPrice,
                type: "price"
            });
            if (results) {
                getSubProducts(page);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Đã có lỗi xảy ra");
        }
    }
  
    const handleChangeStock = async () => {
        try {
            const results = await putPrice({
                list: selectedItems,
                number: newPrice,
                type: "stock"
            });
            if (results) {
                getSubProducts(page);
            }
        } catch (e) {
            toast.dismiss();
            toast.error("Đã có lỗi xảy ra");
        }
    }


    return (
        <>
            <Link to={`${process.env.REACT_APP_API_CLIENT}/admin/danh-muc`}><ArrowBack /></Link>
            <h3 className="title">
                Quản lý sản phẩm theo phân loại
            </h3>
            <h5 className="list">Danh sách</h5>
            {/* <div className="button-create-new-product d-flex justify-content-end">
      <Button variant="success" className="m-4" onClick={()=>{
          navigate("/admin/create-product")
      }}>+ Create</Button>
    </div> */}
            <div className="d-flex justify-content-end my-3">
                <Button
                    variant="warning"
                    onClick={() => {
                        if (selectedItems.length === 0) alert("Chọn sản phẩm trước đã bro 😎");

                        else setOpenChangePrice(true);
                        console.log(openChangePrice);

                    }}
                >
                    Đổi giá hàng loạt
                </Button>
                <Button
                style={{marginLeft:"12px"}}
                variant="success"
                    onClick={() => {
                        setOpenCreateSubProd(true);
                    }}
                >
                    Tạo mới
                </Button>
            </div>
            {products && products.data && products.data.length > 0 ?
                <>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                    <th></th>
                                <th>STT</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Tồn kho</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data && products.data.map((item, index) => {
                                const stt = index + 1 + (products.currentPage - 1) * 10;
                                return (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleSelectItem(item.id)}
                                            />
                                        </td>
                                        <td>{stt}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            {/* <span onClick={()=>{ setDeleteProduct(item); setOpen(true); }}><DeleteIcon style={{cursor:"pointer"}}/></span>
            <span><DeleteIcon/></span> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {openChangePrice && <ModalChangePrice setNewPrice={setNewPrice} onSubmit={handleChangePrice} onChangeStock={handleChangeStock} setOpenChangePrice={setOpenChangePrice} />
                    }
                    {openCreateSubProd && <ModalCreateSubProd onHide={setOpenCreateSubProd} show={openCreateSubProd} data={idSub} handleCreateSubProd={handleCreateSubProd} dataSubProd={dataSubProd} setData = {setDataSubProd}  />
                    }
                    <Stack spacing={2}>
                        <Pagination onChange={handleChange} count={products.totalPages} color="primary" />

                    </Stack>
                    {open && <ModalConfirmDeleteProduct item={deleteProduct} setOpen={setOpen} />}
                </> : (<div className="not-found">
                    <img src={`${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/no_result.gif`}></img>
                </div>)}
        </>
    );
};
export default TableSubProduct;
