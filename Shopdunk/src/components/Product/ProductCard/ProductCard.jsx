import "./ProductCard.scss";
import { Link, useHistory, useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const { product } = props;
  const randomNumber = Math.floor(Math.random() * 7);
  const objectFade = [
    "fade-up",
    "fade-down",
    "fade-up-right",
    "fade-up-left",
    "flip-left",
    "flip-up",
    "zoom-in",
  ];
  const navigate = useNavigate();
  return (
    //data-aos={objectFade[randomNumber]}
    // onClick={() => push(`/product/${product.id}`)}
    // onClick={() => push(`/product/${product.id}`)}
    <Link
      className="product-link"
      to={`/product/${product.id}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-card">
        <div className="div-img">
          <img
            src={
              product.image
                ? `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/${product.name}/${product.image}`
                : `${process.env.REACT_APP_LOCALHOST_SERVER}/productImage/default.webp`
            }
          />
        </div>
        <h3 className="product-name">{product.name}</h3>
        <h5 className="product-price">
          {product.price.toLocaleString("VN-vi")}VNĐ
        </h5>
      </div>
    </Link>
  );
};
export default ProductCard;
