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
        date: "August 15, 2024",
        title: "Tree Plantation Drive - Mumbai",
        content: "Join us for an interactive symposium where academia meets industry. Keynote speakers from leading corporates and top universities will discuss the future of work-integrated learning and the evolving job market.",
        image_src: (EventsImage),
        location: "Mumbai, India",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Gain insights into emerging trends" },
            { goalId: "000002", goal_desc: "Network with industry leaders" },
            { goalId: "000003", goal_desc: "Discover new opportunities for collaboration." },
        ]
    },
    {
        id: "002",
        eventType: "upcoming event",
        date: "October 5-7, 2024",
        title: "Sustainable Campaign - Delhi",
        content: "A three-day intensive bootcamp focusing on the latest digital skills, including data analytics, digital marketing, and coding. Led by industry experts, this hands-on training will equip you with the skills needed to excel in the digital economy.",
        image_src: EventsImage,
        location: "Delhi, India",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Acquire in-demand digital skills" },
            { goalId: "000002", goal_desc: "Engage in practical learning experiences" },
            { goalId: "000003", goal_desc: "Boost your employability in the tech-driven job market." },
        ]
    },
    {
        id: "003",
        eventType: "upcoming event",
        date: "August 20, 2024",
        title: "Tree Plantation Drive - Banglore",
        content: "A webinar focusing on the benefits and implementation of work-integrated learning. Experts will share their insights on how this approach bridges the gap between education and employment.",
        image_src: EventsImage,
        location: "Online (via Google Meet)",
        fee: "Free",
        goals: [
            { goalId: "000001", goal_desc: "Understand the value of work-integrated learning" },
            { goalId: "000002", goal_desc: "Learn best practices" },
            { goalId: "000003", goal_desc: "Discover how this model can enhance your career prospects." },
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
                    <Link to={news_link} target='_blank' rel='noopener noreferrer'>
                        <h5>
                            Read More
                        </h5>
                    </Link>
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