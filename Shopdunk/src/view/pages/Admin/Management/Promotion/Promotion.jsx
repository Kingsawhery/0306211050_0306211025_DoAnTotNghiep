import { useEffect, useState } from "react";
import "../Brand/Brand.css"
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import { editBrand, getAllBrands, postBrand, putDisplay } from "../../../../../services/brandService";
import { Button, Form } from "react-bootstrap";
import { EditDocument } from "@mui/icons-material";
import { getPromotions } from "../../../../../services/promotionService";
import FormAddNewPromotion from "./FormAddNewPromotions";
export default function Promotion() {
    const [promotions, setPromotions] = useState([]);
    const [page, setPage] = useState(1);
    const [currentRow, setCurrentRow] = useState(0);
    const [pageSize, setPageSize] = useState(1);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
   
    // const handleSelectItem = (id) => {
    //     setSelectedItems((prevSelected) =>
    //         prevSelected.includes(id)
    //             ? prevSelected.filter((itemId) => itemId !== id)
    //             : [...prevSelected, id]
    //     );
    // };

    useEffect(() => {
        getListPromotions();
    }, [page]);
    const handleSelectItem = async (id) => {
        setSelectedItems([id]);
        const rs = await putDisplay({id});
        if(rs.errCode === 1){
            getListPromotions();
        }
    };
    const getListPromotions = async (keyword) => {
        try {
            const results = await getPromotions(page, keyword);
            if (results) {
                setPromotions(results.data);
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
    // const handleCreateData = async () => {
    //     let rs = await postBrand(dataPromotions);
    //     if (rs.status == 400) {
    //         toast(rs.message)
    //     } else {
    //         setShowCreate(false)
    //         setdataPromotions({ name: "" })
    //         getListBrands();
    //         toast(rs.message)
    //     }
    // };
    // const handleEditData = async () => {
    //     let rs = await editBrand(dataEditBrand);
    //     if (rs.status == 400) {
    //         toast(rs.message)
    //     } else {
    //         setShowEdit(false)
    //         setDataEditBrand({ name: "", id: null })
    //         getListBrands();
    //         toast(rs.message)
    //     }
    // };
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

                    <div className="div-button d-flex justify-content-end">
                        <Button onClick={()=>{
                            setShowCreate(true);
                        }}>Tạo mới</Button>
                    </div>
                    <div className="div-button d-flex justify-content-end align-items-center">
                        <Form.Label>Tìm kiếm: </Form.Label>
                        <Form.Control 
                        placeholder="Nhập mã giảm giá"
                        value={keyword} onChange={(e)=>{
                            setKeyword(e.target.value);
                            getListPromotions(e.target.value)
                        }}/>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Code</th>
                                <th scope="col">Discription</th>
                                <th scope="col">Percent</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ height: "200px" }}>
                            {promotions && promotions.length > 0
                                ? promotions.map((promotion, index) => {

                                    return (
                                        <tr>
                                           <td>{index + 1  + (page - 1) * 10}</td>
                                           <td>{promotion.code}</td>
                                           <td>{promotion.description}</td>
                                           <td>{promotion.percent}%</td>
                                            <td><EditDocument/></td>
                                        </tr>
                                    );
                                })
                                : "Không có kết quả!"}
                        </tbody>
                    </table>
                    {showCreate && <FormAddNewPromotion setOpen={setShowCreate} handleGetList={getListPromotions} setKeyword={setKeyword}/>}
                    
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={10}
                        pageCount={pageSize > 0 ? pageSize : 1}
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
