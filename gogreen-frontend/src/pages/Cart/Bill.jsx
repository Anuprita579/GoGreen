import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import ButtonComponent from '../../commonComponents/ButtonComponent';

const Bill = () => {
    const cartItems = useSelector(store => store.cart.items);
    const totalCost = cartItems.reduce((total, item)=> total + (item.price * item.quantity), 0);
    const deliveryCost = 30
    const total = totalCost + deliveryCost

    const discount=sessionStorage.getItem('discount');  
    const discountedTotal = total * (1 - discount);

  return (
    <>
        <div className={styles.billContainer}>
            <p className={styles.billTitle}>Total Items - </p>
            <span className={styles.billContent}>{cartItems.length}</span>
            <p className={styles.billTitle}>Total -  </p>
            <span className={styles.billContent}> &#8377; {totalCost.toFixed(2)}</span>
            <p className={styles.billTitle}>Delivery Cost - </p>
            <span className={styles.billContent}>&#8377; {deliveryCost.toFixed(2)}</span>

            {discount > 0 && (
          <>
            <p className={styles.billTitle}>Discount ({(discount * 100).toFixed(2)}%) - </p>
            <span className={styles.billContent}>-&#8377; {(total * discount).toFixed(2)}</span>
          </>
        )}

            <p className={styles.billTitle}>To Pay - </p>
            <span className={styles.billContent}>&#8377; {discountedTotal.toFixed(2)}</span>
            <ButtonComponent children={'Pay Now'}/>
        </div>
      
    </>
  )
}

export default Bill
