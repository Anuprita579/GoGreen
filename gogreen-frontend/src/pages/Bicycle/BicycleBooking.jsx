import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/bicycle_loader.json'
import ButtonComponent from '../../commonComponents/ButtonComponent';
import InputFieldComponent from '../../commonComponents/InputFieldComponent';
import styles from './styles.module.scss';

const BicycleCard = ({ bicycle }) => {
    const [distance, setDistance] = useState(0);
    const [estimatedCost, setEstimatedCost] = useState(0);

    const calculateCost = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bicycle/calculate-cost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ distance, pricePerKm: bicycle.pricePerKm })
        });
        const data = await response.json();
        setEstimatedCost(data.estimatedCost);
    };

    return (
        <div className={styles.bicycleCard} >
            <img src={bicycle.bicycleLogo} className={styles.bicycleLogo} alt='logo'/>
            <div className={styles.bicycleBottomContent}>
                <p className={styles.bicycleLocation}>{bicycle.location}</p>
                <p ><span className={styles.bicycleSubTitle}>Price per km: </span>&#8377; {bicycle.pricePerKm}</p>
                <p className={styles.bicycleDesc}>{bicycle.description}</p>

                <InputFieldComponent
                    type="number"
                    placeholder="Enter estimated distance (km)"
                    value={distance===0? '': distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
                <ButtonComponent onClick={calculateCost} className={styles.bicycleButton}>Calculate Cost</ButtonComponent>

                {estimatedCost > 0 && <p>Estimated Cost: &#8377; {estimatedCost}</p>}

            </div>
            
        </div>
    );
};


const BicycleBooking = () => {
    const [location, setLocation] = useState(null);
    const [bicycles, setBicycles] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
        });
    }, []);

    useEffect(() => {
        if (location) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/api/bicycle/availability?lat=${location.lat}&lon=${location.lon}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        console.log(data.message); 
                    } else {
                        console.log('Bicycles found:', data); 
                        setBicycles(data);
                    }
                })
                .catch((err) => console.error('Error fetching bicycles:', err));
        }
    }, [location]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
      if (!location) {
        return (
          <div
            className={styles.animationContainer}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
          >
            <Lottie options={defaultOptions} height={300} width={300} />
            <p className={styles.animationSubHeading}>Fetching bicycles at your location...</p>
          </div>
        );
      }

      console.log(bicycles);

    return (
        <div className={styles.bicycleBooking}>
            {location  && (
                bicycles.length > 0 ? (
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
