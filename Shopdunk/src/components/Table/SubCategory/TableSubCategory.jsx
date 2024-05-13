import { useEffect, useState } from "react";
import { Container,Table } from "react-bootstrap";
import { getSubCategoryByCategory } from "../../../services/subCategory";
import {toast} from "react-toastify";
const TableSubCategory = (props) => {
  const {data,tab,setTab,tabName,setTabName} = props;
  const [subCategory,setSubCategory] = useState([])
  useEffect(()=>{
    getSubCategory();
  },[])
  const getSubCategory = async()=>{
    try{
      const results = await getSubCategoryByCategory(1,data);
      if(results){
        setSubCategory(results);
      }
    }catch(e){
      toast.error("Đã có lỗi xảy ra");
    }
  }
  //
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {subCategory.data && subCategory.data.map((item,index)=>{
            return(
              <tr key={index} onClick={()=>{
                setTab({id:item.id,tab:2})
                
                setTabName({ ...tabName, subCategory: item.name });
              }}>
              <td>{index + 1 + ((subCategory.currentPage-1) * 10)}</td>
                <td>{item.name}</td>

              </tr>
            )
          })}
          
        </tbody>
      </Table>
    </>
  );
};
export default TableSubCategory;
