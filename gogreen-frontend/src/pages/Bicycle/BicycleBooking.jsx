import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/bicycle_loader.json'
import ButtonComponent from '../../commonComponents/ButtonComponent';
import InputFieldComponent from '../../commonComponents/InputFieldComponent';

const BicycleCard = ({ bicycle }) => {
    // const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState(0);
    const [estimatedCost, setEstimatedCost] = useState(0);

    // Calculate the cost when user inputs the distance
    const calculateCost = async () => {
        const response = await fetch('/api/bicycle/calculate-cost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ distance, pricePerKm: bicycle.pricePerKm })
        });
        const data = await response.json();
        setEstimatedCost(data.estimatedCost);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <img src={bicycle.bicycleLogo} alt='logo'/>
            <h3>Bicycle in {bicycle.location}</h3>
            <p>Price per km: &#8377; {bicycle.pricePerKm}</p>

            {/* <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            /> */}
            <InputFieldComponent
                type="number"
                placeholder="Enter estimated distance (km)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
            />
            <ButtonComponent onClick={calculateCost}>Calculate Cost</ButtonComponent>

            {estimatedCost > 0 && <p>Estimated Cost: &#8377; {estimatedCost}</p>}
        </div>
    );
};


const BicycleBooking = () => {
    const [location, setLocation] = useState(null);
    const [bicycles, setBicycles] = useState([]);

    // Get current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
        });
    }, []);

    // Fetch bicycles based on location
    useEffect(() => {
        if (location) {
            console.log(`Fetching bicycles for location:`, location); // Debugging log
            fetch(`/api/bicycle/availability?lat=${location.lat}&lon=${location.lon}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        console.log(data.message); // Debugging log
                    } else {
                        console.log('Bicycles found:', data); // Debugging log
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        );
      }

    return (
        <div>
            {location ? (
                bicycles.length > 0 ? (
                    <div>
                        <h3>Bicycles available at your location</h3>
                        <div>
                            {bicycles.map((bicycle, index) => (
                                <BicycleCard key={bicycle.id || index} bicycle={bicycle} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No bicycles available at your location.</p>
                )
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default BicycleBooking;
