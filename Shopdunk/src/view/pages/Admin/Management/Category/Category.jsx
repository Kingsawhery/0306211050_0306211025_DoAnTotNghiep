import { Button, Container, Table } from "react-bootstrap";
import "./Category.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategories } from "../../../../../services/categoryService";
import TableCategory from "../../../../../components/Table/Category/TableCategory";
import TableProduct from "../../../../../components/Table/Product/TableProduct";
import TableSubCategory from "../../../../../components/Table/SubCategory/TableSubCategory";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const tabNameLocal = JSON.parse(localStorage.getItem("tabName"));
  const [tabName, setTabName] = useState({
    category: tabNameLocal ? tabNameLocal.category : "",
    subCategory: tabNameLocal ? tabNameLocal.subCategory : "",
    product: tabNameLocal ? tabNameLocal.product : "",
  });
  const [display, setDisplay] = useState(true);
  const [page,setPage] = useState(1);
  const [previous, setPrevious] = useState(+localStorage.getItem("previousId"));
  const [tab, setTab] = useState({
    tab: +localStorage.getItem("tab"),
    id: +localStorage.getItem("id"),
  });

  useEffect(() => {
    showCategories();
    console.log(!localStorage.getItem("tabName"));
    if(!localStorage.getItem("tabName") || !localStorage.getItem("previousId") || !localStorage.getItem("tab") || !localStorage.getItem("id") ){
        setTabName({
            category:"",
            subCategory:"",
            product:""
        })
        setTab({
            tab:0,
            id:0
        })
        setPrevious(0);
    }
  }, [page]);
  useEffect(() => {
    localStorage.setItem("tab", +tab.tab);
    localStorage.setItem("id", +tab.id);
    setPrevious(+tab.id);
    localStorage.setItem("tabName", JSON.stringify(tabName));
    localStorage.setItem("previousId", +previous);
  }, [tab]);
  const showCategories = async (keyword) => {
    try {
      const results = await getCategories(page,keyword, display);
      if (results) {
        setCategories(results);
      }
    } catch (e) {
      toast.dismiss();
      toast("Đã có lỗi xảy ra!");
    }
  };
  return (
    <>
<h3 className="title">
<span
        className={tab.tab === 0 ? "d-none" : "previous p-2"}
        onClick={() => {
          switch (tab.tab) {
            case 0:
              {
                setTabName({
                  ...tabName,
                  category: "",
                });
              }
              break;
            case 1:
              {
                setTabName({
                  ...tabName,
                  subCategory: "",
                });
              }
              break;
            case 2:
              {
                setTabName({
                  ...tabName,
                  product: "",
                });
              }
              break;
            default:
          }
          if (tab.tab === 1 || tab.tab === 2) {
            setTab({
              id: localStorage.getItem("previousId"),
              tab: tab.tab - 1,
            });
          }

          console.log(tab.tab);
        }}
      >
        <ArrowBack/>
      </span>
        {tab.tab === 0
          ? "Quản lý danh mục"
          : tab.tab === 1
          ? "Quản lý danh mục con"
          : "Quản lý sản phẩm"}
      </h3>
      <h5 className="list">Danh sách</h5>
      {tab.tab === 0 && (
  <Button
    onClick={() => {
      setDisplay(!display);
      showCategories("");
    }}
  >
    {display ? "Ẩn" : "Xem tất cả"}
  </Button>
)}

      {tab.tab === 0 ? (
        ""
      ) : (
        <>
          <div className="d-flex">
            {tabName.category !== "" && <span className="tab-name"> {tabName.category} |</span>}
            {tabName.subCategory !== "" && (
              <span  className="tab-name"> {tabName.subCategory} |</span>
            )}
            {tabName.product !== "" && <span className="tab-name"> {tabName.product}</span>}
          </div>
        </>
      )}
  
  {(() => {
  switch (tab.tab) {
    case 0:
      return (
        <TableCategory
          tabName={tabName}
          setTabName={setTabName}
          setTab={setTab}
          tab={tab}
          data={categories}
          page={page}
          setPage={setPage}
          showCategories={showCategories}
        />
      );
    case 1:
      return (
        <TableSubCategory
          tabName={tabName}
          setTabName={setTabName}
          setTab={setTab}
          tab={tab}
          data={tab.id}
        />
      );
    default:
      return (
        <TableProduct
          tabName={tabName}
          setTabName={setTabName}
          setTab={setTab}
          tab={tab}
          data={tab.id}
        />
      );
  }
})()}

    </>
  );
};
export default Category;
