import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import styles from './UserProfile.module.sass';
import CONSTANTS from '../../constants';
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';
import Error from '../../components/Error/Error';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { balance, role } = useSelector((state) => state.userStore.data);
  const profileViewMode = useSelector((state) => state.userProfile.profileViewMode);
  const error = useSelector((state) => state.payment.error);

  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    dispatch(cashOut({ number, expiry, cvc, sum }));
  };

  const handleViewModeChange = (mode) => {
    dispatch(changeProfileViewMode(mode));
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]: profileViewMode === CONSTANTS.USER_INFO_MODE,
              })}
              onClick={() => handleViewModeChange(CONSTANTS.USER_INFO_MODE)}
            >
              UserInfo
            </div>
            {role === CONSTANTS.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]: profileViewMode === CONSTANTS.CASHOUT_MODE,
                })}
                onClick={() => handleViewModeChange(CONSTANTS.CASHOUT_MODE)}
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileViewMode === CONSTANTS.USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <div className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <div>
                {error && (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={() => dispatch(clearPaymentStore())}
                  />
                )}
                <PayForm sendRequest={pay} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;