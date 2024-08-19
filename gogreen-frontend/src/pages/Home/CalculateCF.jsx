//Pathway.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../commonComponents/ButtonComponent";
import AlertComponent from "../../commonComponents/AlertComponent";
import { useScroll } from "../../utils/ScrollContext";
import { useLoginState } from "../../utils/LoginStateContext";
import styles from "./styles.module.scss"

const CalculateCF = () => {
  //Scroll Effect
  const { pathwayRef } = useScroll();
  return (
    <div className={styles.pathway} ref={pathwayRef} id="personalise-home-div">
      <div className={styles.mainPathway}>
        <h1>
        GoGreen: Your Path to a Sustainable Future <br></br>{" "}
          <span>What's On Your Mind?</span>
        </h1>
        <div className={styles.pathwayButton}>
            <Link to="/calculate">
              <Button className={styles.gradientButton} >
                Calculate Carbon Footprint
              </Button>
            </Link>
        </div>
      </div>

    </div>
  );
};

export default CalculateCF;