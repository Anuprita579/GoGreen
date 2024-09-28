import React from 'react'
import styles from "./styles.module.scss"
import Rank from './Rank';


const CarbonCalculated = () => {
    const username = sessionStorage.getItem('name');
    function calculateCarbonEmissions(distance, mode) {
        const emissionFactors = {
          walking: 0,
          cycling: 0,
          auto: 0.061,
          taxi: 0.17,
          train: 0.065,
          bus: 0.069,
          car: 0.133,
        };
    const factorKey = Object.keys(emissionFactors).find(key => key.toLowerCase() === mode.replace(/\s+/g, '').toLowerCase());
    const factor = emissionFactors[factorKey] || 0;
        return distance * factor;
    }
    const distributedModes = JSON.parse(sessionStorage.getItem('DistributedTransportModes') || '{}');
    let totalCarbonEmissions = 0;

    console.log(sessionStorage.getItem('DistributedTransportModes'));

      
  return (
    <div className={styles.carbonCalculatedContainer}>
    <div className={styles.carbonCalculatedCard}>
        <p className={styles.caption}>{username} your Carbon Emission is </p>
        {Object.entries(distributedModes).map(([modeId, { distance, title }]) => {
                const emissions = calculateCarbonEmissions(distance, title); // Use title for mode

                totalCarbonEmissions += emissions;

                return (
                    <div key={modeId} className={styles.carbonItem}>
                        <p className={styles.modeName}>{title}</p> 
                        <p><span className={styles.subtitle}>Distance:</span> {distance} <span className={styles.units}>km</span></p> 
                        <p><span className={styles.subtitle}>Carbon Emissions:</span> {emissions.toFixed(2)} <span className={styles.units}>kg CO2e</span></p>
                    </div>
                );
            })}

            <div className={styles.totalCarbon}>
                <p className={styles.totalCarbonTitle}>Total Carbon Emissions</p>
                <p className={styles.totalCarbonContent}>{totalCarbonEmissions.toFixed(2)} <span> kg CO2e</span></p>
            </div>  
    </div>

        <Rank totalCarbonEmissions={totalCarbonEmissions}/>
    </div>
  )
}

export default CarbonCalculated
