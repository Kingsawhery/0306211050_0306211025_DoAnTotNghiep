import { useParams } from "react-router-dom";
import "./CategoryPage.scss";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getDataCategory } from "../../../../services/categoryService"
import ProductRow from "../../../../components/Product/ProductRow/ProductRow";
import { da } from "date-fns/locale";
import HomePageCarousel from "../../../../components/HomePageCarousel/HomePageCarousel";
import _ from "lodash";
import { Form } from "react-bootstrap";
import { getAllProductByBrand } from "../../../../services/brandService";
import ProductCard from "../../../../components/Product/ProductCard/ProductCard";
const CategoryPage = () => {
    const { name } = useParams();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [dataCate, setDataCate] = useState([]);
    const [showListProd,setShowListProd] = useState(false);
    const [listProd, setListProd] = useState({});
    const [data, setData] = useState({});
    const getProductSearchList =async (cateId, keyword) =>{
        try {
              const products = await getAllProductByBrand(null, null, cateId, keyword);
              if (products) {
                setListProd({products: products.data });
                console.log(products.data);
                
              }
            } catch (e) {
              console.log("Error fetching products", e);
            }
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        hanldeGetDataCategories();
        setShowListProd(false);
        setSearchKeyword("");
    }, [name])
    const hanldeGetDataCategories = async () => {
        try {
            const data = await getDataCategory(name);
            if (data) {
                setData(data);
                setDataCate(data.sub_categories);
            }
        } catch (e) {
            console.log(e);

        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{name}</title>
            </Helmet>
      <HomePageCarousel />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginRight: "12px" }}>
                <Form.Label style={{ margin: 0 }}>
                    Tìm kiếm:
                </Form.Label>
                <Form.Control
                value={searchKeyword}
                style={{
                width: "20%",
                marginRight: "20px"
            }} onChange={(e) => {
                const value = e.target.value;
                setSearchKeyword(value);
                if (value !== "") {
                  setShowListProd(true);
                  getProductSearchList(data.id, value);
                } else {
                  setShowListProd(false);
                }
              }} />
            </div>
            
             {!showListProd ? (
                    <div className="category-page">
                    {dataCate?.length > 0 ?
                        dataCate.map((item, index) => {
                            return <ProductRow category={item} />;
                        }) : <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "20px",
                            boxSizing: "border-box",
                            background:"#f1f1f1"
                        }}>
                            <img
                                style={{
                                    maxWidth: "100%",
                                    width: "50%",
                                    // maxHeight: "80vh",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                                src={`${process.env.REACT_APP_LOCALHOST_SERVER}/original-93c7c3593e7d733ddd8ca2fd83ac0ed4.webp`}
                                alt="Image"
                            />
                        </div>}
                </div>
                  ) : listProd.products?.length > 0 ? (
                    <div className="sub-category-row">
                      <h1 className="sub-category-row-name">{data.name}</h1>
                      <div className="product-row container">
                        <div className="product-row-list">
                          {listProd.products.map((product, index) => (
                            <ProductCard
                              key={index}
                              product={product}
                              category={listProd.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="not-found-product d-flex justify-content-center" style={{
                    }}>
                      <img
                        style={{
                          width: "50%"
                        }}
                        src={`${process.env.REACT_APP_LOCALHOST_SERVER}/no-product-found.png`}
                        alt="Không tìm thấy sản phẩm"
                      />
                    </div>
                  )}
            
        </>

    );
}
export default CategoryPage;