import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Typography, Box } from '@mui/material';

const DomainOptionSelector = () => {
  const [value, setValue] = React.useState('minorVariations');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Do you want a matching domain (.com URL) with your name?</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="minorVariations"
            control={<Radio />}
            label={
              <Box>
                <Typography>Yes</Typography>
                <Typography variant="body2" color="textSecondary">But minor variations are allowed</Typography>
              </Box>
            }
          />
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="exactMatch"
            control={<Radio />}
            label={
              <Box>
                <Typography>Yes</Typography>
                <Typography variant="body2" color="textSecondary">The Domain should exactly match the name</Typography>
              </Box>
            }
          />
        </Box>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            value="no"
            control={<Radio />}
            label={
              <Box>
                <Typography>No</Typography>
                <Typography variant="body2" color="textSecondary">I am only looking for a name, not a Domain</Typography>
              </Box>
            }
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export default DomainOptionSelector;