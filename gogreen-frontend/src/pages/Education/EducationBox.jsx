import React, { useState, useEffect, useRef } from "react";
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

const EducationCard = ({ id, logo, videoId, title, owner, isCompleted, onProgressUpdate }) => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load YouTube IFrame Player API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    } else {
      initializePlayer();
    }
  }, []);

  const initializePlayer = () => {
    setPlayer(
      new window.YT.Player(playerRef.current, {
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
      })
    );
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const duration = event.target.getDuration();
      const interval = setInterval(() => {
        const currentTime = event.target.getCurrentTime();
        const progress = (currentTime / duration) * 100;

        // Update progress in parent component
        onProgressUpdate(videoId, progress);

        // Mark video as completed if progress exceeds 90%
        if (progress >= 90) {
          onProgressUpdate(videoId, 100); // Video is completed
          clearInterval(interval); // Stop tracking
        }

        // Stop tracking if video is paused or ended
        if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
          clearInterval(interval);
        }
      }, 1000);
    }
  };


  
  return (
    // <Link to={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
    // <div key={id} className={styles.itemCard}>
    //   <img src={logo} alt="product" className={styles.itemImg} />
    //   <div className={styles.itemCardMidSection}>
    //     <p className={styles.itemTitle}>{title}</p>
    //     <p className={styles.itemOwner}> {owner}</p>
    //     {isCompleted && <span className={styles.completedBadge}>Completed</span>}
    //   </div>

    //   <div ref={playerRef} style={{ width: '100%'}}></div>
    // </div>
    // </Link>
    <div key={id} className={styles.itemCard}>
        <img src={logo} alt="product" className={styles.itemImg} />
      
      <div className={styles.itemCardMidSection}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemOwner}>{owner}</p>
        {isCompleted && <span className={styles.completedBadge}>Completed</span>}
      </div>

      {/* Iframe for YouTube video */}
      <div ref={playerRef} style={{ width: '100%' }}></div>
    </div>
  );
};

const EducationBox = () => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [watchHistory, setWatchHistory] = useState({});

  useEffect(() => {
    fetchYouTubePlaylist().then((items) => setPlaylistItems(items));

    // Load watch history from session storage
    const history = JSON.parse(sessionStorage.getItem("watchHistory")) || {};
    setWatchHistory(history);
  }, []);

  // Update progress based on each video
  const handleProgressUpdate = (videoId, progress) => {
    setWatchHistory((prevHistory) => {
      const updatedHistory = { ...prevHistory, [videoId]: progress };
      sessionStorage.setItem("watchHistory", JSON.stringify(updatedHistory)); 
      return updatedHistory;
    });

    const completedVideos = Object.values({ ...watchHistory, [videoId]: progress }).filter(
      (p) => p === 100
    ).length;
    const progressPercentage = Math.min( Math.round((completedVideos / playlistItems.length) * 100), 100);
    setOverallProgress(progressPercentage);
  };

  // useEffect(() => {
  //   fetchYouTubePlaylist().then((items) => setPlaylistItems(items));
  // }, []);


  return (
    <div className={styles.educationContainer}>
      <h1 className={styles.heading}>Education</h1>

      <div className={styles.progressWrapper}>
        <progress value={overallProgress} max="100" className={styles.progress}></progress>
        <span className={styles.progressText}>{overallProgress}% Completed</span>
      </div>

      <div className={styles.educationSection}>
      {playlistItems.map((item, index) => (
        <EducationCard
          key={index}
          id={index}
          videoId={item.videoId}
          logo={item.logo}
          title={item.title}
          owner={item.owner}
          isCompleted={watchHistory[item.videoId] === 100}
          onProgressUpdate={handleProgressUpdate}
        />
      ))}

      </div>
      
    </div>
  );
};

export default EducationBox;
