import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import Spinner from "../../../../../components/Spinner/Spinner";
import { getListPost } from "../../../../../services/postService";
import { ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function ListPost() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getListPostPage();
  }, [page]);
  const getListPostPage = async () => {
    try {
      const results = await getListPost(page);
      if (results) {
        setPost(results.data);
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
              <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Summary</th>
                <th scope="col">Post code</th>
              </tr>
            </thead>
            <tbody style={{height:"200px"}}>
              {post && post.length > 0
                ? post.map((item, index) => {
                  
                    return (
                        
                      <tr>
                        <th scope="row">{index + 1 + (page - 1) * 10}</th>
                        <td>{item.title}</td>
                        <td>{item.summary}</td>
                        <td>{item.id}</td>
                        <td><Link to={`${item.id}`}><ArrowRight/></Link></td>
          
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
