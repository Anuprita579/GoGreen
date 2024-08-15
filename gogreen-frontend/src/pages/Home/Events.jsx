import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from "../../commonComponents/ButtonComponent"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventsImage from "../../assets/events_heroimage.png";

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
            <div className={className} id={id}>
                <img src={image_src} alt='news' className='new-image-size' />
                <div className='news-content'>
                    <h6>{publisher} - {date}</h6>
                    <h3>{title}</h3>
                    <p>{content}</p>
                    <Link to={news_link} target='_blank' rel="noopener noreferrer">
                        <h5>
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <mask id="mask0_2918_20272" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                                    <rect width="16" height="16" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_2918_20272)">
                                    <path d="M11.0744 8.49924H3.5C3.35812 8.49924 3.23932 8.45138 3.1436 8.35565C3.04787 8.25993 3 8.14113 3 7.99925C3 7.85738 3.04787 7.73858 3.1436 7.64285C3.23932 7.54713 3.35812 7.49927 3.5 7.49927H11.0744L8.87947 5.30437C8.78032 5.20523 8.73139 5.0892 8.73268 4.9563C8.73396 4.8234 8.78289 4.70524 8.87947 4.60182C8.98289 4.49841 9.10169 4.44499 9.23587 4.44157C9.37006 4.43815 9.48886 4.48815 9.59227 4.59157L12.5782 7.57747C12.6406 7.63986 12.6846 7.70567 12.7102 7.7749C12.7359 7.84413 12.7487 7.91891 12.7487 7.99925C12.7487 8.0796 12.7359 8.15438 12.7102 8.2236C12.6846 8.29284 12.6406 8.35865 12.5782 8.42104L9.59227 11.4069C9.49313 11.5061 9.37541 11.555 9.23908 11.5537C9.10276 11.5524 8.98289 11.5001 8.87947 11.3967C8.78289 11.2933 8.73289 11.1762 8.72947 11.0454C8.72606 10.9146 8.77606 10.7975 8.87947 10.6941L11.0744 8.49924Z" fill="#2C5FF8" />
                                </g>
                            </svg>

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
        <div className='news'>
            <h1 className='heading'>Greenverse</h1>
            <div className='news-container'>
                <div className='left-section'>

                    {displayedNews.map((item, index) => {
                        return (
                            <EventsCard

                                image_src={item.image_src}
                                publisher={item.publisher}
                                date={item.date}
                                title={item.title}
                                content={item.content}
                                news_link={item.news_link}
                                className={'news-card'}
                            />
                        )
                    })}

                </div>
                <div className='right-section'>
                    <Link style={{ textDecoration: "none", color: "white" }} to="/events">
                        <div className='icon-text-inline'>
                            <h5>View More Events</h5>
                            <ArrowForwardIcon />
                        </div>
                    </Link>
                    <Link style={{ textDecoration: "none", color: "white" }} to="/events">
                        <div className='div_imgbg'>
                            <div className='black-cover'></div>
                            <div className='top-right'>
                                <div>
                                    <h1>25<sup>th</sup></h1>
                                    <h4>March </h4>
                                    <h5>10 AM - 6 PM</h5>
                                </div>
                            </div>

                            <div className='bottom-left'>
                                <Link to="/events"><Button className={'bottom-left-button'}>Upcoming Event</Button></Link>
                                <p>Tree Plantation Drive - <br></br> <h2>Mumbai</h2></p>
                            </div>
                        </div>
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default Events