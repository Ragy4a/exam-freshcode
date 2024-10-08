import React from 'react';
import styles from './TryAgain.module.sass';

const TryAgain = ({ getData }) => {
  return (
    <div className={styles.container}>
      <span onClick={getData}>Server Error. Try again</span>
      <i className="fas fa-redo" onClick={getData} />
    </div>
  );
};

export default TryAgain;