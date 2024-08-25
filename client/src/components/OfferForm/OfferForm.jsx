import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import CONSTANTS from '../../constants';
import { addOffer, clearAddOfferError } from '../../store/slices/contestByIdSlice';
import styles from './OfferForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schemas from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const OfferForm = ({ contestType, contestId, customerId, valid }) => {
  const dispatch = useDispatch();
  const addOfferError = useSelector((state) => state.contestByIdStore.addOfferError);

  const renderOfferInput = () => {
    if (contestType === CONSTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="Your suggestion"
      />
    );
  };

  const setOffer = (values, { resetForm }) => {
    dispatch(clearAddOfferError());
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    dispatch(addOffer(data));
    resetForm();
  };

  const validationSchema =
    contestType === CONSTANTS.LOGO_CONTEST
      ? Schemas.LogoOfferSchema
      : Schemas.TextOfferSchema;

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={() => dispatch(clearAddOfferError())}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {valid && (
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default OfferForm;