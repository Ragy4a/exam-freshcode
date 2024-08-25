import React from 'react';
import styles from './ProgressBar.module.sass';

const ProgressBar = ({ currentStep }) => {
  const renderBar = (count) => {
    const isActive = count === currentStep;
    const isComplete = count < currentStep;

    const classOuter = isActive
      ? styles.outerActive
      : isComplete
      ? styles.outerComplete
      : styles.outerNotActive;

    const classInner = isActive
      ? styles.innerActive
      : isComplete
      ? styles.innerComplete
      : styles.innerNotActive;

    return (
      <div className={isActive ? styles.progressContainer : ''} key={count}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count !== 3 && <div className={styles.lineBar} />}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.progressBarContainer}>
      {[1, 2, 3].map((count) => renderBar(count))}
    </div>
  );
};

export default ProgressBar;