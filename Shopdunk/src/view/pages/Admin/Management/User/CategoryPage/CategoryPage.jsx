import { useParams } from "react-router-dom";
import "./CategoryPage.scss";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
const CategoryPage = () =>{
    const {name} = useParams();
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "instant" });
    },[name])
    return(
        <>
            <Helmet>
        <meta charSet="utf-8" />
        <title>{name}</title>
      </Helmet>
      <div className="category-page">
                <div className="div-img">
                    <img src=""></img>
                </div>
            </div>
        </>
            
    );
}
export default CategoryPage;