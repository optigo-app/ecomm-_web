import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Controller, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    title: "Men",
    image:
      "https://static.zara.net/assets/public/f3a1/465a/0bc74358ac58/0fa7eda3bab9/image-landscape-18a9440f-d819-4c7a-b8c2-60fa5cdad18b-default_0/image-landscape-18a9440f-d819-4c7a-b8c2-60fa5cdad18b-default_0.jpg?ts=1727455804537&w=1920&f=auto",
  },
  {
    title: "Women",
    image:
      "https://static.zara.net/assets/public/258d/1e7d/0e2c499fb3e6/3b56c88a953b/image-landscape-default-fill-66ef1aa5-ea19-443d-93c3-d28190ca9f50-default_0/image-landscape-default-fill-66ef1aa5-ea19-443d-93c3-d28190ca9f50-default_0.jpg?ts=1727279656267&w=1920&f=auto",
  },
  {
    title: "Kids",
    image:
      "https://static.zara.net/assets/public/e970/2e3e/dcfa4427a4f9/7f2fc82a6ed6/image-landscape-fill-b0e4cd7c-5374-4a43-9137-4a7e10b8b7ea-default_0/image-landscape-fill-b0e4cd7c-5374-4a43-9137-4a7e10b8b7ea-default_0.jpg?ts=1726833400201&w=1920&f=auto",
  },
  {
    title: "Beauty",
    image:
      "https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_64/f_auto,q_auto,w_1100/v1565279671/shape/mentalfloss/578211-gettyimages-542930526.jpg",
  },
];
const products = {
  Men: [
    { id: 1, name: "Men's T-Shirt", price: 29.99 },
    { id: 2, name: "Men's Jeans", price: 59.99 },
    { id: 3, name: "Men's Sneakers", price: 89.99 },
  ],
  Women: [
    { id: 4, name: "Women's Dress", price: 79.99 },
    { id: 5, name: "Women's Blouse", price: 39.99 },
    { id: 6, name: "Women's Heels", price: 69.99 },
  ],
  Kids: [
    { id: 7, name: "Kids' Pajamas", price: 24.99 },
    { id: 8, name: "Kids' Sneakers", price: 49.99 },
  ],
  Old: [
    { id: 9, name: "Vintage Jacket", price: 119.99 },
    { id: 10, name: "Retro Sunglasses", price: 39.99 },
    { id: 11, name: "Classic Watch", price: 149.99 },
  ],
};
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const categoriesList = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];


export default function ZaraStyleSlider() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0); // Track vertical scroll index
  const horizontalSwiperRef = useRef(null);
  const verticalSwipersRef = useRef([]);
  const [ProductList ,setProductList]  =useState({

  })

  const fetchProductsByCategory = async (category) => {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await res.json();
    return { [category]: data.products }; 
  };

  const fetchAllProducts = async () => {
    try {
      const promises = categoriesList?.map(fetchProductsByCategory);
      const results = await Promise.all(promises);
      const combinedResults = results.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

      setProductList(combinedResults);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    console.log(ProductList , "ProductList")
  }, []);
  useEffect(() => {
    verticalSwipersRef.current = verticalSwipersRef.current.slice(
      0,
      categories.length
    );
  }, []);

  const handleCategoryChange = (index) => {
    setCategoryIndex(index);
    setScrollIndex(0); // Reset scroll index when changing category
    verticalSwipersRef.current[index]?.slideTo(0);
  };

  const handleScroll = (index) => {
    setScrollIndex(index); // Update scroll index based on the scroll position
    verticalSwipersRef.current[categoryIndex]?.slideTo(index);
  };

  return (
   <>
   <div className="menus_bar"
   style={{width  :"300px" ,height  :"150px",backgroundColor:"black",position :"fixed",top :"25px",bottom:"45px"}}
   >
   </div>
    <div
      style={{
        height: "100vh",
        backgroundColor: "#F7FAFC",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        bottom: 0,
        zIndex: 99999999999,
        // scrollSnapType: "y mandatory", // Enable snap scrolling
      }}
    >
      <Swiper
        style={{ height: "100%", width: "100%" }}
        direction="horizontal"
        slidesPerView={1}
        onSwiper={(swiper) => (horizontalSwiperRef.current = swiper)}
        onSlideChange={(swiper) => handleCategoryChange(swiper.activeIndex)}
        modules={[Navigation, Pagination, Controller, EffectFade]}
        // effect="fade"
        // fadeEffect={{ crossFade: true }}
        speed={800} // Set the speed of the transition (in milliseconds)
      >
        {ProductList && Object.keys(ProductList)?.map((category, catIndex) => (
          <SwiperSlide key={category.title} style={{ height: "100%" }}>
            <div
              style={{
                height: "100vh",
                width: "100%",
                overflowY: "scroll",
                // scrollSnapAlign: "start", // Aligns the snap to the start of the container
                position: "relative",
              }}
              onScroll={(e) => {
                const scrollHeight = e.target.scrollHeight;
                const clientHeight = e.target.clientHeight;
                const scrollTop = e.target.scrollTop;
                const index = Math.floor(
                  (scrollTop / (scrollHeight - clientHeight)) * 50
                );
                handleScroll(index);
              }}
            >
              {ProductList && ProductList[category].map((product, index) => (
        <div
          key={product?.id}
          style={{
            height: "100vh",
            // backgroundColor: getRandomColor(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "white",
            flexDirection: "column",
            position  : "relative"
          }}
        >
          <h1>{product?.name}</h1>
          <p>${product?.price.toFixed(2)}</p>
          {/* Uncomment if you have images */}
          <img loading="lazy"  src={product?.images?.[0] || product?.images?.[1] || product?.images?.[3] || product?.thumbnail} alt={product.name} style={{
            width: "100%",
            height: "100vh",
            objectFit: "contain",
            position:"absolute"
          }} />
        </div>
      ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </>
  );
}
