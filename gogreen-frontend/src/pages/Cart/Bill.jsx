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
        <div className={styles.billContainer}>
            <p className={styles.billTitle}>Total Items - </p>
            <span className={styles.billContent}>{cartItems.length}</span>
            <p className={styles.billTitle}>Total -  </p>
            <span className={styles.billContent}> &#8377; {totalCost.toFixed(2)}</span>
            <p className={styles.billTitle}>Delivery Cost - </p>
            <span className={styles.billContent}>&#8377; {deliveryCost.toFixed(2)}</span>

            <p className={styles.billTitle}>To Pay - </p>
            <span className={styles.billContent}>&#8377; {total.toFixed(2)}</span>
            <ButtonComponent children={'Pay Now'}/>
        </div>
      
    </>
  )
}

export default Bill
