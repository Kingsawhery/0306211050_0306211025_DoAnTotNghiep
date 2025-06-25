import { useEffect, useState } from "react";
import {
  getUsers,
  lockUser,
  postUser,
  userServices,
} from "../../../../../services/userServices";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import { Form } from "react-bootstrap";
import { Label, LockClockOutlined, LockOpen, LockOpenOutlined, LockOutline, LockPersonOutlined, OpenInFull, OpenWithOutlined } from "@mui/icons-material";
export default function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [pageSize, setPageSize] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState({
    email:"",
    phone:"",
    password:"",

  })
  useEffect(() => {
    getListUsers();
  }, [page]);
  const getListUsers = async (keyword) => {
    try {
      const results = await getUsers(page,keyword);
      if (results) {
        console.log(results.data);
        
        setUsers(results.data);
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
    
    if (e !== undefined) {
      setPage(e.selected + 1);
    }
  };
  
  const handleLockUser = async (id) => {
    const rs  = await lockUser(id);
    if(rs.errCode == 0){
      toast("Thay đổi trạng thái thành công!")
      getListUsers(keyword);
    }else{
      toast("Thay đổi trạng thái thất bại!")
      getListUsers(keyword);
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
            Danh sách tài khoản
          </h1>
          <div className="d-flex justify-content-end align-items-center">
            <Form.Label className="m-2">Tìm kiếm: </Form.Label>
            <Form.Control
            style={{
              width:"30%"
            }}
            value={keyword}
            onChange={(e)=>{    
              try{
                setKeyword(e.target.value)
                getListUsers(e.target.value)
              } catch(e){
                getListUsers();
                setKeyword("")
              }         
            }}/>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{height:"200px"}}>
              {users && users.length > 0
                ? users.map((user, index) => {
                  console.log(user);
                  
                    return (
                      <tr>
                        <th scope="row">{index+1 + (page-1) *10}</th>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.username}</td>
                        {user.status != 1 ? <td><LockPersonOutlined onClick={()=>{
                          handleLockUser(user.id)
                        }}/></td> : <td><LockOpenOutlined onClick={()=>{
                          handleLockUser(user.id)
                        }}/></td>}
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
            pageCount={pageSize > 1 ? page : 1}
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
