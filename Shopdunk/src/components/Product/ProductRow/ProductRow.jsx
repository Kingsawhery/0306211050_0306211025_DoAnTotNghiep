import "./ProductRow.scss";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "react-slick";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from "react";
import { getProductByCategory } from "../../../services/product";

const ProductRow = (props) => {
  
  const { category } = props;
  // const [dataChange, setDataChange] = useState({
  //   id: 1,
  //   page: 1,
  // });
  // useEffect(() => {
  // //   getProducts();
  // // }, [dataChange.page]);

  // const [data, setData] = useState([]);
  // const [previousPage, setPrevious] = useState(0);
  // const getProducts = async () => {
  //   const result = await getProductByCategory(dataChange.page, dataChange.id);
  //   if (result) {
  //     setData(result);
  //   }
  // };
  if (category.products.length > 0) {
    return (
      <div className="sub-category-row">
        <h1 className="sub-category-row-name">{category.name}</h1>
          <div className="product-row container">
            <div
              className="product-row-list"
              // onMouseEnter={() => {
              //   setDataChange({ ...dataChange, id: category.id });
              // }}
            >
              {category.products.length > 0 &&
                category.products.map((product, index) => {
                  return (
                    <ProductCard
                      key={index}
                      product={product}
                      category={category.name}
                    />
                  );
                })}
            </div>
          </div>
        
      </div>
    );
  }
};
export default ProductRow;
