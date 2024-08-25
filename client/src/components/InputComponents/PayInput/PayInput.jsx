import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = ({
  label,
  changeFocus,
  classes,
  isInputMask = false,
  mask,
  name,
}) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  const inputClassNames = classNames(classes.input, {
    [classes.notValid]: touched && error,
  });

  const renderError = () => {
    if (touched && error) {
      return <span className={classes.error}>{error.message}!</span>;
    }
    return null;
  };

  return (
    <div className={classes.container}>
      {isInputMask ? (
        <InputMask
          mask={mask}
          maskChar={null}
          {...field}
          placeholder={label}
          className={inputClassNames}
          onFocus={() => changeFocus(field.name)}
        />
      ) : (
        <input
          {...field}
          placeholder={label}
          className={inputClassNames}
          onFocus={() => changeFocus(field.name)}
        />
      )}
      {renderError()}
    </div>
  );
};

export default PayInput;