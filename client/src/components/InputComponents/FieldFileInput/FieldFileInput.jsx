import React from 'react';
import { Field, useField } from 'formik';

const FieldFileInput = ({ classes, name, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
  const [, , helpers] = useField(name);

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    helpers.setValue(file || '');
  };

  return (
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {helpers.value?.name || ''}
      </span>
      <input
        id="fileInput"
        name={name}
        type="file"
        className={fileInput}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default FieldFileInput;