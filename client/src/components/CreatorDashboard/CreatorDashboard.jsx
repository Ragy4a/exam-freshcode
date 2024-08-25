import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import styles from './CreatorDashboard.module.sass';
import TryAgain from '../TryAgain/TryAgain';
import CONSTANTS from '../../constants';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const CreatorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { contests, creatorFilter, error, haveMore, isFetching } = useSelector(
    (state) => state.contestsList
  );
  const { dataForContest } = useSelector((state) => state.dataForContest);

  useEffect(() => {
    dispatch(getDataForContest());
    if (parseUrlForParams(location.search) && !contests.length) {
      getContestsList(creatorFilter);
    }
  }, [location.search, creatorFilter]);

  useEffect(() => {
    return () => {
      dispatch(clearContestsList());
    };
  }, [dispatch]);

  const getContestsList = (filter) => {
    dispatch(
      getContests({
        limit: 8,
        offset: 0,
        ...filter,
      })
    );
  };

  const changePredicate = ({ name, value }) => {
    const updatedFilter = {
      ...creatorFilter,
      [name]: value === 'Choose industry' ? null : value,
    };
    dispatch(setNewCreatorFilter(updatedFilter));
    parseParamsToUrl(updatedFilter);
  };

  const parseParamsToUrl = (creatorFilter) => {
    const params = {};
    Object.keys(creatorFilter).forEach((key) => {
      if (creatorFilter[key]) params[key] = creatorFilter[key];
    });
    navigate(`/Dashboard?${queryString.stringify(params)}`);
  };

  const parseUrlForParams = (search) => {
    const params = queryString.parse(search);
    const filter = {
      typeIndex: params.typeIndex || 1,
      contestId: params.contestId || '',
      industry: params.industry || '',
      awardSort: params.awardSort || 'asc',
      ownEntries: params.ownEntries !== undefined ? params.ownEntries : false,
    };
    if (!isEqual(filter, creatorFilter)) {
      dispatch(setNewCreatorFilter(filter));
      dispatch(clearContestsList());
      getContestsList(filter);
      return false;
    }
    return true;
  };

  const loadMore = (startFrom) => {
    dispatch(
      getContests({
        limit: 8,
        offset: startFrom,
        ...creatorFilter,
      })
    );
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

  const goToExtended = (contestId) => {
    navigate(`/contest/${contestId}`);
  };

  const tryLoadAgain = () => {
    dispatch(clearContestsList());
    getContestsList(creatorFilter);
  };

  const renderSelectType = () => {
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {types.map((el, i) =>
          i ? (
            <option key={i - 1} value={el}>
              {el}
            </option>
          ) : null
        )}
      </select>
    );
  };

  const renderIndustryType = () => {
    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        <option value={null}>Choose industry</option>
        {dataForContest.data.industry.map((industry, i) => (
          <option key={i} value={industry}>
            {industry}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <div className={styles.inputsContainer}>
          <div
            onClick={() =>
              changePredicate({
                name: 'ownEntries',
                value: !creatorFilter.ownEntries,
              })
            }
            className={classNames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </div>
          <div className={styles.inputContainer}>
            <span>By contest type</span>
            {renderSelectType()}
          </div>
          <div className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="text"
              onChange={({ target }) =>
                changePredicate({
                  name: 'contestId',
                  value: target.value,
                })
              }
              name="contestId"
              value={creatorFilter.contestId}
              className={styles.input}
            />
          </div>
          {!isFetching && (
            <div className={styles.inputContainer}>
              <span>By industry</span>
              {renderIndustryType()}
            </div>
          )}
          <div className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: 'awardSort',
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>
      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
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
  );
};

export default CreatorDashboard;