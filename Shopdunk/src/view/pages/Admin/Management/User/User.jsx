import { useEffect, useState } from "react";
import {
  getUsers,
  postUser,
  userServices,
} from "../../../../../services/userServices";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
export default function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState({
    email:"",
    phone:"",
    password:"",

  })
  useEffect(() => {
    getListUsers();
  }, [page]);
  const getListUsers = async () => {
    try {
      const results = await getUsers(page);
      if (results) {
        setUsers(results.data);
        setIsLoading(false);
      }
    } catch (e) {
      toast.warning("Đã có lỗi xảy ra!");
    }
  };
  const handlePageClick = (e) => {
    console.log(e);
    if (page !== 0) {
      setPage(e.selected + 1);
    }
  };
  const handleAdd = async () => {
    await postUser();
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
            <tbody>
              {users && users.length > 0
                ? users.map((user, index) => {
                    return (
                      <tr>
                        <th scope="row">{user.id + (1 - 1) * 10}</th>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
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
            pageCount={5}
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
