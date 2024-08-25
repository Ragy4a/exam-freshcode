import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.sass';

const BackButton = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div onClick={clickHandler} className={styles.buttonContainer}>
      <span>Back</span>
    </div>
  );
};

export default BackButton;