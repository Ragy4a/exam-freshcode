import React from 'react';
import moment from 'moment';
import styles from './ContestBox.module.sass';
import CONSTANTS from '../../constants';

const ContestBox = ({ data, goToExtended }) => {
  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(data.createdAt)));
    const days = diff.days();
    const hours = diff.hours();
    let str = '';
    if (days !== 0) str = `${days}d `;
    if (hours !== 0) str += `${hours}h`;
    if (str.length === 0) str = 'less than one hour';
    return str;
  };

  const getPreferenceContest = () => {
    switch (data.contestType) {
      case CONSTANTS.NAME_CONTEST:
        return data.typeOfName;
      case CONSTANTS.LOGO_CONTEST:
        return data.brandStyle;
      case CONSTANTS.TAGLINE_CONTEST:
        return data.typeOfTagline;
      default:
        return '';
    }
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => goToExtended(data.id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{data.title}</span>
          <span className={styles.id}>{`(#${data.id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(data.contestType)} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}diamond.png`}
              alt="diamond"
            />
            <span>{`$${data.prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}entrieImage.png`}
              alt="entries"
            />
            <span>{data.count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;