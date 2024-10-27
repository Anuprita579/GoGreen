import React from 'react'
import ButtonComponent from "../../commonComponents/ButtonComponent";
import styles from "./styles.module.scss";

const ModesOfTransportCard = ({
    id,
    img_src,
    title,
    icon,
    selected,
    onSelect,
  }) => {
    return (
      <ButtonComponent
        className={`${styles.contentButton} ${selected ? styles.selected : ""}`}
        onClick={() => onSelect(id)}
      >
        <div key={id} className={styles.content}>
          {icon ? icon : <img src={img_src} alt="icon" className={styles.icon} />}
  
          <h3 className={styles.transportTitle}>{title}</h3>
        </div>
      </ButtonComponent>
    );
  };

export default ModesOfTransportCard
