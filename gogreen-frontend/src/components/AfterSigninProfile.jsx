import React from 'react';
import { Link } from 'react-router-dom';
//useContext
import { useLoginState } from '../utils/LoginStateContext';
//Common Components
import styles from './styles.module.scss'

const AfterSigninProfile = ({ onClose }) => {
  const username = sessionStorage.getItem('name');
  const { logout } = useLoginState();

  return (
    <div className={styles.afterSigninProfile}>
      <ul className={styles.afterSigninList}>
        <h2>Hi {username}!</h2>
        <Link to={sessionStorage.getItem('DistributedTransportModes')? '/leaderboard': '/calculate'}>
          <li>My Carbon Footprint</li>
        </Link>

        <Link onClick={logout} style={{ color: "black" }}>
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
};

export default AfterSigninProfile;