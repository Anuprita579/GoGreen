import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../utils/CartSlice';
import ButtonComponent from '../../commonComponents/ButtonComponent';
import { ItemCard } from '../Store/StorePage';
import Bill from './Bill';
import styles from "./styles.module.scss"

const CartBox = () => {
    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();
    const handleClear =() => {
        dispatch(clearCart())
    }
    if (cartItems.length === 0) return <div>The Cart is Empty</div>
  return (
    <>
    <ButtonComponent children={'Empty Cart'} onClick={handleClear}/>
    <div>
        {cartItems.map((item, index)=>{
            return <ItemCard key={index} {...item} quantity={item.quantity}/>
        })}
    </div>
    <Bill />
    </>
  )
}

export default CartBox
