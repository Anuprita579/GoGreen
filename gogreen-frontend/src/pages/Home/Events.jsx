import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from "../../commonComponents/ButtonComponent"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventsImage from "../../assets/events_heroimage.png";
import styles from "./styles.module.scss"

export const events = [
    {
        id: "001",
        eventType: "upcoming event",
        date: "March 15, 2025",
        title: "Tree Plantation Drive - Bangalore",
        content: "Join us in restoring greenery and combating climate change! This drive aims to plant trees across Mumbai, promoting biodiversity, reducing carbon footprints, and creating a healthier environment for future generations. Volunteers will participate in planting saplings and learn about urban afforestation.",
        image_src: (EventsImage),
        location: "Bangalore, India",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Increase green cover and improve air quality." },
            { goalId: "000002", goal_desc: "Educate participants on the importance of afforestation." },
            { goalId: "000003", goal_desc: "Encourage community involvement in environmental conservation." },
        ]
    },
    {
        id: "002",
        eventType: "upcoming event",
        date: "May 5-7, 2025",
        title: "Sustainable Campaign - Delhi",
        content: "A three-day campaign dedicated to promoting sustainable living practices. This event will feature workshops on waste management, renewable energy, and eco-friendly alternatives. Participants will engage in hands-on activities and gain insights into how small changes can make a big impact on the environment.",
        image_src: "https://www.theenvironment.in/wp-content/uploads/2024/06/MD-Jindal-Stainless-Mr-Abhyuday-Jindal-participates-in-the-plastic-waste-collection-drive.jpeg",
        location: "Delhi, India",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Raise awareness about sustainable living practices." },
            { goalId: "000002", goal_desc: "Empower individuals with practical eco-friendly solutions." },
            { goalId: "000003", goal_desc: "Promote community-driven initiatives for a greener future." },
        ]
    },
    {
        id: "003",
        eventType: "upcoming event",
        date: "March 20, 2025",
        title: "Beach Cleaning Drive - Mumbai",
        content: "Join us in making Mumbai’s beaches cleaner and greener! This event aims to raise awareness about marine pollution and encourage responsible waste disposal. Volunteers will help in removing plastic waste, educating visitors on sustainable practices, and contributing to a healthier environment.",
        image_src: "https://thecsrjournal.in/wp-content/uploads/2024/06/Kalpataru-beach-clean-up-drive-Prabhadevi.jpg",
        location: "Marine Drive, CSMT",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Reduce plastic and waste pollution along the shoreline." },
            { goalId: "000002", goal_desc: "Educate the community on the importance of ocean conservation." },
            { goalId: "000003", goal_desc: "Encourage responsible waste management and eco-friendly habits." },
        ]
    },
];

export const EventsCard = ({ id, image_src, publisher, date, title, content, news_link, className }) => {
    return (
        <>
            <div className={className} id={id} >
                <img src={image_src} alt='news' />
                <div className={styles.newsContent}>
                    <h6>{publisher} - {date}</h6>
                    <h3>{title}</h3>
                    <p>{content}</p>
                    {/* <Link to={news_link} target='_blank' rel='noopener noreferrer'>
                        <h5>
                            Read More
                        </h5>
                    </Link> */}
                </div>
            </div>

        </>
    )
}

const Events = () => {
    const displayedNews = events.slice(0, 2);
    const [eventsExist, setEventExist] = useState(false);
    return (
        <div className={styles.news}>
            <h1 className={styles.heading}>Greenverse</h1>
            <div className={styles.newsContainer}>
                <div className={styles.leftSection}>
                    {displayedNews.map((item, index) => {
                        return (
                            <EventsCard
                                key={index}
                                image_src={item.image_src}
                                publisher={item.publisher}
                                date={item.date}
                                title={item.title}
                                content={item.content}
                                news_link={item.news_link}
                                className={styles.newsCard}
                            />
                        )
                    })}
                </div>
                <div className={styles.rightSection}>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/events'>
                        <div className={styles.iconTextInline}>
                            <h5>View More Events</h5>
                            <ArrowForwardIcon />
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to='/events'>
                        <div className={styles.divImgBg}>
                            <div className={styles.blackCover}></div>
                            <div className={styles.topRight}>
                                <div>
                                    <h1>25<sup>th</sup></h1>
                                    <h4>March </h4>
                                    <h5>10 AM - 6 PM</h5>
                                </div>
                            </div>

                            <div className={styles.bottomLeft}>
                                <Button className={styles.bottomLeftButton}>Upcoming Event</Button>
                                <p>Tree Plantation Drive - <br></br> <span>Mumbai</span></p>
                            </div>
                        </div>
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Events