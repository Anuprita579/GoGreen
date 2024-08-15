//Pathway.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../commonComponents/ButtonComponent";
import AlertComponent from "../../commonComponents/AlertComponent";
import { useScroll } from "../../utils/ScrollContext";
import { useLoginState } from "../../utils/LoginStateContext";

const CalculateCF = () => {
  //Scroll Effect
  const { pathwayRef } = useScroll();


  return (
    <div className="pathway" ref={pathwayRef} id="personalise-home-div">
      <div className="main-pathway">
        <h1>
        GoGreen: Your Path to a Sustainable Future <br></br>{" "}
          <span>What's On Your Mind?</span>
        </h1>
        <div className="pathway-button">
            <Link to="/calculate">
              <Button className={"gradient-button"} >
                Calculate Carbon Footprint
              </Button>
            </Link>
        </div>
      </div>

    </div>
  );
};

export default CalculateCF;