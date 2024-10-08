import React, { useEffect, useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styles from "./styles.module.scss"

const Rank = ({ totalCarbonEmissions }) => {

    const [leaderboardEntries, setLeaderboardEntries] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [discount, setDiscount] = useState(0);
    const username = sessionStorage.getItem('name');
    const distance = sessionStorage.getItem('distanceData');
    const scalingFactor = 0.5;

    useEffect(() => {
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

    const calculateDiscount = (carbonFootprint) => {
        if (carbonFootprint > 0) {
            const discountPercentage = (distance / carbonFootprint) * scalingFactor;
            return discountPercentage;
        }
        return 0;
    };
    console.log("Discount : ", discount);
    sessionStorage.setItem("discount", discount);

    const fetchLeaderboardData = async () => {
        try {
            const response = await fetch('/api/leaderboard/getScore');
            const data = await response.json();
            console.log('Leaderbord get data :', data);
            const sortedEntries = [...data].sort((a, b) => a.carbonFootprint - b.carbonFootprint);
            const rankedEntries = sortedEntries.reduce((acc, entry, index) => {
                acc.push({ ...entry, rank: index + 1 });
                return acc;
            }, []);

            const userEntry = data.find(entry => entry.username === username);
            if (userEntry) {
                const calculatedDiscount = calculateDiscount(userEntry.carbonFootprint);
                setDiscount(calculatedDiscount / 100);
            }

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
                <div
                    className={styles.leaderboardCardHeading}
                >
                    <span className={styles.rankUsername}>RANK</span>
                    <span className={styles.rankUsername}>USER ID</span>
                    <span className={styles.rankUsername}> USERNAME</span>
                    <p className={styles.carbonFootprintText}>CO<sub>2</sub> EMITTED</p>
                </div>
                {leaderboardEntries.map((entry) => (
                    <div
                        key={entry.rank}
                        className={styles.leaderboardCard}
                        style={{ backgroundColor: entry.username.toLowerCase() === sessionStorage.getItem('name').toLowerCase() ? '#F1A203' : '#065C30' }}
                    >
                        <span className={styles.rankRounded}>{entry.rank}</span>
                        <span className={styles.rankUsername}>{entry._id}</span>
                        <span className={styles.rankUsername}> {entry.username}</span>
                        <p className={styles.carbonFootprintText}><span className={styles.carbonFootprintValue}>{entry.carbonFootprint.toFixed(2)}</span> kg CO2e</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Rank
