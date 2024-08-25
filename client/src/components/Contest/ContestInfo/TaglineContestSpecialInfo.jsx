import React from 'react';
import ContestSpecialInfo from './ContestSpecialInfo';

const TaglineContestSpecialInfo = ({ nameVenture, typeOfTagline }) => {
  const fields = [
    { label: 'Name Venture', value: nameVenture },
    { label: 'Type of Tagline', value: typeOfTagline },
  ];

  return <ContestSpecialInfo fields={fields} />;
};

export default TaglineContestSpecialInfo;