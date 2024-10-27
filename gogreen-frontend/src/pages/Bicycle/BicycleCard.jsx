import React, {useState} from "react";
import ButtonComponent from '../../commonComponents/ButtonComponent';
import InputFieldComponent from '../../commonComponents/InputFieldComponent';
import styles from './styles.module.scss';
import useFetchData from "../../hooks/useFetchData";

const BicycleCard = ({ bicycle }) => {
    const [distance, setDistance] = useState(0);
    const [fetchCost, setFetchCost] = useState(false); 

    const { data: estimatedCostData, isLoading } = useFetchData(
        fetchCost ? '/api/bicycle/calculate-cost' : null,
        {
            method: 'POST',
            body: JSON.stringify({ distance, pricePerKm: bicycle.pricePerKm }),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const estimatedCost = estimatedCostData ? estimatedCostData.estimatedCost : null;

    const calculateCost = () => {
        setFetchCost(true); 
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
                    onChange={(e) => setDistance(Number(e.target.value))}
                />
                <ButtonComponent children={isLoading? 'Calculating...' : 'Calculate Cost'} onClick={calculateCost} className={styles.bicycleButton} disabled={isLoading} />

                {estimatedCost > 0 && <p>Estimated Cost: &#8377; {estimatedCost}</p>}

            </div>
            
        </div>
    );
};
export default BicycleCard