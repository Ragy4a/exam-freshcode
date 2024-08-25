import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../../constants';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import styles from './ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import Schems from '../../utils/validators/validationSchems';
import OptionalSelects from '../OptionalSelects/OptionalSelects';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

const ContestForm = ({ contestType, handleSubmit, formRef, defaultData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error, data } = useSelector(
    (state) => state.dataForContest
  );
  const isEditContest = useSelector((state) => state.contestByIdStore.isEditContest);

  const getPreference = () => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST:
        dispatch(getDataForContest({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        }));
        break;
      case CONSTANTS.TAGLINE_CONTEST:
        dispatch(getDataForContest({ characteristic1: 'typeOfTagline' }));
        break;
      case CONSTANTS.LOGO_CONTEST:
        dispatch(getDataForContest({ characteristic1: 'brandStyle' }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getPreference();
  }, [contestType]);

  if (error) {
    return <TryAgain getData={getPreference} />;
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          title: '',
          industry: '',
          focusOfWork: '',
          targetCustomer: '',
          file: '',
          ...variableOptions[contestType],
          ...defaultData,
        }}
        onSubmit={handleSubmit}
        validationSchema={Schems.ContestSchem}
        innerRef={formRef}
        enableReinitialize
      >
        <Form>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>Title of contest</span>
            <FormInput
              name="title"
              type="text"
              label="Title"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <SelectInput
              name="industry"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
                warning: styles.warning,
              }}
              header="Describe industry associated with your venture"
              optionsArray={data.industry}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What does your company / business do?
            </span>
            <FormTextArea
              name="focusOfWork"
              type="text"
              label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
              classes={{
                container: styles.componentInputContainer,
                inputStyle: styles.textArea,
                warning: styles.warning,
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              Tell us about your customers
            </span>
            <FormTextArea
              name="targetCustomer"
              type="text"
              label="customers"
              classes={{
                container: styles.componentInputContainer,
                inputStyle: styles.textArea,
                warning: styles.warning,
              }}
            />
          </div>
          <OptionalSelects contestType={contestType} dataForContest={data} />
          <FieldFileInput
            name="file"
            classes={{
              fileUploadContainer: styles.fileUploadContainer,
              labelClass: styles.label,
              fileNameClass: styles.fileName,
              fileInput: styles.fileInput,
              warning: styles.warning,
            }}
            type="file"
          />
          {isEditContest ? (
            <button type="submit" className={styles.changeData}>
              Set Data
            </button>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
};

export default ContestForm;