import React from 'react'
import { Link } from 'react-router-dom'
import { events } from '../Home/Events';


const EventOverviewCard = ({ key, img_src, title, content, direction }) => {
  const formatTitleForURL = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
  };
  return (
    <>
      <div className='event-overview-card' style={{ flexDirection: direction }} key={key}>
        <div className='left-section'>
          <img src={img_src} alt="event" />
        </div>
        <div className='right-section'>
          <h1>{title}</h1>
          <h3>{content}</h3>
          <Link to={`/events/${formatTitleForURL(title)}`}>
          <h4>Know More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <mask id="mask0_2918_20272" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                <rect width="16" height="16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2918_20272)">
                <path d="M11.0744 8.49924H3.5C3.35812 8.49924 3.23932 8.45138 3.1436 8.35565C3.04787 8.25993 3 8.14113 3 7.99925C3 7.85738 3.04787 7.73858 3.1436 7.64285C3.23932 7.54713 3.35812 7.49927 3.5 7.49927H11.0744L8.87947 5.30437C8.78032 5.20523 8.73139 5.0892 8.73268 4.9563C8.73396 4.8234 8.78289 4.70524 8.87947 4.60182C8.98289 4.49841 9.10169 4.44499 9.23587 4.44157C9.37006 4.43815 9.48886 4.48815 9.59227 4.59157L12.5782 7.57747C12.6406 7.63986 12.6846 7.70567 12.7102 7.7749C12.7359 7.84413 12.7487 7.91891 12.7487 7.99925C12.7487 8.0796 12.7359 8.15438 12.7102 8.2236C12.6846 8.29284 12.6406 8.35865 12.5782 8.42104L9.59227 11.4069C9.49313 11.5061 9.37541 11.555 9.23908 11.5537C9.10276 11.5524 8.98289 11.5001 8.87947 11.3967C8.78289 11.2933 8.73289 11.1762 8.72947 11.0454C8.72606 10.9146 8.77606 10.7975 8.87947 10.6941L11.0744 8.49924Z" fill="#2C5FF8" />
              </g>
            </svg>
          </h4></Link>
        </div>
      </div>
    </>
  )
}

const EventsOverview = () => {
  const colors = ['#F0E9FA', 'white'];
  const direction = ['row', 'row-reverse']
  return (
    <div className='events-overview'>
      {events.map((item, index) => {
        const bgcolor = index % 2 === 0 ? colors[0] : colors[1];
        const bgdirection = index % 2 === 0 ? direction[0] : direction[1];
        return (
          <>
            <div style={{ backgroundColor: bgcolor }} >
              <EventOverviewCard key={index} img_src={item.image_src} title={item.title} content={item.content} direction={bgdirection} />
            </div>
          </>
        )
      })}

    </div>
  )
}

export default EventsOverview