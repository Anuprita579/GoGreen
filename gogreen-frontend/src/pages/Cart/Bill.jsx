import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import ButtonComponent from '../../commonComponents/ButtonComponent';

const Bill = () => {
    const cartItems = useSelector(store => store.cart.items);
    const totalCost = cartItems.reduce((total, item)=> total + (item.price * item.quantity), 0);
    const deliveryCost = 30
    const total = totalCost + deliveryCost
  return (
    <>
        <div>
            <p>Total Items - {cartItems.length} </p>
            <p>Total - &#8377; {totalCost.toFixed(2)}</p>
            <p>Delivery Cost - &#8377; {deliveryCost.toFixed(2)}</p>
            <hr></hr>
            <p>To Pay - &#8377; {total.toFixed(2)}</p>
            <ButtonComponent children={'Pay Now'}/>
        </div>
      
    </>
  )
}

export default Bill
