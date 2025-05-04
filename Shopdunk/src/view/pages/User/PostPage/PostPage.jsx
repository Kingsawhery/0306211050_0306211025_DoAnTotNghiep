import { useEffect, useState } from "react";
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
  const [time, setTime] = useState({
    day: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const postPageRef = useRef();
  useEffect(() => {
    showPostPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, []);
  useEffect(() => {
    postPageRef.current.innerHTML = postPage.content;
  }, [postPage])
  const showPostPage = async (id) => {
    const result = await getPostPage(id);
    if (result) {
      setPostPage(result);
      const date = new Date(result.createdAt);
      setTime({
        day: date.getUTCDate(),
        month: date.getUTCMonth() + 1, // Months are zero-based in JavaScript
        year: date.getUTCFullYear(),
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
      })
    }
  };

  return postPage ? (
    <div className="post-page container" >
      <div className="main-title">
        <h1 className="mt-3">{postPage.title}</h1>
        <h4 style={{opacity:0.8}}>{postPage.summary}</h4>
        <p style={{opacity:0.7}}>Thời gian đăng: 
        {` Ngày ${time.day < 10 ? '0' + time.day : time.day} tháng ${time.month < 10 ? '0' + time.month : time.month} năm ${time.year} ${time.hours < 10 ? '0' + time.hours : time.hours}:${time.minutes < 10 ? '0' + time.minutes : time.minutes}:${time.seconds < 10 ? '0' + time.seconds : time.seconds}`}
        </p>
      </div>
      <div className="content" ref={postPageRef} />
      <ProductRowRandom />
    </div>
  ) : (
    <div>Không tìm thấy bài báo</div>
  );
};
export default PostPage;
