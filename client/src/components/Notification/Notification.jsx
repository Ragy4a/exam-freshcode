import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Notification.module.sass';

const Notification = ({ message, contestId }) => {
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId && (
        <span
          onClick={() => navigate(`/contest/${contestId}`)}
          className={styles.goToContest}
        >
          Go to contest
        </span>
      )}
    </div>
  );
};

export default Notification;