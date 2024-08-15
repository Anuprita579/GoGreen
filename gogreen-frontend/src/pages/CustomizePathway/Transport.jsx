import React, { useState, useEffect, useCallback } from "react";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//API URL
// import { LocationListAPI } from "../../utils/apiUrl";
// import callAPI from "../../utils/apiAction";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI Components
//MUI ICONS
import LocationOnIcon from "@mui/icons-material/LocationOn";
//Assets
import animationData from "../../assets/spinner_loader.json";
//Other Library
import Lottie from "react-lottie";
import axios from "axios";
//Imports
import OhNoComponent from "./OhNoComponent";



const LocationCard = ({ id, img_src, city_name, selected, onSelect }) => {
  return (
    <ButtonComponent
      className={`content-button ${selected ? "selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <div key={id} className={`content `}>
        <>
          <img src={img_src || "" } alt="city" />
          <h5>{city_name}</h5>
        </>
      </div>
    </ButtonComponent>
  );
};

const Transport = ({onClose}) => {
  const { selectLocation, selectedLocation } = useActiveStep();
  // const LocationURL = LocationListAPI;
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [locationDataAvailable, setLocationDataAvailable] = useState(null);
  const { updateDataAvailability } = useActiveStep();
  console.log({ selectedLocation });
  sessionStorage.setItem("LocationID", selectedLocation?.id);
  sessionStorage.setItem("LocationName", selectedLocation?.name);

  const [city, setCity] = useState(null);
  const [enteredCity, setEnteredCity] = useState("");
  const [enteredState, setEnteredState] = useState("");

  useEffect(() => {
    if (city !== null) {
      setEnteredCity("");
    } else if (enteredCity.trim() !== "") {
      setCity(null);
    }
  }, [city, enteredCity]);

  const handleEnteredCityChange = (event) => {
    const newEnteredCity = event.target.value;
    setCity(null);
    setEnteredCity(newEnteredCity);
  };

  const queryParams = {
    _industry: sessionStorage.getItem("IndustryID"),
    _qualification: sessionStorage.getItem("QualificationID"),
    _aspiration: sessionStorage.getItem("RoleID"),
    _courseId: sessionStorage.getItem("DegreeID"),
    _unvId: sessionStorage.getItem("UniversityID"),
    _city: enteredCity || "",
    _state: enteredState || "",
    _pincode: 0,
  };

  // const fetchComboData = async () => {
  //   // setIsLoading(true);
  //   try {
  //     let finalQueryParams = { ...queryParams };
  //     if (city !== null) {
  //       finalQueryParams._city = city;
  //     }
  //     const { data } = await callAPI(LocationURL, "POST", finalQueryParams, {
  //       Authorization: "Bearer YourAccessToken",
  //     });
  //     setLocationData(data);
  //     console.log("Data for Location : ", data);
  //     if (data.length !== 0 && data !== null) {
  //       setLocationDataAvailable(true);
  //       updateDataAvailability(true);
  //     } else {
  //       setLocationDataAvailable(false);
  //       updateDataAvailability(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     updateDataAvailability(false);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     setPageLoading(true);
  //     await fetchComboData();
  //     setPageLoading(false);
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (city || enteredCity || enteredState) {
  //     (async () => {
  //       setIsLoading(true);
  //       locationData !== null && console.log("Location Data outside fetch function : ", locationData);
  //       await fetchComboData();
  //       setIsLoading(false);
  //     })();
  //   }
  // }, [city, enteredCity, enteredState]);

  console.log("Location Data Available (useState) : ", locationDataAvailable);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  if (pageLoading) {
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

  // const handleLocationClick = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //     // navigator.geolocation.getCurrentPosition(handleGeoSuccess);
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  function showPosition(position) {
    axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
      )
      .then((response) => {
        const city = response.data.city;
        setCity(city);
        console.log(`City detected : ${city}`);
      })
      .catch((error) => {
        console.error(error);
        setCity("Error");
      });
  }

  console.log(city);

  return (
    <>
      {locationDataAvailable !== null && locationDataAvailable ? (
        <div className="degree-page">
          <h1>Where Will Your Internship Adventure Be?</h1>
          <h4>Select your preferred location of internship</h4>

          <div className="location-section">
            <ButtonComponent
              onClick={handleLocationClick}
              className="location-detect"
            >
              <input
                value={city || ""}
                className="location-detect-inputbox"
                placeholder="Detect my current location"
                readOnly
              />
              <LocationOnIcon />
            </ButtonComponent>
            <h5>or</h5>
            <input
              value={enteredCity}
              onChange={handleEnteredCityChange}
              className="location-input-box"
              placeholder="Enter city"
            />
            <h5>or</h5>
            <input
              value={enteredState}
              onChange={(e) => {
                setEnteredState(e.target.value);
              }}
              className="location-input-box"
              placeholder="Enter state"
            />
          </div>

          <div className="error-message-section">
            {city === "Error" && (
              <h5 className="error-messages-location">
                Failed to detect your location. Please try again.
              </h5>
            )}
            {locationData === null && city === null && (
              <h5 className="error-messages-location">
                Currently there are no jobs available at selected location.
                Please try another location or select from the below available
                locations
              </h5>
            )}
          </div>

          <h3>Popular Cities</h3>
          <div className="popular-cities">
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Lottie options={defaultOptions} height={300} width={300} />
              </div>
            ) : (
              locationData !== null &&
              locationData.slice(0, 7).map((item) => {
                return (
                  <LocationCard
                    id={item?.id}
                    img_src={item?.img_src}
                    city_name={item?.cityName}
                    selected={selectedLocation?.id === item?.id}
                    onSelect={() => selectLocation(item?.id, item?.cityName)}
                  />
                );
              })
            )}
          </div>
        </div>
      ) : (
        <OhNoComponent />
      )}
    </>
  );
};

export default Transport;