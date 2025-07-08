import { useEffect, useState } from "react";
import "../Brand/Brand.css"
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import {postProperty, putProperty } from "../../../../../services/propertyService";

import { Button, Form } from "react-bootstrap";
import { ArrowBack, EditDocument } from "@mui/icons-material";
import { getAllProperties } from "../../../../../services/propertyService";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
export default function Property() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [currentRow, setCurrentRow] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [dataBrand, setDataBrand] = useState({
        name: ""
    })
    const [dataEditProperty, setDataEditProperty] = useState({
        id: null,
        name: ""
    })
    // const handleSelectItem = (id) => {
    //     setSelectedItems((prevSelected) =>
    //         prevSelected.includes(id)
    //             ? prevSelected.filter((itemId) => itemId !== id)
    //             : [...prevSelected, id]
    //     );
    // };

    useEffect(() => {
        getListProperty();
    }, [page]);
    const handleSelectItem = async (id) => {
        setSelectedItems([id]);
        
        // const rs = await putDisplay({id});
        const rs = {errCode: 1}; // Viết chống cháy
        if(rs.errCode === 1){
            getListProperty();
        }
    };
    const getListProperty = async () => {
        try {
            const results = await getAllProperties(page);
            if (results) {
                setProperties(results.data);
                setPageSize(results.totalPages);
                setIsLoading(false);
            }
        } catch (e) {
            toast.dismiss();
            toast.warning("Đã có lỗi xảy ra!");
        }
    };
    const handlePageClick = (e) => {
        console.log(e);
        if (page !== 0) {
            setPage(e.selected + 1);
        }
    };
    const handleCreateData = async () => {
        let rs = await postProperty(dataBrand);
        if (rs.status == 400) {
            toast(rs.message)
        } else {
            setShowCreate(false)
            setDataBrand({ name: "" })
            getListProperty();
            toast(rs.message)
        }
    };
    const handleEditData = async () => {
        let rs = await putProperty(dataEditProperty);
        if (rs.status == 400) {
            toast(rs.message)
        } else {
            setShowEdit(false)
            setDataEditProperty({ name: "", id: null })
            getListProperty();
            toast(rs.message)
        }
    };
    return (
        <>
            {isLoading ? (
                <div className="div-load">
                    <Spinner />
                </div>
            ) : (
                <>
                    <h1 className="d-flex justify-content-start my-4">
                        Danh sách phân loại
                    </h1>
                    {showCreate &&
                        <div className="fields-name">
                            <label>Nhập tên phân loại:</label>
                            <Form.Control name="name" value={dataBrand.name}
                                onChange={(e) => {
                                    setDataBrand({ name: e.target.value })
                                }}></Form.Control>
                        </div>
                    }

                    <div className="div-button d-flex justify-content-end">
                        <Button className="button" onClick={() => {
                            if (showCreate == false) {
                                setShowCreate(true)
                            } else {
                                if (dataBrand.name == "") {
                                    setShowCreate(false)

                                } else {
                                    handleCreateData();
                                }
                            }
                        }}>Tạo mới</Button>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th></th>
                                <th scope="col">STT</th>
                                <th scope="col">Name</th>
                                <th scope="col">Danh sách chi tiết</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: "200px" }}>
                            {properties && properties.length > 0
                                ? properties.map((property, index) => {
                                    console.log(property);

                                    return (
                                        <tr>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={property.display}
                                                    onChange={() => handleSelectItem(property.id)}
                                                />
                                            </td>
                                            <td scope="row">{index + 1 + ((page - 1) * 10)}</td>

                                            <td className="edit-name d-flex">
                                                {showEdit && property.id === dataEditProperty.id ? <Form.Control
                                                    onChange={(e) => {
                                                        setDataEditProperty({
                                                            ...dataEditProperty,
                                                            name: e.target.value, // ✅ lấy giá trị người dùng gõ
                                                        });
                                                    }}
                                                    value={dataEditProperty.name}
                                                /> : property.name}

                                                <EditDocument 
                                                style={{
                                                    marginTop:"12px"
                                                }}
                                                onClick={() => {
                                                    if (showEdit == false) {
                                                        setDataEditProperty({ ...dataEditProperty, id: property.id, name:property.name })
                                                        setShowEdit(true)
                                                    } else {
                                                        if (dataEditProperty.name == "" || dataEditProperty.id == null) {
                                                            setShowEdit(false)
                                                        } else {
                                                            handleEditData();
                                                        }

                                                    }
                                                }} className="edit-icon" />
                                            </td>

                                            <td>
                                                <ArrowRightIcon onClick={()=>{
                                                    navigate(`${property.id}`)
                                                }}/>
                                            </td>

                                        </tr>
                                    );
                                })
                                : "Không có kết quả!"}
                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={10}
                        pageCount={pageSize}
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
            )}
        </>
    );
}
