import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';

const OptionalSelects = ({ isFetching, contestType, dataForContest }) => {
  if (isFetching) {
    return <Spinner />;
  }

  const renderNameContestOptions = () => (
    <>
      <SelectInput
        name="typeOfName"
        header="Type of company"
        classes={{
          inputContainer: styles.selectInputContainer,
          inputHeader: styles.selectHeader,
          selectInput: styles.select,
          warning: styles.warning,
        }}
        optionsArray={dataForContest.data.typeOfName}
      />
      <SelectInput
        name="styleName"
        header="Style name"
        classes={{
          inputContainer: styles.selectInputContainer,
          inputHeader: styles.selectHeader,
          selectInput: styles.select,
          warning: styles.warning,
        }}
        optionsArray={dataForContest.data.nameStyle}
      />
    </>
  );

  const renderLogoContestOptions = () => (
    <>
      <div className={styles.inputContainer}>
        <span className={styles.inputHeader}>What name of your venture?</span>
        <FormInput
          name="nameVenture"
          type="text"
          label="Name of venture"
          classes={{
            container: styles.componentInputContainer,
            input: styles.input,
            warning: styles.warning,
          }}
        />
      </div>
      <SelectInput
        name="brandStyle"
        classes={{
          inputContainer: styles.selectInputContainer,
          inputHeader: styles.selectHeader,
          selectInput: styles.select,
          warning: styles.warning,
        }}
        header="Brand Style"
        optionsArray={dataForContest.data.brandStyle}
      />
    </>
  );

  const renderTaglineContestOptions = () => (
    <>
      <div className={styles.inputContainer}>
        <span className={styles.inputHeader}>What name of your venture?</span>
        <FormInput
          name="nameVenture"
          type="text"
          label="Name of venture"
          classes={{
            container: styles.componentInputContainer,
            input: styles.input,
            warning: styles.warning,
          }}
        />
      </div>
      <SelectInput
        name="typeOfTagline"
        classes={{
          inputContainer: styles.selectInputContainer,
          inputHeader: styles.selectHeader,
          selectInput: styles.select,
          warning: styles.warning,
        }}
        header="Type tagline"
        optionsArray={dataForContest.data.typeOfTagline}
      />
    </>
  );

  switch (contestType) {
    case CONSTANTS.NAME_CONTEST:
      return renderNameContestOptions();
    case CONSTANTS.LOGO_CONTEST:
      return renderLogoContestOptions();
    case CONSTANTS.TAGLINE_CONTEST:
      return renderTaglineContestOptions();
    default:
      return null;
  }
};

export default OptionalSelects;