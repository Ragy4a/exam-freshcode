import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm/PayForm';
import styles from './Payment.module.sass';
import Error from '../../components/Error/Error';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contests } = useSelector((state) => state.contestCreationStore);
  const { error } = useSelector((state) => state.payment);

  useEffect(() => {
    if (isEmpty(contests)) {
      navigate('/startContest', { replace: true });
    }
  }, [contests, navigate]);

  const handlePay = (values) => {
    const contestArray = Object.keys(contests).map((key) => ({
      ...contests[key],
    }));

    const { number, expiry, cvc } = values;
    const data = new FormData();
    contestArray.forEach((contest) => {
      data.append('files', contest.file);
      contest.haveFile = !!contest.file;
    });
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');

    dispatch(pay({ data: { formData: data }, navigate }));
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.paymentContainer}>
        <span className={styles.headerLabel}>Checkout</span>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={() => dispatch(clearPaymentStore())}
          />
        )}
        <PayForm sendRequest={handlePay} back={goBack} isPayForOrder />
      </div>
      <div className={styles.orderInfoContainer}>
        <span className={styles.orderHeader}>Order Summary</span>
        <div className={styles.packageInfoContainer}>
          <span className={styles.packageName}>Package Name: Standard</span>
          <span className={styles.packagePrice}>$100 USD</span>
        </div>
        <div className={styles.resultPriceContainer}>
          <span>Total:</span>
          <span>$100.00 USD</span>
        </div>
        <a href="http://www.google.com">Have a promo code?</a>
      </div>
    </div>
  );
};

export default Payment;