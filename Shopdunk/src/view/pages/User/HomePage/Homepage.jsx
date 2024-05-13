import { getAllBanners } from "../../../../services/bannerService";
import { getAllCategoriesHomepage } from "../../../../services/categoryService";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Homepage.scss";
import ProductRow from "../../../../components/Product/ProductRow/ProductRow";
import HomePageCarousel from "../../../../components/HomePageCarousel/HomePageCarousel";
import PostRow from "../../../../components/Post/PostRow";
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const categories = await getAllCategoriesHomepage();
      if (categories) {
        await setCategories(categories);
        console.log(categories);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang chủ</title>
      </Helmet>
      <HomePageCarousel />
      {categories.length > 0 &&
        categories.map((item, index) => {
          return <ProductRow category={item} />;
        })}
        <PostRow/>
    </>
  );
};
export default HomePage;
