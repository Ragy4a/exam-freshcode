import React from 'react';
import ContestSpecialInfo from './ContestSpecialInfo';

const NameContestSpecialInfo = ({ typeOfName, styleName }) => {
  const fields = [
    { label: 'Type of Name', value: typeOfName },
    { label: 'Style of Name', value: styleName },
  ];

  return <ContestSpecialInfo fields={fields} />;
};

export default NameContestSpecialInfo;