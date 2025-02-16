import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../utils/CartSlice';
import ButtonComponent from '../../commonComponents/ButtonComponent';
import { ItemCard } from '../Store/StorePage';
import Bill from './Bill';
import styles from "./styles.module.scss"
import { Link } from 'react-router-dom';
import EmptyCart from '../../assets/emptyCart.png';

const CartBox = () => {
    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();
    const handleClear =() => {
        dispatch(clearCart())
    }
    if (cartItems.length === 0) return (
      <div className={styles.emptyCartContainer}>
        <img src={EmptyCart} alt='emptycart' className={styles.emptyCart}/>
        <div className={styles.leftContainer}>
        <h1>The Cart is Empty</h1>
        <Link to='/store'>
        <ButtonComponent children={'Go to Shop'} className={styles.shopButton}/>
        </Link>

        </div>

      </div>
    )

  return (
    <>
    <ButtonComponent children={'Empty Cart'} onClick={handleClear} className={styles.emptyCartButton}/>
    <div className={styles.viewCartItems}>
        {cartItems.map((item, index)=>{
            return <ItemCard key={index} {...item} quantity={item.quantity} />
        })}
    </div>

    <div className={styles.billWrapper}>
      <Bill />
    </div>
    </>
  )
}

export default CartBox
