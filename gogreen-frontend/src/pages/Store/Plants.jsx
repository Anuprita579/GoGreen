import React, { useEffect, useState } from 'react';
import { cash, flower, people, stopwatch } from 'ionicons/icons';

import FAQ from './FAQ';

const plant_images = [
    {
        id:"001",
        img_src: "https://img.freepik.com/free-photo/flowers-colored-large-modern-greenhouse_7502-7597.jpg?size=626&ext=jpg&ga=GA1.1.693548172.1671363486&semt=ais",
        img_text: "Transform your space into a verdant paradise with our plant collection."
    },
    {
        id:"002",
        img_src: "https://img.freepik.com/free-photo/cheerful-florist-apron-standing-around-beautiful-flowers-happily-working-big-greenhouse_574295-898.jpg?size=626&ext=jpg&ga=GA1.1.693548172.1671363486&semt=ais",
        img_text: "Life's too short for dull spaces. Light up with Green!"
    },
];

const plant_items = [
    {
        id: "001",
        img_src: "https://nurserylive.com/cdn/shop/collections/3deea72de3e1251177beb61e9648481d_260x260.jpg?v=1681381553",
        title: "Tulip Flower Bulbs",
        price: "35"
    },
    {
        id: "002",
        img_src: "https://nurserylive.com/cdn/shop/collections/60713d771e8e222d7a50ff71da6fb980-334575_260x260.jpg?v=1681381694",
        title: "Daffodil Flower Bulbs",
        price: "55"
    },
    {
        id: "003",
        img_src: "https://nurserylive.com/cdn/shop/collections/8357c7245d7d7e207ea248759b0dbfc0_260x260.jpg?v=1681381548",
        title: "Iris Flower Bulbs",
        price: "60"
    },
    {
        id: "004",
        img_src: "https://nurserylive.com/cdn/shop/collections/093cef4f08ff326611cb1ee1b82cbb77-507378_260x260.jpg?v=1681381548",
        title: "Gladiolus Flower Bulbs",
        price: "150"
    },
    {
        id: "005",
        img_src: "https://nurserylive.com/cdn/shop/collections/208243ea2a5605e9943058a60a3cf1e7_0295f4b1-99cc-4e36-b809-58375436938b_260x260.jpg?v=1681381552",
        title: "Ranunculus Flower Bulbs",
        price: "55"
    },
    {
        id: "006",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-flowering-seeds-category-image-292277_318x318.jpg?v=1681381653",
        title: "Flower Seeds",
        price: "25"
    },
    {
        id: "007",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-hybrid-flowering-seeds-category-image-130227_318x318.jpg?v=1681381655",
        title: "Hybrid Flowering Seeds",
        price: "60"
    },
    {
        id: "008",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-tree-forestry-seeds-category-images-466263_318x318.jpg?v=1681381876",
        title: "Trees and Forestry Seeds",
        price: "35"
    },
    {
        id: "009",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-grass-seeds-category-image-327304_318x318.jpg?v=1681381696",
        title: "Grass Seeds",
        price: "40"
    },
    {
        id: "010",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-microgreen-seeds-category-image_260x260.jpg?v=1681381687",
        title: "Microgreen Seeds",
        price: "20"
    },
    {
        id: "011",
        img_src: "https://nurserylive.com/cdn/shop/products/nurserylive-red-bunny-cactus-opuntia-microdasys-cactus-plant_295x295.jpg?v=1634227373",
        title: "Acanthocereus tetragonus",
        price: "199"
    },
    {
        id: "012",
        img_src: "https://nurserylive.com/cdn/shop/products/nurserylive-echinopsis-species-cactus-plant-1_222x295.jpg?v=1634218498",
        title: "Echinopsis species",
        price: "291"
    },
    {
        id: "013",
        img_src: "https://nurserylive.com/cdn/shop/products/nurserylive-notocactus-rutilans-cactus-plant-1_222x295.jpg?v=1634224969",
        title: "Notocactus rutilans",
        price: "301"
    },
    {
        id: "014",
        img_src: "https://nurserylive.com/cdn/shop/products/nurserylive-moon-cactus-grafted-yellow-cactus-plant-1_222x295.jpg?v=1634224429",
        title: "Moon Cactus",
        price: "599"
    },
    {
        id: "015",
        img_src: "https://nurserylive.com/cdn/shop/products/nurserylive-phalaenopsis-yellow-plant_92edb738-95b1-4386-94ec-60980a6ed195_295x295.jpg?v=1634226144",
        title: "Pincushion Cactus ",
        price: "279"
    },
    {
        id: "016",
        img_src: "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-seeds-peppermint-herb-seeds-16969106948236_large.jpg?v=1634204585",
        title: "Peppermint",
        price: "229"
    },
    {
        id: "017",
        img_src: "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-seeds-garlic-chives-herb-seeds-16969073426572_large.jpg?v=1634203918",
        title: "Garlic Chives",
        price: "74"
    },
    {
        id: "018",
        img_src: "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-seeds-borage-herb-seeds-16969056583820_large.jpg?v=1634203011",
        title: "Borage",
        price: "229"
    },
    {
        id: "019",
        img_src: "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-seeds-sage-herb-seeds-16969119465612_large.jpg?v=1634204803",
        title: "Sage",
        price: "279"
    },
    {
        id: "020",
        img_src: "https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-rama-tulsi-plant-holy-basil-ocimum-sanctum-green-plant_large.jpg?v=1634227321",
        title: "Rema Tulsi",
        price: "174"
    },
    {
        id: "021",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-metal-planters-category-image_260x260.jpg?v=1681381619",
        title: "Watercan",
        price: "312"
    },
    {
        id: "022",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-grow-bag-category-image-935965_260x260.jpg?v=1681381632",
        title: "Plant Bags",
        price: "97"
    },
    {
        id: "023",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-planter-stand-category-image_260x260.jpg?v=1681381748",
        title: "Plant Stand",
        price: "2990"
    },
    {
        id: "024",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-planters-accessories-category-image_217x217.jpg?v=1681381600",
        title: "Plant Hanger",
        price: "299"
    },
    {
        id: "025",
        img_src: "https://nurserylive.com/cdn/shop/collections/nurserylive-trending-planters-collection-image_217x217.jpg?v=1681381824",
        title: "Plant Pot",
        price: "72"
    }    
];

function PlantopiaHome() {
    const [image, setImage] = useState(0);
    const [quantity, setQuantity] = useState({});
    const nextSlide = () => {
        setImage((nextImage)=> (nextImage +1) % plant_images.length );
    }
    const handleAddQuantity = (itemId) =>{
        setQuantity((prevQuant) => ({
            ...prevQuant,
            [itemId]: (prevQuant[itemId] || 0) + 1
        }));
    }
    const handleSubQuantity = (itemId) =>{
        if(quantity[itemId] > 0){
            setQuantity((prevQuant)=>({
                ...prevQuant,
                [itemId]: (prevQuant[itemId] || 0) - 1
            }));
        }
    }
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
        <div>
            <div>
                <img src={plant_images[image].img_src} alt='plant' className='w-full'/>
                <h1 className='relative bottom-96 text-5xl font-extrabold text-black py-5 w-2/3 left-52 bg-slate-100 p-4'>{plant_images[image].img_text}</h1>  
            </div> 
            <div className='text-center w-full'>
                <h1 className='text-xl font-mono mb-4'>Happiness is buying plants from GreenGuide</h1>
                {/*Card List 1*/}
                <div className='flex bg-slate-200 w-full justify-center'>
                    <div className='h-20 w-20 bg-slate-100 rounded-xl p-2 m-2'>
                        <IonIcon icon={people}></IonIcon>
                        <h1>Help Center</h1> 
                    </div>
                    <div className='h-20 w-20 bg-slate-100 rounded-xl p-2 m-2'>
                        <IonIcon icon={stopwatch}></IonIcon>
                        <h1>Track Orders</h1> 
                    </div>
                    <div className='h-20 w-20 bg-slate-100 rounded-xl p-2 m-2'>
                        <IonIcon icon={flower}></IonIcon>
                        <h1>Variety</h1> 
                    </div>
                    <div className='h-20 w-20 bg-slate-100 rounded-xl p-2 m-2'>
                        <IonIcon icon={cash}></IonIcon>
                        <h1>Offers</h1> 
                    </div>
                </div>
                {/*Card List 2*/}
                <div className='flex w-full justify-center my-4'>
                    <div className='h-40 w-40 rounded-xl p-2 m-2 justify-center items-center flex flex-col' style={{backgroundColor: "#DAE3D0"}}>
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/flower-3370429-2814922.png?f=webp&w=256" alt='icon' className='h-28'/>
                        <h1 className='font-semibold'>Flowering Plants</h1> 
                    </div>
                    <div className='h-40 w-40 bg-lime-100 rounded-xl p-2 m-2 justify-center items-center flex flex-col' >
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/herbal-medicine-7424544-6054055.png?f=webp&w=256" alt='icon' className='h-28'/>
                        <h1 className='font-semibold'>Herbs and Edibles</h1> 
                    </div>
                    <div className='h-40 w-40 rounded-xl p-2 m-2 justify-center items-center flex flex-col' style={{backgroundColor: "#DAE3D0"}}>
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/cactus-3066753-2574748.png?f=webp&w=256" alt='icon' className='h-28'/>
                        <h1 className='font-semibold'>Succulents & Cacti</h1> 
                    </div>
                    <div className='h-40 w-40 bg-lime-100 rounded-xl p-2 m-2 justify-center items-center flex flex-col'>
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/seed-8679661-7124217.png?f=webp&w=256" alt='icon' className='h-28'/>
                        <h1 className='font-semibold'>Seeds & Starter Kits</h1> 
                    </div>
                    <div className='h-40 w-40 rounded-xl p-2 m-2 justify-center items-center flex flex-col' style={{backgroundColor: "#DAE3D0"}}>
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/pots-2454064-2035645.png?f=webp&w=256" alt='icon' className='h-28'/>
                        <h1 className='font-semibold'>Plant Accessories</h1> 
                    </div>
                </div>
                {/*Blossom Flower*/}
                <h1 className='text-center text-2xl font-bold my-10'>Your cart seems empty, why not fill it with some greenary</h1>
                <div className='flex justify-center items-center flex-wrap'>
                    {plant_items.map((it)=>{
                        return(
                            <div key={it.id} className='bg-slate-100 shadow-2xl drop-shadow-black m-4 transform hover:scale-105 duration-150 pb-5 '>
                                <img src={it.img_src} alt='blossom' className='m-4 h-60 w-60'/>
                                <h2 className='text-xl font-semibold text-pink-600 text-left pl-5'>&#8377; {it.price}</h2>
                                <h1 className='text-xl font-semibold text-black text-left pl-5'>{it.title}</h1>
                                
                                <div className='flex justify-center items-center m-2'>
                                    <div className='flex justify-center items-center border-2 border-pink-600'>
                                        <button onClick={() => handleSubQuantity(it.id)} className='bg-pink-600 text-white p-2 transform hover:scale-90 duration-200'>-</button>
                                        <h1 className='p-2'>{quantity[it.id] || 0}</h1>
                                        <button onClick={() => handleAddQuantity(it.id)} className='bg-pink-600 text-white p-2 transform hover:scale-90 duration-200'>+</button>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>

                <FAQ />

                
                
            </div>
        </div>
    </>
  )
}

export default PlantopiaHome