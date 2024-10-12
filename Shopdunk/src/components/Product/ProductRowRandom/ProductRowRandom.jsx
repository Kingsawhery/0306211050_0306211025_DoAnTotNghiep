import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProductsRandom } from "../../../services/product";
// import "./ProductRowRandom.scss";
const ProductRowRandom = (props) => {
  
  const {id} = props;
  console.log(id);
  
  const [listProductSuggestion, setListProductSuggestion] = useState([]);
  useEffect(() => {
    showListProductSuggestion(id);
  }, []);
  const showListProductSuggestion = async (idCategory) => {
    const listProducts = await getProductsRandom(idCategory);
    if (listProducts) {
      console.log(listProducts);
      setListProductSuggestion(listProducts);
    }
  };
  return (
    listProductSuggestion &&
    listProductSuggestion.length > 0 && (
      <>
        <h1
          style={{
            fontFamily: "'Roboto', sans-serif",
          }}
          className="suggestion-products-title"
        >
          Sản phẩm đề xuất
        </h1>
        <div className="products-row">
          {listProductSuggestion.map((product, index) => {
            return <ProductCard product={product} />;
          })}
        </div>
      </>
    )
  );
};
export default ProductRowRandom;
