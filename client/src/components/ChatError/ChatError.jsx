import React from 'react';
import styles from './ChatError.module.sass';

const ChatError = ({ getData }) => {
  return (
    <div className={styles.errorContainer} onClick={getData}>
      <div className={styles.container}>
        <span>Server Error</span>
        <i className="fas fa-redo" />
      </div>
    </div>
  );
};

export default ChatError;