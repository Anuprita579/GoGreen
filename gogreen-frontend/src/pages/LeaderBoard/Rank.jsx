import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss"

const Rank = ({totalCarbonEmissions}) => {

    const [leaderboardEntries, setLeaderboardEntries] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        handleSubmit();
        fetchLeaderboardData();
    }, [])

    const handleSubmit = async () => {
        const username = sessionStorage.getItem('name');
        const carbonFootprint = totalCarbonEmissions.toFixed(2);

        try {
            const response = await fetch('/api/leaderboard/submitScore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, carbonFootprint }),
            });
            const data = await response.json();
            console.log(data.message);

        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    const fetchLeaderboardData = async () => {
        try {
          const response = await fetch('/api/leaderboard/getScore');
          const data = await response.json();
          const sortedEntries = [...data].sort((a, b) => a.carbonFootprint - b.carbonFootprint);
          const rankedEntries = sortedEntries.reduce((acc, entry, index) => {
            acc.push({ ...entry, rank: index + 1 });
            return acc;
          }, []);
          setLeaderboardEntries(rankedEntries);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching leaderboard data:', error);
          setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading leaderboard...</div>;
    }

  return (
    <div className={styles.leaderboardBox}>
        <h3 className={styles.leaderboardTitle}>Leaderboard</h3>
        <div className={styles.leaderboardContainer}>
                {leaderboardEntries.map((entry) => (
                    <div
                        key={entry.rank} 
                        className={styles.leaderboardCard} 
                        style={{ backgroundImage: entry.username.toLowerCase() === sessionStorage.getItem('name').toLowerCase() ? 'linear-gradient(to right, #FFD580, #000000)' : 'linear-gradient(to right, #00A86B, #333333)' }}
                    > 
                        <span className={styles.rankRounded}>{entry.rank}</span> 
                        <span className={styles.rankUsername}> {entry.username}</span>
                        <p className={styles.carbonFootprintText}><span className={styles.carbonFootprintValue}>{entry.carbonFootprint.toFixed(2)}</span> kg CO2e</p>
                    </div>
                ))}
            </div>
      
    </div>
  )
}

export default Rank
