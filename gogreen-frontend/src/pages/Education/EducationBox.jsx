import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import styles from "./styles.module.scss";
import ButtonComponent from "../../commonComponents/ButtonComponent";
import LinearProgressComponent from "../../commonComponents/LinearProgress";

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

const EducationCard = ({ id, logo, videoId, title, owner, isCompleted, onProgressUpdate, playerRefs, onVideoClick }) => {
  // const [player, setPlayer] = useState(null);

  // useEffect(() => {
  //   console.log(`Initializing player for video ${videoId}`);
  //   const loadYouTubeAPI = () => {
  //     if (!window.YT) {
  //       // Load YouTube IFrame API
  //       const tag = document.createElement("script");
  //       tag.src = "https://www.youtube.com/iframe_api";
  //       document.body.appendChild(tag);
  //     }
  //     else {
  //       onYouTubeIframeAPIReady();
  //       console.log("calling onYouTubeIframeAPIReady inside else statement");
  //     }
  //   };

  //   const onYouTubeIframeAPIReady = () => {
  //     if (window.YT && playerRefs.current[videoId]) {
  //       const newPlayer = new window.YT.Player(playerRefs.current[videoId], {
  //         videoId,
  //         events: {
  //           onStateChange: onPlayerStateChange,
  //         },
  //       });
  //       setPlayer(newPlayer);
  //     }
  //   };

  //   if (!window.YT) {
  //     loadYouTubeAPI();
  //     window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  //   } else {
  //     onYouTubeIframeAPIReady();
  //   }

  //   return () => {
  //     if (player) {
  //       player.destroy();
  //     }
  //   };
  // }, [videoId]);

  // const onPlayerStateChange = (event) => {
  //   let interval;
  //   if (event.data === window.YT.PlayerState.PLAYING) {
  //     const duration = event.target.getDuration();
  //     interval = setInterval(() => {
  //       const currentTime = event.target.getCurrentTime();
  //       const progress = (currentTime / duration) * 100;

  //       onProgressUpdate(videoId, progress);

  //       if (progress >= 90) {
  //         onProgressUpdate(videoId, 100);
  //         clearInterval(interval);
  //       }

  //       if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
  //         clearInterval(interval);
  //       }
  //     }, 1000);
  //   } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
  //     clearInterval(interval);
  //   }
  // };


  
  return (
    <Link to={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" onClick={() => onVideoClick(videoId)}>
    <div key={id} className={styles.itemCard}>
      <img src={logo} alt="product" className={styles.itemImg} />
      <div className={styles.itemCardMidSection}>
        <p className={styles.itemTitle}>{title}</p>
        <p className={styles.itemOwner}> {owner}</p>
        {isCompleted && <span className={styles.completedBadge}>Completed</span>}
      </div>

    </div>
    </Link>
    // <div key={id} className={styles.itemCard}>
    //     <img src={logo} alt="product" className={styles.itemImg} />
      
    //   <div className={styles.itemCardMidSection}>
    //     <p className={styles.itemTitle}>{title}</p>
    //     <p className={styles.itemOwner}>{owner}</p>
    //     {isCompleted && <span className={styles.completedBadge}>Completed</span>}
    //   </div>

    //   {/* Iframe for YouTube video */}
    //   {console.log({playerRefELEMENET:playerRefs.current,player})}
    //   <div ref={(el) => (playerRefs.current[videoId] = el)} style={{ width: '100%' }}>
    //     {player ? null : <div>Loading...</div>}
    //   </div>
      
    // </div>
  );
};

const EducationBox = () => {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [watchHistory, setWatchHistory] = useState({});
  // const playerRefs = useRef({});

  // useEffect(() => {
  //   fetchYouTubePlaylist().then((items) => setPlaylistItems(items));
  //   const history = JSON.parse(sessionStorage.getItem("watchHistory")) || {};
  //   setWatchHistory(history);
  // }, []);

  // const handleProgressUpdate = (videoId, progress) => {
  //   setWatchHistory((prevHistory) => {
  //     const updatedHistory = { ...prevHistory, [videoId]: progress };
  //     sessionStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
  //     return updatedHistory;
  //   });

  //   const completedVideos = Object.values({ ...watchHistory, [videoId]: progress }).filter(
  //     (p) => p === 100
  //   ).length;
  //   const progressPercentage = Math.min(Math.round((completedVideos / playlistItems.length) * 100), 100);
  //   setOverallProgress(progressPercentage);
  // };

  useEffect(() => {
    fetchYouTubePlaylist().then((items) => setPlaylistItems(items));
    const history = JSON.parse(sessionStorage.getItem("watchHistory")) || {};
    setWatchHistory(history);
    const savedProgress = sessionStorage.getItem("overallProgress");
    if (savedProgress) {
      setOverallProgress(Number(savedProgress));  // Retrieve and set overall progress
    }
  }, []);
  

  const handleVideoClick = (videoId) => {
    setWatchHistory((prevHistory) => {
      const updatedHistory = { ...prevHistory, [videoId]: 100 };
      sessionStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  
    const completedVideos = Object.values({ ...watchHistory, [videoId]: 100 }).filter(
      (p) => p === 100
    ).length;
    const progressPercentage = Math.min(Math.round((completedVideos / playlistItems.length) * 100), 100);
  
    setOverallProgress(progressPercentage);
    sessionStorage.setItem("overallProgress", progressPercentage); // Save overall progress
  };
  

  // useEffect(() => {
  //   fetchYouTubePlaylist().then((items) => setPlaylistItems(items));
  // }, []);


  return (
    <div className={styles.educationContainer}>
      {/* <h1 className={styles.heading}>Education</h1> */}

      <div className={styles.progressWrapper}>
        <p>Your Progress</p>
        <LinearProgressComponent value={overallProgress} max="100" className={styles.progress}/>
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
          // onProgressUpdate={handleProgressUpdate}
          // playerRefs={playerRefs}
          onVideoClick={handleVideoClick}
        />
      ))}

      </div>
      
    </div>
  );
};

export default EducationBox;
