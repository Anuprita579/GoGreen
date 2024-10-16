# GOGREEN

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Conclusion](#conclusion)

## Overview
GoGreen is a sustainabilty platform which promotes sustainablity by providing features like bicycle booking, events, education, and carbon footprint calculator.

## Features
- **Carbon Footprint Calculator**: Estimate your environmental impact and compete with other team members using leaderboard.
- **Bicycle Booking**: Book bicycles for sustainable transportation.
- **Education**: Access educational resources on sustainable living.
- **Events**: Participate in local sustainability events and workshops.

## Demo
https://gogreen-app.vercel.app/

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Anuprita579/GoGreen.git
   ```
2. Navigate to project directory
   ```
   cd GoGreen
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Add environment variable in both backend and frontend folder
   For frontend folder - 
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   REACT_APP_HOME_PAGE_ROUTE=/
   REACT_APP_STORE_PAGE_ROUTE=/store
   REACT_APP_CART_PAGE_ROUTE=/cart
   REACT_APP_EVENTS_PAGE_ROUTE=/events
   REACT_APP_EDUCATION_PAGE_ROUTE=/education
   REACT_APP_CALCULATE_PAGE_ROUTE=/calculate
   REACT_APP_LEADERBOARD_PAGE_ROUTE=/leaderboard
   REACT_APP_BICYCLE_PAGE_ROUTE=/bicycle
   REACT_APP_ABOUT_PAGE_ROUTE=/about
   REACT_APP_FAQ_PAGE_ROUTE=/faq
   REACT_APP_GOOGLE_CLIENTID=
   REACT_APP_YOUTUBE_API_KEY=
   REACT_APP_PLAYLIST_ID=PLb5SyhPhDyTfB2NKLucvg6HDqX_3v9RHs
   ```

   For backend folder -
   ```
   MONGODB_URL = 
   APP_MAILID=
   APP_MAIL_PASSWORD=
   ```
5. Start the application:
   ```
   npm run start
   ```
Open your browser and visit http://localhost:3001

## Technologies Used
- React: Frontend
- MongoDB: Database
- Node.js: Backend
- Express: Server Framework
- Redux: State Management
- SASS: Styling
- Material UI: Component Library
- Nodemailer.js: Email Integration
- React Leaflet: Map Integration
- Framer motion: Animated Transitions
- React-lottie: Animated Icons
- jwt-decode: JWT Decoding
- Webpack: Bundler

## Usage
- **Explore Sustainability**: Navigate through our platform to discover eco-friendly options for transportation, dining, and lifestyle choices.
- **Calculate Carbon Footprint**: Use our calculator to understand your environmental impact and learn ways to reduce it.
- **Book Sustainable Transportation**: Reserve bicycles for short trips around town.
- **Learn About Sustainability**: Access educational resources to deepen your understanding of sustainable living.
- **Participate in Events**: Find and join local events focused on sustainability and eco-consciousness.

## Conclusion
GoGreen promotes sustainability by providing tools and resources to encourage environmentally friendly choices. Our platform aims to make sustainable living easier and more accessible to everyone.

## Demo Video
https://github.com/user-attachments/assets/0550d743-59c6-4e25-9fbc-38d8884b3590