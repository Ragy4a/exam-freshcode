import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styles from './PayForm.module.sass';
import { changeFocusOnCard } from '../../store/slices/paymentSlice';
import PayInput from '../InputComponents/PayInput/PayInput';
import Schems from '../../utils/validators/validationSchems';

const PayForm = ({ isPayForOrder, sendRequest, back }) => {
  const dispatch = useDispatch();

  const changeFocusOnCardHandler = (name) => {
    dispatch(changeFocusOnCard(name));
  };

  const payHandler = (values) => {
    sendRequest(values);
  };

  return (
    <div className={styles.payFormContainer}>
      <span className={styles.headerInfo}>Payment Information</span>
      <Formik
        initialValues={{
          focusOnElement: '',
          name: '',
          number: '',
          cvc: '',
          expiry: '',
        }}
        onSubmit={payHandler}
        validationSchema={Schems.PaymentSchema}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;

          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  number={number || ''}
                  name={name || ''}
                  expiry={expiry || ''}
                  cvc={cvc || ''}
                  focused={values.focusOnElement}
                />
              </div>
              <Form id="myForm" className={styles.formContainer}>
                <div className={styles.bigInput}>
                  <span>Name</span>
                  <PayInput
                    name="name"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="name"
                    changeFocus={changeFocusOnCardHandler}
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <span>Sum</span>
                    <PayInput
                      name="sum"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="sum"
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <span>Card Number</span>
                  <PayInput
                    isInputMask
                    mask="9999 9999 9999 9999 999"
                    name="number"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="card number"
                    changeFocus={changeFocusOnCardHandler}
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <span>* Expires</span>
                    <PayInput
                      isInputMask
                      mask="99/99"
                      name="expiry"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="expiry"
                      changeFocus={changeFocusOnCardHandler}
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <span>* Security Code</span>
                    <PayInput
                      isInputMask
                      mask="9999"
                      name="cvc"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="cvc"
                      changeFocus={changeFocusOnCardHandler}
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {isPayForOrder && (
        <div className={styles.totalSum}>
          <span>Total: $100.00</span>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button form="myForm" className={styles.payButton} type="submit">
          <span>{isPayForOrder ? 'Pay Now' : 'CashOut'}</span>
        </button>
        {isPayForOrder && (
          <div onClick={back} className={styles.backButton}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayForm;