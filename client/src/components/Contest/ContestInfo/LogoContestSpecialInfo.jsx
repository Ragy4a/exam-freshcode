import React from 'react';

const LogoContestSpecialInfo = ({ nameVenture, brandStyle }) => {
  const fields = [
    { label: 'Name Venture', value: nameVenture },
    { label: 'Brand Style', value: brandStyle },
  ];

  return <ContestSpecialInfo fields={fields} />;
};

export default LogoContestSpecialInfo;