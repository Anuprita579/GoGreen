import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/bicycle_loader.json'
import styles from './styles.module.scss';

const BicycleLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };
    return (
        <div className={styles.animationContainer}>
            <Lottie options={defaultOptions} height={300} width={300} />
            <p className={styles.animationSubHeading}>Fetching bicycles at your location...</p>
        </div>
    )
}

export default BicycleLoader
