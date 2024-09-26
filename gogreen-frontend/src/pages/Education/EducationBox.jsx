import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import styles from "./styles.module.scss";
import ButtonComponent from "../../commonComponents/ButtonComponent";

// Function to fetch YouTube playlist items
async function fetchYouTubePlaylist() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet&playlistId=${process.env.REACT_APP_PLAYLIST_ID}`
  );
  const data = await response.json();
  return data.items.map((item) => ({
    videoId: item.snippet.resourceId.videoId,
    logo: item.snippet.thumbnails.high.url,
    title: item.snippet.title,
    owner: item.snippet.channelTitle,
  }));
}

const EducationCard = ({ id, logo, videoId, title, owner }) => {
  return (
    <Link to={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
    <div key={id} className={styles.itemCard}>
      <img src={logo} alt="product" className={styles.itemImg} />
      <div className={styles.itemCardMidSection}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemOwner}> {owner}</p>
      </div>
    </div>
    </Link>
  );
};

const EducationBox = () => {
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    fetchYouTubePlaylist().then((items) => setPlaylistItems(items));
  }, []);
  return (
    <div className={styles.educationContainer}>
      <h1 className={styles.heading}>Education</h1>
      <div className={styles.educationSection}>
      {playlistItems.map((item, index) => (
        <EducationCard
          key={index}
          id={index}
          videoId={item.videoId}
          logo={item.logo}
          title={item.title}
          owner={item.owner}
        />
      ))}

      </div>
      
    </div>
  );
};

export default EducationBox;
