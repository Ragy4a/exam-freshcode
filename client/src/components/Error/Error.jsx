import React from 'react';
import styles from './Error.module.sass';

const Error = ({ status, data, clearError }) => {
  const getMessage = () => {
    switch (status) {
      case 404:
      case 409:
      case 406:
        return data;
      case 400:
        return 'Check the input data';
      case 403:
        return 'Bank decline transaction';
      default:
        return 'Server Error';
    }
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className="far fa-times-circle" onClick={clearError} />
    </div>
  );
};

export default Error;