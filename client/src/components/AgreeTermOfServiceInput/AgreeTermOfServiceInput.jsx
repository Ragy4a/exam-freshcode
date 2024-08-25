import React from 'react';
import { Field } from 'formik';
import { Link } from 'react-router-dom';

const AgreeTermOfServiceInput = ({ id, type, classes, label, ...rest }) => (
  <Field {...rest}>
    {({ field, meta: { touched, error } }) => (
      <div>
        <div className={classes.container}>
          <input {...field} id={id} type={type} />
          <label htmlFor={id}>
            By clicking this checkbox, you agree to our{' '}
            <Link to='/' target='_blank' rel='noreferrer'>
              Terms of Service.
            </Link>
          </label>
        </div>
        {touched && error && <span className={classes.warning}>{error}</span>}
      </div>
    )}
  </Field>
);

export default AgreeTermOfServiceInput;