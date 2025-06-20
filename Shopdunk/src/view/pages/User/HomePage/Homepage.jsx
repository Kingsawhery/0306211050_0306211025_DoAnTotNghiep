import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getAllBanners } from "../../../../services/bannerService";
import { getAllCategoriesHomepage } from "../../../../services/categoryService";
import { getAllBrandsDisplay, getAllProductByBrand } from "../../../../services/brandService";

import ProductRow from "../../../../components/Product/ProductRow/ProductRow";
import HomePageCarousel from "../../../../components/HomePageCarousel/HomePageCarousel";
import ProductCard from "../../../../components/Product/ProductCard/ProductCard";
import PostRow from "../../../../components/Post/PostRow";

import "./Homepage.scss";
import { Form } from "react-bootstrap";
import _ from "lodash";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [switchList, setSwitchList] = useState(false);
  const [listBrands, setListBrands] = useState([]);
  const [currentTab,setCurrentTab] = useState({
    name:"",
    id:0,

  });
  const [listProd, setListProd] = useState({
    name: "",
    products: [],
  });

  useEffect(() => {
    getCategories();
    getListBrands();
  }, []);

  const getCategories = async () => {
    try {
      const categories = await getAllCategoriesHomepage();
      if (categories) {
        setCategories(categories);
      }
    } catch (e) {
      console.log("Error fetching categories", e);
    }
  };

  const getListBrands = async () => {
    try {
      const brands = await getAllBrandsDisplay();
      if (brands) {
        setListBrands(brands);
      }
    } catch (e) {
      console.log("Error fetching brands", e);
    }
  };

  const getProductList = async (name, id) => {
    try {
      const products = await getAllProductByBrand(1, id);
      if (products) {
        setListProd({ name: name, products: products.data });
      }
    } catch (e) {
      console.log("Error fetching products", e);
    }
  };
  const getProductSearchList = async (name, id,keyword) => {
    try {
      const products = await getAllProductByBrand(1, id, null,keyword);
      if (products) {
        setListProd({ name: name, products: products.data });
      }
    } catch (e) {
      console.log("Error fetching products", e);
    }
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang chủ</title>
      </Helmet>

      <HomePageCarousel />

      {/* Brand filter section */}
      <div className="brands">
        <div className="search">
          <Form.Control onChange={_.debounce((e)=>{
            getProductSearchList(currentTab.name, currentTab.id, e.target.value)
          },1000)}/>
        </div>
        <span
          className="div-brand"
          style={currentTab.id === 0 ? {backgroundColor:"#c1c1c1"} : {}}
          key="0"
          onClick={() => {
            setCurrentTab(0);
            setCurrentTab({...currentTab,name:"",id:0})
            setSwitchList(false);
          }}
         
        >
          All
        </span>
        {listBrands.map((item, index) => (
          <span
            className="div-brand"
          style={currentTab.id === index + 1 ? {backgroundColor:"#c1c1c1"} : {}}
            key={index + 1}
            onClick={() => {
              setSwitchList(true);
              setCurrentTab({...currentTab,name:item.name,id:item.id})
              getProductList(item.name, item.id);
            }}
          >
            {item.name}
          </span>
        ))}
      </div>

      {/* Product list display */}
      {!switchList ? (
        categories.map((item, index) => (
          <ProductRow key={index} category={item} />
        ))
      ) : listProd.products.length > 0 ? (
        <div className="sub-category-row">
          <h1 className="sub-category-row-name">{listProd.name}</h1>
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
            width:"50%"
          }}
            src={`${process.env.REACT_APP_LOCALHOST_SERVER}/no-product-found.png`}
            alt="Không tìm thấy sản phẩm"
          />
        </div>
      )}

      {/* Posts below */}
      <PostRow />
    </>
  );
};

export default HomePage;
