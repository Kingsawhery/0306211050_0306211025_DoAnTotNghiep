import ReactPaginate from "react-paginate";
import Spinner from "../../../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { cancelInvoice, getInvoiceByStatusUser, getInvoiceStatus, getSubProd } from "../../../../services/invoiceService";
import { get } from "lodash";
import UploadIcon from '@mui/icons-material/Upload';
import ModalUpload from "../../Admin/Management/Invoices/ModalUpload";
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
// import "./Invoice.scss"
import { CancelOutlined, CancelPresentation, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Payment } from "@mui/icons-material";
import { Link } from "react-router-dom";
export function InvoiceUser() {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [currentTab, setCurrentTab] = useState(1)
    const [invoiceList, setInvoiceList] = useState([])
    const [invoiceStatus, setInvoiceStatus] = useState([])
    const [dataSub, setDataSub] = useState([]);

    const [showFileUpload, setShowFileUpload] = useState(false);
    const [showMore, setShowMore] = useState(0);
    const user = localStorage.getItem("user");
    const [dataUpload, setDataUpload] = useState({
        invoiceCode: "",
        username: ""
    })
    const handleCancelInvoice = async (id) => {
        let rs = await cancelInvoice(id);
        console.log(rs);

        if (rs.data.message == "Thành công!") {
            handleGetAllInvoiceByStatus(1);
        }
    }
    const [currentRow, setCurrentRow] = useState(0);
    useEffect(() => {
        handleGetAllInvoiceStatus();
        handleGetAllInvoiceByStatus(currentTab)
    }, [page])
    const handleGetAllInvoiceByStatus = async (id) => {

        try {
            let token = JSON.parse(user).token;
            let userId = JSON.parse(user).id;
            const dataInvoice = {
                token,
                userId,
                currentTab: id,
                page
            }
            const data = await getInvoiceByStatusUser(dataInvoice);
            if (data) {
                setInvoiceList(data.data.data);
            } else {
                return;
            }
        } catch (e) {
            alert("Đã hết phiên đăng nhập vui lòng đăng nhập lại");
            localStorage.clear();
            window.location.reload();
        }

    }
    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }
    const handleGetAllInvoiceStatus = async () => {
        const data = await getInvoiceStatus();
        if (data) {
            setInvoiceStatus(data.data.data);
        } else {
            return;
        }
    }
    const data = [
        {
            image: "avatar-default.jpg",
            name: "Iphone 16 Pro Max",
            price: "29000000",
            quantity: "12"
        },
        {
            image: "avatar-default.jpg",
            name: "Iphone 15 Pro",
            price: "29000000",
            quantity: "12"
        },
        {
            image: "avatar-default.jpg",
            name: "Ipad Air 10",
            price: "29000000",
            quantity: "12"
        },
    ]
    return (
        <>
            {isLoading ? (
                <div className="div-load">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="status-invoice d-flex justify-content-center">
                        {invoiceStatus && invoiceStatus.length > 0 ? (
                            invoiceStatus.map((item, index) => (
                                <div
                                    onClick={() => {
                                        setCurrentTab(item.id)
                                        setPage(1)
                                        handleGetAllInvoiceByStatus(item.id)
                                    }
                                    }
                                    style={
                                        {
                                            cursor: "pointer"
                                        }
                                    }
                                    className="p-4" key={item.id}>
                                    <p style={currentTab === item.id ? {
                                        color: "black",
                                        fontWeight: "bold"

                                    } : {}}

                                    >{item.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>No invoice statuses found.</p>
                        )}



                    </div>
                    <table class="table table-striped "
                        onMouseLeave={() => setShowMore(0)}
                    >
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Trạng thái thanh toán</th>
                                <th scope="col">Hành động</th>

                            </tr>
                        </thead>
                        <tbody>
                            {invoiceList.rows && invoiceList.rows.length > 0
                                ? invoiceList.rows.map((item, index) => {
                                    console.log(item);

                                    return (
                                        <>
                                            <tr
                                                style={{ height: "43.15px" }}
                                                onMouseEnter={() => setShowMore(item.id)}
                                                className="invoice-row"
                                                onClick={async () => {
                                                    const res = await getSubProd(item.id)
                                                    if (res) {
                                                        setDataSub(res.data.data)
                                                        console.log(res.data);

                                                    }
                                                    setCurrentRow(item.id)
                                                    setShowMore(0)
                                                    if (currentRow === item.id) {
                                                        setCurrentRow(0)
                                                    }
                                                }}
                                            >
                                                <th style={{ height: "43.15px" }}
                                                    onClick={() => {
                                                        setCurrentRow(currentRow === item.id ? 0 : item.id);
                                                    }}
                                                    scope="row">{currentRow === item.id ? <KeyboardArrowDownOutlined /> : showMore === item.id ? <KeyboardArrowUpOutlined /> : index + 1 + (page - 1) * 10}</th>
                                                <td style={{ height: "43.15px" }}>{item.invoiceCode}</td>
                                                <td style={{ height: "43.15px" }}>{item.email}</td>
                                                <td style={{ height: "43.15px" }}>{item.phone}</td>
                                                <td style={{ height: "43.15px" }}>{item.total.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                                                {/* <td style={{ height: "43.15px" }}>{item.totalNotIncludePro.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td> */}
                                                {/* <td style={{ height: "43.15px" }}>{item.paymentMethod.name}</td> */}
                                                <td>{item.paymentStatus}</td>
                                                <td style={{ height: "43.15px" }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >

                                                    {item.paymentStatus == "Chưa thanh toán" && item.statusInvoice?.id == 1 ?
                                                        <>
                                                            <Link to={item.urlPayment}><Payment /></Link>
                                                            <CancelPresentation onClick={() => {
                                                                handleCancelInvoice(item.id);
                                                            }} />
                                                        </>
                                                        : ""}

                                                </td>
                                            </tr>
                                            {currentRow === item.id &&
                                                <tr colSpan={8}>
                                                    <td colspan="8">
                                                        <table colSpan={8}
                                                            style={{
                                                                width: "100%",
                                                                paddingBottom: "0"
                                                            }}
                                                        >   
                                                            <thead>
                                                                <th>STT</th>
                                                                <th>Hình ảnh</th>
                                                                <th>Sản phẩm</th>
                                                                <th>Giá</th>
                                                                <th>Số lượng</th>

                                                            </thead>
                                                            <tbody>
                                                                {dataSub?.length > 0 ? dataSub?.map((item, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index + 1}</td>
                                                                            <td style={{
                                                                                padding: "12px"
                                                                            }} >
                                                                                <img
                                                                                    style={{
                                                                                        width: "60px"
                                                                                    }}
                                                                                    src={`${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${item.sub_product.product_detail.product.sub_category.name}/${item.sub_product.image}`}></img>
                                                                            </td>
                                                                            <td>{item.sub_product?.name}</td>
                                                                            <td>{item.sub_product?.price.toLocaleString("VN-vi").replace(/,/g, '.')}VNĐ</td>
                                                                            <td>{item.quantity}</td>

                                                                        </tr>

                                                                    )
                                                                }): <>Không tìm thấy kết quả</>}



                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>


                                            }
                                            {showFileUpload && <div className="fileUpload"
                                                onClick={() => {
                                                    setShowFileUpload(false)
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    height: "820px",
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backdropFilter: "blur(2px)"
                                                }}
                                            >
                                                <div onClick={(e) => e.stopPropagation()}>
                                                    <ModalUpload invoiceCode={dataUpload.invoiceCode} username={dataUpload.username} handleGetAllInvoiceByStatus={handleGetAllInvoiceByStatus} setShowFileUpload={setShowFileUpload} />
                                                </div>
                                            </div>
                                            }
                                        </>
                                    );
                                })
                                : "Không có kết quả!"}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-end m-4">
                    <ReactPaginate
                        style={{
                            position: "absolute",
                            zIndex: "-1",
                            
                        }}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={10}
                        pageCount={invoiceList.count > 0 ? Math.ceil(invoiceList.count / 10) : 1}
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
                    </div>
                    
                </>
            )}
        </>
    );
}
