import React from 'react'
import AccordionComponent from '../../commonComponents/AccordionComponent';
import styles from "./styles.module.scss";

const faqItems = [
    {
      heading: "What is GoGreen?",
      content: "GoGreen is a comprehensive platform designed to streamline sustainable living. It combines a rewards-based system, educational campaigns, and an e-commerce platform for eco-friendly products, empowering users to make informed decisions about their environmental impact."
    },
    {
      heading: "How does GoGreen work?",
      content: "GoGreen provides a unified approach to sustainability. Users can earn rewards, learn about eco-friendly practices, shop for green products, participate in local events, calculate their carbon footprint, and even book bicycles for environmentally friendly transportation."
    },
    {
      heading: "What are the main modules offered by GoGreen?",
      content: "Our platform offers five main modules:\n\n• Bicycle Booking: Rent eco-friendly bikes for short trips.\n• Carbon Footprint Calculator: Measure your environmental impact.\n• Events: Participate in local sustainability events and workshops.\n• Tree Buying: Support reforestation efforts.\n• Shopping: Access a curated selection of eco-friendly products."
    },
    {
      heading: "Is GoGreen free to use?",
      content: "Yes, GoGreen is free to join and use. We offer our services as a public service to promote sustainable living."
    },
    {
      heading: "What kind of rewards can users earn?",
      content: "Users can earn rewards by participating in various activities on the platform, such as completing educational courses, attending events, using our services like bicycle booking, and purchasing eco-friendly products. These rewards can be redeemed for discounts on future purchases or entries into prize draws."
    },
    {
      heading: "Is my personal information secure on GoGreen?",
      content: "Yes, we take user privacy and security very seriously. We use industry-standard encryption methods to protect your data, and we comply with all relevant data protection regulations. You can read our full privacy policy for more details."
    },
    {
      heading: "Can I customize my experience on GoGreen?",
      content: "Absolutely! Users can personalize their dashboard to focus on areas they're most interested in, set reminders for upcoming events, and receive tailored recommendations for eco-friendly products and activities in their area."
    },
    {
      heading: "How do I get started with GoGreen?",
      content: "Simply visit our website and click on the 'Login' button. Fill out the registration form with your email address and enter the otp. Once verified, you'll have instant access to all our features and modules."
    },
    {
      heading: "Are there any plans to expand GoGreen beyond its current offerings?",
      content: "We're constantly looking for ways to enhance and expand our platform. Based on user feedback and emerging trends in sustainability, we may introduce new modules or features in the future. Stay tuned for announcements about upcoming developments!"
    },
  ];
  

const FaqBox = () => {
  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
      <div className={styles.accordionWrapper}>
        {faqItems.map((item, index) => (
          <AccordionComponent
            key={index}
            heading={item.heading}
            content={item.content}
          />
        ))}
      </div>
    </div>
  )
}

export default FaqBox
