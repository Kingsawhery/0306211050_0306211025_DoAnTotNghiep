import { useParams } from "react-router-dom";
import "./CategoryPage.scss";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getDataCategory } from "../../../../services/categoryService"
import ProductRow from "../../../../components/Product/ProductRow/ProductRow";
import { da } from "date-fns/locale";
const CategoryPage = () => {
    const { name } = useParams();
    const [dataCate, setDataCate] = useState([]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        hanldeGetDataCategories();
    }, [name])
    const hanldeGetDataCategories = async () => {
        try {
            const data = await getDataCategory(name);
            if (data) {
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
            <div className="category-page">
                {dataCate.length > 0 ?
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
        </>

    );
}
export default CategoryPage;