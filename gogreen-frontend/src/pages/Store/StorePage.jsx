import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { additem, decrementItem } from '../../utils/CartSlice';
import ButtonComponent from "../../commonComponents/ButtonComponent"
import axios from 'axios';
import StoreBanner1 from '../../assets/store_banner1.jpg';
import StoreBanner2 from '../../assets/store_banner2.jpg';
import StoreBanner3 from '../../assets/store_banner3.jpg';
import styles from "./styles.module.scss"

const store_banner = [
    {
        id:"001",
        img_src: StoreBanner1,
        img_text: "Transform your space into a verdant paradise with our plant collection."
    },
    {
        id:"002",
        img_src: StoreBanner2,
        img_text: "Life's too short for dull spaces. Light up with Green!"
    },
];

const categories_list = [
    {
        id: "001",
        img_src: "https://cdn.iconscout.com/icon/premium/png-512-thumb/clothes-1756752-1494242.png?f=webp&w=256",
        category: "clothes"
    },
    {
        id: "002",
        img_src: "https://cdn.iconscout.com/icon/premium/png-512-thumb/sofa-5656345-4714774.png?f=webp&w=256",
        category: "homeDecor"
    },
    {
        id: "003",
        img_src: "https://cdn.iconscout.com/icon/premium/png-512-thumb/luggage-3254722-2712587.png?f=webp&w=256",
        category: "luggage"
    },
    {
        id: "004",
        img_src: "https://cdn.iconscout.com/icon/premium/png-512-thumb/stationary-2826405-2347432.png?f=webp&w=256",
        category: "stationary"
    },
    {
        id: "005",
        img_src: "https://cdn.iconscout.com/icon/premium/png-512-thumb/plants-2344353-1969834.png?f=webp&w=256",
        category: "plants"
    }
]
export const ItemCard = ({id, logo, price, title, color}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const itemInCart = cartItems.find(item => item.id === id);
    const quantity = itemInCart ? itemInCart.quantity : 0;

    const handleAddQuantity = (itemId) => {
        console.log('Incrementing item with id:', itemId);
        dispatch(additem({ id: itemId, logo: logo, price: price, title: title, color: color }));
    };
    const handleSubQuantity = (itemId) => {
        console.log('Decrementing item with id:', itemId);
        dispatch(decrementItem({ id: itemId }));
    };       
    return(
        <div key={id} className={styles.itemCard} >
            <img src={logo} alt='product' className={styles.itemImg}/>
            <p className={styles.itemTitle}>{title}</p>
            <div className={styles.itemCardMidSection}>
                <p className={styles.itemPrice}>&#8377; {price}</p>
                {color && <div style={{backgroundColor: color}} className={styles.colorBox}> </div>}
            </div>

            <div className={styles.ItemCardBottomSection}>
                <div className={styles.buttonContainer}>
                    <ButtonComponent onClick={() => handleSubQuantity(id)}  className={styles.minusButton} children="-" />
                    <p className={styles.quantity}>{quantity}</p>
                    <ButtonComponent onClick={() => handleAddQuantity(id)} className={styles.plusButton} children="+" />
                </div>
            </div>
        </div>
    )
}

const CategoryCard = ({img_src, category, handleClickCategory, className}) => {
    return(
        <div onClick={handleClickCategory} className={className}>
            <img src={img_src} alt='category'/>
            <p>{category}</p> 
        </div>
    )
}

function StorePage() {
    const [image, setImage] = useState(0);
    // const [quantity, setQuantity] = useState({});
    const categories = ['clothes', 'homeDecor', 'luggage', 'stationary', 'plants'];
    const [selectedCategory, setSelectedCategory] = useState('clothes');
    const [storeData, setStoreData] = useState(null);
    const nextSlide = () => {
        setImage((nextImage)=> (nextImage +1) % store_banner.length );
    }
    
    const fetchStoreData = async() => {
        try {
            const requests = categories.map((category)=>axios.get(`/api/products?category=${category}`));
            const responses = await Promise.all(requests)
            const newData = {};
            responses.forEach((res, index)=>{
                newData[categories[index]] = res.data;
            })
            setStoreData(newData);
        }
        catch(err){
            console.error(err);
        }
    }
    
    useEffect(()=>{
        fetchStoreData();
    }, []);

    useEffect(()=>{
        const timer = setInterval(()=>{
            nextSlide();
        }, 5000);
        return()=>{
            clearInterval(timer);
        }
    }, [image])
  return (
    <>
        <div className={styles.storePage}>
            <div className={styles.storeBanner}>
                <img src={store_banner[image].img_src} alt='storeBanner' className={styles.storeBannerImg}/>
                <p>{store_banner[image].img_text}</p>  
            </div> 
            <div className={styles.storeList}>
                <div className={styles.categoryList}>
                    {categories_list.map((item)=>{
                        return(
                            <CategoryCard 
                                img_src={item?.img_src}
                                category={item?.category}
                                handleClickCategory={()=>setSelectedCategory(item?.category)}
                                className={styles.categoryCard}
                            />
                        )
                    })}
                </div>
                <p className={styles.storeListSlogan}>Your cart seems empty, why not fill it with some greenary</p>
                <div className={styles.storeItemsList}>
                    {storeData!==null && storeData[selectedCategory]?.myData.map((item)=>{
                        return(
                            <ItemCard 
                                id={item._id}
                                logo={item.logo}
                                price={item.price}
                                title={item.name}
                                color={item.color}
                            />
                        )
                    })}
                </div>                
                
            </div>
        </div>
    </>
  )
}

export default StorePage