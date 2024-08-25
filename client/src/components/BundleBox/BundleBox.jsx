import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './BundleBox.module.sass';
import CONSTANTS from '../../constants';

const BundleBox = ({ path, header, describe, setBundle }) => {
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;
  const bundleRef = useRef(null);

  const renderImage = () =>
    path.map((imgPath, index) => (
      <img
        src={`${defaultPathToImages}${imgPath}`}
        key={index}
        className={styles.imgContainer}
        alt={imgPath.replace(/.png/g, 'Contest')}
      />
    ));

  const mouseOverHandler = () => {
    if (bundleRef.current) {
      Array.from(bundleRef.current.children).forEach((img, index) => {
        img.src = `${defaultPathToImages}blue_${path[index]}`;
      });
    }
  };

  const mouseOutHandler = () => {
    if (bundleRef.current) {
      Array.from(bundleRef.current.children).forEach((img, index) => {
        img.src = `${defaultPathToImages}${path[index]}`;
      });
    }
  };

  const backClass = path.length === 1 ? '' : styles.combinedBundle;

  return (
    <div
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={() => setBundle(header)}
      id={header}
      className={classNames(styles.bundleContainer, backClass)}
    >
      <div ref={bundleRef}>{renderImage()}</div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;