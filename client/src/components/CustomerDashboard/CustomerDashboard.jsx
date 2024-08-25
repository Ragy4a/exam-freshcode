import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CustomerDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    contests,
    customerFilter,
    error,
    haveMore,
    isFetching,
  } = useSelector((state) => state.contestsList);

  const loadMore = (startFrom) => {
    dispatch(
      getContests({
        limit: 8,
        offset: startFrom,
        contestStatus: customerFilter,
        role: CONSTANTS.CUSTOMER,
      })
    );
  };

  const getContestsList = () => {
    dispatch(
      getContests({
        limit: 8,
        contestStatus: customerFilter,
        role: CONSTANTS.CUSTOMER,
      })
    );
  };

  useEffect(() => {
    getContestsList();
    return () => {
      dispatch(clearContestsList());
    };
  }, [customerFilter, dispatch]);

  const goToExtended = (contest_id) => {
    navigate(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    return contests.map((contest) => (
      <ContestBox
        data={contest}
        key={contest.id}
        goToExtended={goToExtended}
      />
    ));
  };

  const tryToGetContest = () => {
    dispatch(clearContestsList());
    getContestsList();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(CONSTANTS.CONTEST_STATUS_ACTIVE))
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
          })}
        >
          Active Contests
        </div>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(CONSTANTS.CONTEST_STATUS_FINISHED))
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
          })}
        >
          Completed contests
        </div>
        <div
          onClick={() =>
            dispatch(setNewCustomerFilter(CONSTANTS.CONTEST_STATUS_PENDING))
          }
          className={classNames({
            [styles.activeFilter]:
              CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
            [styles.filter]:
              CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
          })}
        >
          Inactive contests
        </div>
      </div>
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            navigate={navigate}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;