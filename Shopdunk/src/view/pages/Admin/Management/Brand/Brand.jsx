import { useEffect, useState } from "react";
import "../Brand/Brand.css"
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import { editBrand, getAllBrands, postBrand, putDisplay } from "../../../../../services/brandService";
import { Button, Form } from "react-bootstrap";
import { EditDocument } from "@mui/icons-material";
export default function Brand() {
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState(1);
    const [currentRow, setCurrentRow] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataBrand, setDataBrand] = useState({
        name: ""
    })
    const [dataEditBrand, setDataEditBrand] = useState({
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
        getListBrands();
    }, [page]);
    const handleSelectItem = async (id) => {
        setSelectedItems([id]);
        const rs = await putDisplay({id});
        if(rs.errCode === 1){
            getListBrands();
        }
    };
    const getListBrands = async () => {
        try {
            const results = await getAllBrands(page);
            if (results) {
                setBrands(results.data);
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
        let rs = await postBrand(dataBrand);
        if (rs.status == 400) {
            toast(rs.message)
        } else {
            setShowCreate(false)
            setDataBrand({ name: "" })
            getListBrands();
            toast(rs.message)
        }
    };
    const handleEditData = async () => {
        let rs = await editBrand(dataEditBrand);
        if (rs.status == 400) {
            toast(rs.message)
        } else {
            setShowEdit(false)
            setDataEditBrand({ name: "", id: null })
            getListBrands();
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
                        Danh sách thương hiệu
                    </h1>
                    {showCreate &&
                        <div className="fields-name">
                            <label>Nhập tên thương hiệu:</label>
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
                                <th scope="col">Brand code</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: "200px" }}>
                            {brands && brands.length > 0
                                ? brands.map((brand, index) => {
                                    console.log(brand);

                                    return (
                                        <tr>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={brand.display}
                                                    onChange={() => handleSelectItem(brand.id)}
                                                />
                                            </td>
                                            <td scope="row">{index + 1 + ((page - 1) * 10)}</td>

                                            <td className="edit-name">
                                                {showEdit && brand.id === dataEditBrand.id ? <Form.Control
                                                    onChange={(e) => {
                                                        setDataEditBrand({
                                                            ...dataEditBrand,
                                                            name: e.target.value, // ✅ lấy giá trị người dùng gõ
                                                        });
                                                    }}
                                                    value={dataEditBrand.name}
                                                /> : brand.name}

                                                <EditDocument onClick={() => {
                                                    if (showEdit == false) {
                                                        setDataEditBrand({ ...dataEditBrand, id: brand.id })
                                                        setShowEdit(true)
                                                    } else {
                                                        if (dataEditBrand.name == "" || dataEditBrand.id == null) {
                                                            setShowEdit(false)
                                                        } else {
                                                            handleEditData();
                                                        }

                                                    }
                                                }} className="edit-icon" />
                                            </td>

                                            <td>{brand.brandCode}</td>

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
