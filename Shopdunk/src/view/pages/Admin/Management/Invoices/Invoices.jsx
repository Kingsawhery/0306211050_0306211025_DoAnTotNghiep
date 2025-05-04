import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import { useEffect, useState } from "react";
import { getInvoiceByStatus, getInvoiceStatus } from "../../../../../services/invoiceService";
import { get } from "lodash";
import UploadIcon from '@mui/icons-material/Upload';
import ModalUpload from "./ModalUpload";
export function Invoices() {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [currentTab, setCurrentTab] = useState(1)
    const [invoiceList, setInvoiceList] = useState([])
    const [invoiceStatus, setInvoiceStatus] = useState([])
    const [showFileUpload, setShowFileUpload] = useState(false);

    useEffect(() => {
        handleGetAllInvoiceStatus();
        handleGetAllInvoiceByStatus(1)
    }, [page])
    const handleGetAllInvoiceByStatus = async (id)=>{
        const data = await getInvoiceByStatus(id,page);
        if (data) {
            setInvoiceList(data.data.data);
        } else {
            return;
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
    return (
        <>
            {isLoading ? (
                <div className="div-load">
                    <Spinner />
                </div>
            ) : (
                <>
                    <h1 className="d-flex justify-content-start my-4" onClick={() => {
                        console.log(invoiceList)
                    }}>
                        Danh sách hóa đơn
                    </h1>
                    <div className="status-invoice d-flex justify-content-center">
                        {invoiceStatus && invoiceStatus.length > 0 ? (
                            invoiceStatus.map((item, index) => (
                                <div
                                    onClick={() => {
                                        setCurrentTab(item.id)
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
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã đơn hàng</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Tổng tiền cần thanh toán</th>
                                <th scope="col">Tổng tiền khuyến mãi</th>
                                <th scope="col">Phương thức thanh toán</th>
                                <th scope="col">Trạng thái</th>

                            </tr>
                        </thead>
                        <tbody style={{ height: "432px" }}>
                            {invoiceList.rows && invoiceList.rows.length > 0
                    ? invoiceList.rows.map((item, index) => {
                      console.log(item);
                      
                        return (
                            <>
                          <tr style={{ maxHeight: "34px" }}>
                            <th scope="row">{index + 1 + (page - 1) * 10}</th>
                            <td>{item.invoiceCode}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.total.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                            <td>{item.totalNotIncludePro.toLocaleString("VN-vi").replace(/,/g, '.')} VNĐ</td>
                            <td>{item.paymentMethod.name}</td>
                            <td>{currentTab === 1 ? <UploadIcon onClick={()=>{
                                setShowFileUpload(true);
                            }}/> : "Chuyển trạng thái"}</td>
                            



                          </tr>
                          {showFileUpload && <div className="fileUpload"
                          onClick={()=>{
                            setShowFileUpload(false)
                          }}
                          style={{
                            position:"absolute",
                            height:"820px",
                            top:0,
                            right:0,
                            bottom:0,
                            left:0,
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            backdropFilter:"blur(2px)"
                          }}
                          >
                            <div onClick={(e) => e.stopPropagation()}>
                            <ModalUpload  />

                            </div>
                          </div>
                          }
                          </>
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
                </>
            )}
        </>
    );
}
