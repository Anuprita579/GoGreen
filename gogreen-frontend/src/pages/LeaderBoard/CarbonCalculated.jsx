import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Rank from "./Rank";

const CarbonCalculated = () => {
  const username = sessionStorage.getItem("name");
  // const discount = sessionStorage.getItem('discount');

  const [discount, setDiscount] = useState(null);
  const [reload, setReload] = useState(null);

  function calculateCarbonEmissions(distance, mode, innerOption) {
    const emissionFactors = {
      dieselcar: 0.171,
      petrolcar: 0.17,
      evcar: 0.047,
      walking: 0,
      cycling: 0,
      cngauto: 0.061,
      petrolauto: 0.061,
      bike: 0.114,
      train: 0.035,
      normalbus: 0.097,
      evbus: 0.068,
    };
    // const factorKey = Object.keys(emissionFactors).find(key => key.toLowerCase() === mode.replace(/\s+/g, '').toLowerCase());
    // const factor = emissionFactors[factorKey] || 0;
    //     return distance * factor;
    const factorKey = Object.keys(emissionFactors).find(
      (key) => key.toLowerCase().replace(/\s+/g, "") === mode?.toLowerCase()
    );
    if (factorKey) {
      const factor = emissionFactors[factorKey];
      return distance * factor;
    }
    const innerOptionKey = Object.keys(emissionFactors).find(
      (key) =>
        key.toLowerCase().replace(/\s+/g, "") ===
        innerOption?.toLowerCase().replace(/\s+/g, "")
    );
    if (innerOptionKey) {
      const innerFactor = emissionFactors[innerOptionKey];
      return distance * innerFactor;
    }
    return 0;
  }

  const distributedModes = JSON.parse(
    sessionStorage.getItem("SelectedTransportModes") || "{}"
  );
  let totalCarbonEmissions = 0;

  console.log({ reloadRender: reload });

  useEffect(() => {
    const temp = sessionStorage.getItem("discount");
    console.log({ sessionStorage, temp });
    setDiscount(temp);
  }, [reload]);

  return (
    <div className={styles.carbonCalculatedContainer}>
      <div className={styles.carbonCalulatedBox}>
        <img
          src="https://img.freepik.com/free-vector/achievement-concept-illustration_114360-5577.jpg?ga=GA1.1.424564767.1738696865&semt=ais_hybrid"
          className={styles.leaderBoardImage}
        />
        <div className={styles.carbonCalculatedCard}>
          <p className={styles.caption}>{username} your Carbon Emission is </p>
          {Object.entries(distributedModes).map(
            ([modeId, { distance, title, innerOption }]) => {
              const emissions = calculateCarbonEmissions(
                distance,
                title,
                innerOption
              ); // Use title for mode

              totalCarbonEmissions += emissions;

              return (
                <div key={modeId} className={styles.carbonItem}>
                  <p className={styles.modeName}>{title}</p>
                  <p>
                    <span className={styles.subtitle}>Distance:</span>{" "}
                    {distance} <span className={styles.units}>km</span>
                  </p>
                  <p>
                    <span className={styles.subtitle}>Carbon Emissions:</span>{" "}
                    {emissions.toFixed(2)}{" "}
                    <span className={styles.units}>kg CO2e</span>
                  </p>
                </div>
              );
            }
          )}

          <div className={styles.totalCarbon}>
            <p className={styles.totalCarbonTitle}>Total Carbon Emissions</p>
            <p className={styles.totalCarbonContent}>
              {totalCarbonEmissions.toFixed(2)} <span> kg CO2e</span>
            </p>
          </div>

          <p className={styles.discountEligible}>
            Congratulations {username} you're eligible for{" "}
            <span className={styles.discountNumber}>
              {(discount * 100).toFixed(2)}%
            </span>{" "}
            discount{" "}
          </p>
        </div>
      </div>

      <Rank totalCarbonEmissions={totalCarbonEmissions} setReload={setReload} />
    </div>
  );
};

export default CarbonCalculated;
