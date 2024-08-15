import React, { useState, useEffect } from "react";
//useContext
import { useActiveStep } from "../../utils/ActiveStepContext";
//API URL
// import { CourseListAPI } from "../../utils/apiUrl";
// import callAPI from "../../utils/apiAction";
//Common Components
import ButtonComponent from "../../commonComponents/ButtonComponent";
//MUI ICONS
import SchoolIcon from "@mui/icons-material/School";
//Assets
import animationData from "../../assets/spinner_loader.json";
import Lottie from "react-lottie";
//Import
import OhNoComponent from "./OhNoComponent";

export const DegreeCard = ({
  id,
  img_src,
  title,
  full_name,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <ButtonComponent
      className={`content-button ${selected ? "selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <div key={id} className={`content `}>
        <>{icon ? icon : <img src={img_src} className="icon" />}</>
        <div className="degree-content-container">
          <h3 className="degree-title">{title}</h3>
          <p className="degree-fullname">{full_name ? (`${full_name}`) : ""}</p>
        </div>
      </div>
    </ButtonComponent>
  );
};

const Distance = () => {
  const {
    selectedDegree,
    selectDegree,
    updateDataAvailability,
    dataAvailable,
  } = useActiveStep();
  const userName = sessionStorage.getItem("name");
//   const courseURL = CourseListAPI;
  const [courseData, setCourseData] = useState(null);
  const [courseDataAvailable, setCourseDataAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log({ selectedDegree });
  console.log(selectedDegree);
  sessionStorage.setItem("DegreeID", selectedDegree);
//   useEffect(() => {
//     const queryParams = {
//       _industry: sessionStorage.getItem("IndustryID"),
//       _qualification: sessionStorage.getItem("QualificationID"),
//       _aspiration: sessionStorage.getItem("RoleID"),
//     };
//     const fetchComboData = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await callAPI(courseURL, "POST", queryParams, {
//           Authorization: "Bearer YourAccessToken",
//         });
//         setCourseData(data);
//         console.log("Data", data);
//         if (data.length !== 0 && data !== null) {
//           setCourseDataAvailable(true);
//           updateDataAvailability(true);
//         } else {
//           setCourseDataAvailable(false);
//           updateDataAvailability(false);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     courseData !== null &&
//       console.log("Course Data outside fetch function : ", courseData);
//     fetchComboData();
//   }, []);

  console.log("Course Data Available (useState) : ", dataAvailable);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  if (isLoading) {
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
    <>
      {courseDataAvailable !== null && courseDataAvailable ? (
        <div className="degree-page">
          <h2>Hi {userName}!</h2>
          <h1 className="heading">Begin your Journey With The Right Degree!</h1>
          <h4 className="sub-heading">
            Choose from the degrees mapped to your ambition
          </h4>
          <div className="degree-card">
            {courseData !== null &&
              courseData.slice(0, 3).map((item) => {
                return (
                  <>
                    <svg width={0} height={0}>
                      <defs>
                        <linearGradient
                          id="gradientColors"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#A9416F" />
                          <stop offset="50%" stopColor="#7240B2" />
                          <stop offset="100%" stopColor="#2D4CB0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <DegreeCard
                      title={item.shortName}
                      full_name={item.courseName}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="65"
                          height="66"
                          viewBox="0 0 65 66"
                          fill="none"
                        >
                          <g filter="url(#filter0_dddii_2877_45304)">
                            <circle cx="32.5" cy="28" r="26" fill="#FAFAFA" />
                            <circle
                              cx="32.5"
                              cy="28"
                              r="26"
                              fill="url(#paint0_linear_2877_45304)"
                              fill-opacity="0.5"
                            />
                            <circle
                              cx="32.5"
                              cy="28"
                              r="26"
                              fill="url(#paint1_linear_2877_45304)"
                            />
                          </g>
                          <mask
                            id="mask0_2877_45304"
                            maskUnits="userSpaceOnUse"
                            x="17"
                            y="12"
                            width="32"
                            height="32"
                          >
                            <rect
                              x="17.2588"
                              y="12.7582"
                              width="31.0805"
                              height="31.0805"
                              fill="#D9D9D9"
                            />
                          </mask>
                          <g mask="url(#mask0_2877_45304)">
                            <path
                              d="M25.6012 34.5561C25.2193 34.3436 24.9201 34.0568 24.7034 33.6959C24.4867 33.335 24.3784 32.9303 24.3784 32.4816V26.8632L21.7934 25.4337C21.5809 25.3125 21.4248 25.1651 21.3252 24.9914C21.2256 24.8177 21.1758 24.6247 21.1758 24.4123C21.1758 24.2 21.2256 24.0072 21.3252 23.8337C21.4248 23.6602 21.5809 23.5128 21.7934 23.3916L31.681 18.0043C31.8565 17.9067 32.0373 17.8351 32.2233 17.7895C32.4093 17.7438 32.6002 17.7209 32.796 17.7209C32.9918 17.7209 33.1827 17.7438 33.3687 17.7895C33.5547 17.8351 33.7356 17.9066 33.9115 18.004L45.0787 24.0814C45.2779 24.1894 45.4306 24.3353 45.5369 24.5193C45.6431 24.7033 45.6963 24.9019 45.6963 25.115V32.7555C45.6963 33.0307 45.6031 33.2614 45.4169 33.4475C45.2307 33.6337 44.9999 33.7268 44.7246 33.7268C44.4493 33.7268 44.2187 33.6337 44.0327 33.4475C43.8468 33.2614 43.7538 33.0307 43.7538 32.7555V25.4885L41.2136 26.8632V32.4816C41.2136 32.9303 41.1052 33.335 40.8886 33.6959C40.6719 34.0568 40.3726 34.3436 39.9908 34.5561L33.9142 37.8409C33.7365 37.9405 33.5547 38.0132 33.3687 38.0588C33.1827 38.1045 32.9918 38.1273 32.796 38.1273C32.6002 38.1273 32.4093 38.1045 32.2233 38.0588C32.0373 38.0132 31.8555 37.9405 31.6778 37.8409L25.6012 34.5561ZM32.6465 29.1295C32.7047 29.1627 32.7566 29.1793 32.8022 29.1793C32.8479 29.1793 32.8998 29.1627 32.9579 29.1295L41.6544 24.4127L32.9579 19.7083C32.8998 19.6751 32.8479 19.6585 32.8022 19.6585C32.7566 19.6585 32.7047 19.6751 32.6465 19.7083L23.9376 24.4127L32.6465 29.1295ZM32.6341 36.1599C32.6922 36.1931 32.7462 36.2097 32.796 36.2097C32.8458 36.2097 32.8998 36.1931 32.9579 36.1599L39.0843 32.8502C39.1507 32.8087 39.1984 32.7609 39.2275 32.7069C39.2566 32.653 39.2711 32.5845 39.2711 32.5015V27.8992L33.9341 30.8304C33.7565 30.9301 33.5722 31.0027 33.3812 31.0483C33.1903 31.094 32.9952 31.1168 32.796 31.1168C32.5967 31.1168 32.4017 31.094 32.2107 31.0483C32.0198 31.0027 31.8355 30.9301 31.6579 30.8304L26.3209 27.8992V32.5015C26.3209 32.5679 26.3354 32.6322 26.3645 32.6945C26.3935 32.7568 26.4413 32.8087 26.5077 32.8502L32.6341 36.1599Z"
                              fill="url(#paint2_linear_2877_45304)"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_dddii_2877_45304"
                              x="0.771265"
                              y="0.567816"
                              width="63.4575"
                              height="64.8897"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feMorphology
                                radius="1.43218"
                                operator="dilate"
                                in="SourceAlpha"
                                result="effect1_dropShadow_2877_45304"
                              />
                              <feOffset />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0862745 0 0 0 0 0.141176 0 0 0 0 0.172549 0 0 0 0.12 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2877_45304"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1.43218" />
                              <feGaussianBlur stdDeviation="1.43218" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0862745 0 0 0 0 0.141176 0 0 0 0 0.172549 0 0 0 0.16 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="effect1_dropShadow_2877_45304"
                                result="effect2_dropShadow_2877_45304"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feMorphology
                                radius="5.72874"
                                operator="erode"
                                in="SourceAlpha"
                                result="effect3_dropShadow_2877_45304"
                              />
                              <feOffset dy="5.72874" />
                              <feGaussianBlur stdDeviation="5.72874" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0862745 0 0 0 0 0.141176 0 0 0 0 0.172549 0 0 0 0.16 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="effect2_dropShadow_2877_45304"
                                result="effect3_dropShadow_2877_45304"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect3_dropShadow_2877_45304"
                                result="shape"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="-2.86437" />
                              <feGaussianBlur stdDeviation="0.537069" />
                              <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                              />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0862745 0 0 0 0 0.141176 0 0 0 0 0.172549 0 0 0 0.06 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="shape"
                                result="effect4_innerShadow_2877_45304"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="1.43218" />
                              <feGaussianBlur stdDeviation="0.537069" />
                              <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2="-1"
                                k3="1"
                              />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="effect4_innerShadow_2877_45304"
                                result="effect5_innerShadow_2877_45304"
                              />
                            </filter>
                            <linearGradient
                              id="paint0_linear_2877_45304"
                              x1="32.5"
                              y1="2"
                              x2="32.5"
                              y2="54"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#1E3657" stop-opacity="0" />
                              <stop
                                offset="1"
                                stop-color="#1E3657"
                                stop-opacity="0.02"
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_2877_45304"
                              x1="32.5"
                              y1="2"
                              x2="32.5"
                              y2="54"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                offset="0.704766"
                                stop-color="white"
                                stop-opacity="0"
                              />
                              <stop offset="0.936192" stop-color="white" />
                              <stop
                                offset="1"
                                stop-color="white"
                                stop-opacity="0"
                              />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_2877_45304"
                              x1="21.1758"
                              y1="27.9242"
                              x2="45.6963"
                              y2="27.9242"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#A9416F" />
                              <stop offset="0.535" stop-color="#7240B2" />
                              <stop offset="1" stop-color="#2D4CB0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      }
                      selected={selectedDegree === item.id}
                      onSelect={() => selectDegree(item.id)}
                    />
                  </>
                );
              })}
          </div>
        </div>
      ) : (
        <OhNoComponent />
      )}
    </>
  );
};

export default Distance;