import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const promotions = [
  {
    id: 1,
    banner: "/images/icons/banner1.png",
    title: "Zero Admin Fees",
    desc: "Keep 100% of your earnings",
    cta: "Start Selling",
    image: "https://static.vecteezy.com/system/resources/thumbnails/008/486/043/small_2x/open-gift-box-surprise-earn-point-and-get-rewards-special-offer-concept-3d-rendering-illustration-png.png",
  },
  {
    id: 2,
    banner: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200",
    title: "Become a Seller",
    desc: "Launch your digital products today",
    cta: "Get Started",
    image: "https://static.vecteezy.com/system/resources/previews/011/997/119/non_2x/verified-shop-online-store-3d-illustration-for-ecommerce-icon-free-png.png",
  },
  {
    id: 3,
    banner: "/images/icons/banner3.png",
    title: "Best Deals",
    desc: "Discover trending digital products",
    cta: "Explore Now",
    image: "https://img.pikbest.com/png-images/20220113/3d-icon-search-product-illustration-object_6214529.png!sw800",
  },
];

const PromotionSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
      <Slider {...settings}>
        {promotions.map((promo) => (
          <div key={promo.id} className="relative">
            <img
              src={promo.banner}
              alt={promo.title}
              className="w-full h-48 md:h-80 object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="px-6 md:px-12 max-w-md">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  {promo.title}
                </h3>
                <p className="text-white/90 mb-4">{promo.desc}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all">
                  {promo.cta} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromotionSlider;
