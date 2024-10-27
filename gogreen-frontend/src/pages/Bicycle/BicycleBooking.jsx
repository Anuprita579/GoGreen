import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import BicycleCard from './BicycleCard';
import BicycleLoader from './BicycleLoader';
import styles from './styles.module.scss';

const BicycleBooking = () => {
    const [location, setLocation] = useState(null);
    const { data: bicycles, isLoading } = useFetchData(
        location ? `/api/bicycle/availability?lat=${location.lat}&lon=${location.lon}` : null,
        {
            dependencies: [location]
        }
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
        });
    }, []);

    if (!location) {
        return (
            <BicycleLoader />
        );
    }

    return (
        <div className={styles.bicycleBooking}>
            {isLoading ? (
                <BicycleLoader />
            ) : location && (
                bicycles && bicycles.length > 0 ? (
                    <div className={styles.bicycleBookingList}>
                        {bicycles.map((bicycle, index) => (
                            <BicycleCard key={bicycle.id || index} bicycle={bicycle} />
                        ))}
                    </div>
                ) : (
                    <p>No bicycles available at your location.</p>
                )
            )}
        </div>
    );
};

export default BicycleBooking;
