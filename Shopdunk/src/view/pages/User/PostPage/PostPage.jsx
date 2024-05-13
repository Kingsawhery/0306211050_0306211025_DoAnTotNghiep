import { useEffect, useState} from "react";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostPage } from "../../../../services/postService";
import "./PostPage.scss"
import { getProductsRandom } from "../../../../services/product";
import ProductCard from "../../../../components/Product/ProductCard/ProductCard";
import ProductRowRandom from "../../../../components/Product/ProductRowRandom/ProductRowRandom";
const PostPage = () => {
  const { id, slug } = useParams();
  const [postPage, setPostPage] = useState([]);
  const postPageRef = useRef();
  useEffect(() => {
    showPostPage(id);
    window.scrollTo({top:0,behavior:"smooth"})
  }, []);
  useEffect(()=>{
    postPageRef.current.innerHTML = postPage.content;
  },[postPage])
  const showPostPage = async (id) => {
    const result = await getPostPage(id);
    if (result) {
      setPostPage(result);
    }
  };
  
  return postPage ? (
    <div className="post-page" >
      <div className="content" ref={postPageRef}/>
    <ProductRowRandom/>
    </div>
  ) : (
    <div>Không tìm thấy bài báo</div>
  );
};
export default PostPage;
