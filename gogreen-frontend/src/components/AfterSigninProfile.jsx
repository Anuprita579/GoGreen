import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//useContext
import { useLoginState } from '../utils/LoginStateContext';
//API URL
// import { GetConfirmedPathwayAPI } from '../utils/apiUrl';
// import callAPI from '../utils/apiAction';
//Common Components
import AccordionComponent from '../commonComponents/AccordionComponent';

const AfterSigninProfile = ({ onClose }) => {
  const username = sessionStorage.getItem('name');
  const { isLoggedIn, userInfo, login, logout } = useLoginState();
  const navigate = useNavigate();
  // const GetConfirmedPathwayURL = GetConfirmedPathwayAPI;
  // const [getConfirmJobData, setGetConfirmJobData] = useState(null);

  // useEffect(() => {
  //   const queryParams = {
  //     mobileNo: sessionStorage.getItem("mobileNo"),
  //   };

  //   const fetchConfirmJobsData = async () => {
  //     try {
  //       const { data } = await callAPI(GetConfirmedPathwayURL, "POST", queryParams, {
  //         Authorization: "Bearer YourAccessToken",
  //       });
  //       if (data.length > 3) {
  //         setGetConfirmJobData(data.slice(0, 3));
  //       } else {
  //         setGetConfirmJobData(data);
  //       }
  //       console.log("Data in Initial rendering of getJobData : ", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchConfirmJobsData();
  // }, []);

  return (
    <div className='after-signin-profile'>
      <ul className='after-signin-list'>
        <h2>Hi {username}!</h2>
          <li>My Pathway</li>
        <AccordionComponent 
          panelId='panel1' 
          heading='Support' 
          headingClassname='accordian-title'
          content={
            <ul className='accordian-list'>
              <Link to="https://api.whatsapp.com/send/?phone=917204677888&text&type=phone_number&app_absent=0" target='_blank' style={{ color: "#555555" }} onClick={() => onClose()}><li>Chat with us</li></Link>
              <Link to="/confirm-slot" style={{ color: "#555555" }} onClick={() => onClose()}>
                <li>Connect with counsellor</li>
              </Link>
            </ul>
          }
          className={'signin-profile-accordian'}
        />
        <Link onClick={logout} style={{ color: "black" }}>
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default AfterSigninProfile;