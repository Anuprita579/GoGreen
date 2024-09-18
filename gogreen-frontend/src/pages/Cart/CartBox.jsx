import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../utils/CartSlice';
import ButtonComponent from '../../commonComponents/ButtonComponent';
import { ItemCard } from '../Store/StorePage';
import Bill from './Bill';
import styles from "./styles.module.scss"
import { Link } from 'react-router-dom';

const CartBox = () => {
    const cartItems = useSelector(store => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();
    const handleClear =() => {
        dispatch(clearCart())
    }
    if (cartItems.length === 0) return (
      <div className={styles.emptyCartContainer}>
        <img src='https://img.freepik.com/free-vector/product-hunt-concept-illustration_114360-1722.jpg?t=st=1726562635~exp=1726566235~hmac=eda20e1e7a42b453d51a637e32301897bcac9e019722befacc2c68e689525fd5&w=826' alt='emptycart'/>
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
    <ButtonComponent children={'Empty Cart'} onClick={handleClear}/>
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
