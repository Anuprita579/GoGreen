import React from 'react'
import { Link } from 'react-router-dom';
//useContext
import { useScroll } from "../utils/ScrollContext";
//Common Components
import Button from "../commonComponents/ButtonComponent";
//MUI ICONS
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
//Assets
import styles from "./styles.module.scss"

const Footer = () => {
  const { footerRef } = useScroll();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const formatTitleForURL = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
  };
  return (
    <footer className={styles.footer} ref={footerRef}>
        <div className={styles.footerTop}>
            <div className={styles.leftSection}>
                {/* <img src={Logo} alt="logo" className='logo'/> */}
                <p>
                GoGreen makes living sustainably easy and rewarding. Our project encourages eco-friendly actions by offering rewards, educational campaigns, and a marketplace for green products. Join us in making a real impact on the environment and building a better future.
                </p>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.rightTop}>
                    <div className={styles.section1}>
                        <h3>GOGREEN</h3>
                        <ul>
                            <Link to="/about"><li>About Us</li></Link>
                            <Link to="/"><li>Carbon Footprint Calculator</li></Link>
                            <Link to="/faq"><li>FAQs</li></Link>
                        </ul>
                    </div>
                    <div className={styles.section1}>
                        <h3>GREENVERSE</h3>
                        <ul>
                            <Link to="/events"><li>Events</li></Link>
                            <Link to="/"><li>Education</li></Link>
                            <Link to="/store"><li>Shopping</li></Link>
                        </ul>
                    </div>
                    <div className={styles.section1}>
                        <h3>CONTACT US</h3>
                        <div className={styles.iconTextInline}>
                            <MailOutlineIcon />
                            <h5>info@gogreen.com</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.rightBottom}>
                    <div className={styles.section1}>
                        <h3>Connect With Us</h3>
                        <ul className={styles.connectUsIcons}>
                            <Link to='https://www.facebook.com/digivarsity.the.uni.of.work'  target='_blank'><li><FacebookIcon /> </li></Link>
                            <Link to='https://www.instagram.com/digivarsity.the.uni.of.work/' target='_blank'><li> <InstagramIcon /></li></Link>
                            <Link to='https://www.youtube.com/channel/UCJnL4J428DyhA-KzdNvE5Ng' target='_blank'><li><YouTubeIcon /></li></Link>
                        </ul>
                    </div>
                    <Button className={styles.scrollTop} onClick={scrollToTop} style={{backgroundColor: "white", color: "black" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="25" viewBox="0 0 14 25" fill="none">
                            <path d="M14 7.0229L7 0L0 7.0229L1.17658 8.20327L6.16811 3.1954V25H7.832V3.19556L12.8234 8.20327L14 7.0229Z" fill="black"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
        
        <div className={styles.footerBottom}>
            <div className={styles.content}>
                <hr  className={styles.horizontalLine}></hr>
                <div className={styles.copyright}>
                    <h6>Copyright &copy;2024 </h6>
                    <Link to="/terms-policy" style={{color: "white"}}><h5>Terms & conditions</h5></Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer