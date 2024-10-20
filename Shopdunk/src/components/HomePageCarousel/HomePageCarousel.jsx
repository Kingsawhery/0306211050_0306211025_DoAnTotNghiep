import { useEffect } from "react";
import Slider from "react-slick";
import { useState } from "react";
import { getAllBanners } from "../../services/bannerService";
const HomePageCarousel = () => {
  const [banners, setBanners] = useState([]);

  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    draggable: true
  };

  useEffect(() => {
    getBanners();
  }, []);
  const getBanners = async () => {
    try {
      const banners = await getAllBanners();
      if (banners) {
        setBanners(banners);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="homepage-carousel">
      <Slider {...settings}>
        {banners.map((item, index) => {
          return (
            <div className="div-img">
              <picture class="ng-star-inserted">
                <source
                  className="carousel"
                  media="(max-width: 768px)"
                  type="image/webp"
                  srcset={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/${item.imageMobile}`}
                />
                {/* <source media="(min-width: 768px)" type="image/jpeg" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GaQueKem.jpg?v=3QjVqL"/>
        <source media="(max-width: 767px)" type="image/webp" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/xs/GaQueKem.webp?v=3QjVqL"/>
        <source media="(max-width: 767px)" type="image/jpeg" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/xs/GaQueKem.jpg?v=3QjVqL"/> */}
                <img
                  loading="lazy"
                  src={`${process.env.REACT_APP_LOCALHOST_SERVER}/bannerImage/${item.imageDesktop}`}
                  alt="undefined"
                />
              </picture>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default HomePageCarousel;
