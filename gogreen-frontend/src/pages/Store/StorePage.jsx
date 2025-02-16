import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { additem, decrementItem } from "../../utils/CartSlice";
import ButtonComponent from "../../commonComponents/ButtonComponent";
import axios from "axios";
import StoreBanner1 from "../../assets/store_banner1.png";
import StoreBanner2 from "../../assets/store_banner2.png";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const store_banner = [
  { id: "001", img_src: StoreBanner1 },
  { id: "002", img_src: StoreBanner2 },
];

const categories_list = [
  {
    id: "001",
    img_src:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/clothes-1756752-1494242.png?f=webp&w=256",
    category: "clothes",
  },
  {
    id: "002",
    img_src:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/sofa-5656345-4714774.png?f=webp&w=256",
    category: "homeDecor",
  },
  {
    id: "003",
    img_src:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/luggage-3254722-2712587.png?f=webp&w=256",
    category: "luggage",
  },
  {
    id: "004",
    img_src:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/stationary-2826405-2347432.png?f=webp&w=256",
    category: "stationary",
  },
  {
    id: "005",
    img_src:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/plants-2344353-1969834.png?f=webp&w=256",
    category: "plants",
  },
];
export const ItemCard = ({ id, logo, price, title, color, description }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddQuantity = (itemId) => {
    console.log("Incrementing item with id:", itemId);
    dispatch(
      additem({
        id: itemId,
        logo: logo,
        price: price,
        title: title,
        color: color,
      })
    );
  };
  const handleSubQuantity = (itemId) => {
    console.log("Decrementing item with id:", itemId);
    dispatch(decrementItem({ id: itemId }));
  };
  return (
    <div key={id} className={styles.itemCard}>
      <img src={logo} alt="product" className={styles.itemImg} />
      <div className={styles.itemCardContentSection}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemDesc}>{description}</p>
        <div className={styles.itemCardMidSection}>
          <p className={styles.itemPrice}>&#8377; {price}</p>
          {color && (
            <div style={{ backgroundColor: color }} className={styles.colorBox}>
              {" "}
            </div>
          )}
        </div>

        <div className={styles.ItemCardBottomSection}>
          {quantity === 0 ? (
            <div className={styles.buttonContainer}>
              <ButtonComponent
                onClick={() => handleAddQuantity(id)}
                className={styles.addToCartButton}
              >
                <ShoppingCartIcon /> Add to Cart
              </ButtonComponent>
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <ButtonComponent
                onClick={() => handleSubQuantity(id)}
                className={styles.minusButton}
                children="-"
              />
              <p className={styles.quantity}>{quantity}</p>
              <ButtonComponent
                onClick={() => handleAddQuantity(id)}
                className={styles.plusButton}
                children="+"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ img_src, category, handleClickCategory }) => {
  return (
    <div onClick={handleClickCategory} className={styles.categoryCard}>
      <img src={img_src} alt="category" className={styles.categoryCardIcon} />
      <p className={styles.categoryCardTitle}>{category}</p>
    </div>
  );
};

function StorePage() {
  const [image, setImage] = useState(0);
  const categories = [
    "clothes",
    "homeDecor",
    "luggage",
    "stationary",
    "plants",
  ];
  const [selectedCategory, setSelectedCategory] = useState("clothes");
  const [storeData, setStoreData] = useState(null);
  const nextSlide = () => {
    setImage((nextImage) => (nextImage + 1) % store_banner.length);
  };

  console.log(process.env.REACT_API_BASE_URL);

  const fetchStoreData = async () => {
    try {
      const requests = categories.map((category) =>
        axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products?category=${category}`,
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      );
      const responses = await Promise.all(requests);
      const newData = {};
      responses.forEach((res, index) => {
        newData[categories[index]] = res.data;
      });
      setStoreData(newData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [image]);
  return (
    <>
      <div className={styles.storePage}>
        <div className={styles.storeBanner}>
          <motion.div
            key={image}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={store_banner[image].img_src}
              alt="storeBanner"
              className={styles.storeBannerImg}
            />
          </motion.div>

          <p>{store_banner[image].img_text}</p>
        </div>
        <div className={styles.storeList}>
          <div className={styles.categoryList}>
            {categories_list.map((item, index) => {
              return (
                <CategoryCard
                  key={index}
                  img_src={item?.img_src}
                  category={item?.category}
                  handleClickCategory={() =>
                    setSelectedCategory(item?.category)
                  }
                  className={styles.categoryCard}
                />
              );
            })}
          </div>
          <div className={styles.storeSloganContainer}>
            <hr className={styles.horizontalLine} />
            <p className={styles.storeListSlogan}>
              Your cart seems empty, why not fill it with some greenary
            </p>
            <hr className={styles.horizontalLine} />
          </div>

          <div className={styles.storeItemsList}>
            {storeData !== null &&
              storeData[selectedCategory]?.myData.map((item, index) => {
                return (
                  <motion.div
                    key={item._id || index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0, y: -20 },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                  >
                    <ItemCard
                      key={item.id || index}
                      id={item._id}
                      logo={item.logo}
                      price={item.price}
                      title={item.name}
                      color={item.color}
                      description={item.description}
                    />
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default StorePage;
