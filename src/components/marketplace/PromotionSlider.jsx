import React from "react";
import Slider from "react-slick";

const promotions = [
  {
    id: 1,
    banner: "/images/icons/banner1.png",
    title: "Connect Your Wallet",
    desc: "Collect your rewards",
    cta: "Connect Now",
    image: "https://static.vecteezy.com/system/resources/thumbnails/008/486/043/small_2x/open-gift-box-surprise-earn-point-and-get-rewards-special-offer-concept-3d-rendering-illustration-png.png",
  },
  {
    id: 2,
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX5xQg0JI5w1_a3fLs7dCv9T941tjGJKR76w&s",
    title: "Become As Seller",
    desc: "Make Your Money",
    cta: "Start Now",
    image: "https://static.vecteezy.com/system/resources/previews/011/997/119/non_2x/verified-shop-online-store-3d-illustration-for-ecommerce-icon-free-png.png",
  },
  {
    id: 3,
    banner: "/images/icons/banner3.png",
    title: "Find Best Products",
    desc: "Get Discount up to 50%",
    cta: "Check Now",
    image: "https://img.pikbest.com/png-images/20220113/3d-icon-search-product-illustration-object_6214529.png!sw800",
  },
  {
    id: 4,
    banner: "/images/icons/banner4.png",
    title: "Invite and Earn",
    desc: "Earn More VEC Tokens",
    cta: "Invite Now",
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/party-invitation-3d-icon-download-in-png-blend-fbx-gltf-file-formats--request-greeting-mail-card-new-year-pack-festival-days-icons-8447381.png",
  },
];

const PromotionSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2, // Default untuk PC
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // semua layar <1024px pakai 1 slide
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-6">
      <Slider {...settings}>
        {promotions.map((promo) => (
          <div key={promo.id} className="relative rounded-xl overflow-hidden">
            <img
              src={promo.banner}
              alt={promo.title}
              className="w-full h-32 object-cover md:h-56"
              loading="lazy"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col-2 md:flex-row items-center p-6 text-black">
              {/* Bagian teks */}
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-sm md:text-3xl font-bold mb-2 mt-4">{promo.title}</h3>
                <p className="text-xs md:text-base mb-2">{promo.desc}</p>
                <button className="bg-yellow-400 text-black md:px-4 md:py-2 py-1 px-2 text-sm md:text-lg rounded-xl font-semibold hover:bg-yellow-500">
                  {promo.cta}
                </button>
              </div>

              {/* Bagian gambar */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="h-40 md:h-64 object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PromotionSlider;
