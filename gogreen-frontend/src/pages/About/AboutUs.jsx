import React from 'react'
import GoGreenBanner from "../../assets/gogreen_banner.png"
import styles from './styles.module.scss'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import Co2Icon from '@mui/icons-material/Co2';

const AboutUsCard = ({title, color, content, icon}) => {
    return(
        <div style={{backgroundColor: color}} className={styles.aboutUsCard}>
            {icon}
            <p className={styles.aboutUsCardHeading}>{title}</p>
            <p className={styles.aboutUsCardContent}>{content}</p>
        </div>
    )
}

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
        <img src={GoGreenBanner} alt='bannner' className={styles.gogreenBanner}/>
        <h2 className={styles.aboutUsHeading}>About Us</h2>
        <div className={styles.aboutUsContentContainer}>
            <p className={styles.aboutUsContent}>GoGreen makes living sustainably easy and rewarding. Our project encourages eco-friendly actions by offering rewards, educational campaigns, and a marketplace for green products. Join us in making a real impact on the environment and building a better future.</p>
        </div>

        <div className={styles.featuresList}>
            <AboutUsCard icon={<ShoppingBagIcon />} title='Shopping' content='Buy all the susutainable items here' color='#6EA647'/>
            <AboutUsCard icon={<DirectionsBikeIcon />} title='Bicycle Booking' content='Buy all the susutainable items here' color='#2C3313'/>
            <AboutUsCard icon={<Co2Icon />} title='Carbon Footprint Calculator' content='Buy all the susutainable items here' color='#BB9935'/>
        </div>
      
    </div>
  )
}

export default AboutUs
