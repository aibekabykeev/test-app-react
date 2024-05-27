import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

interface UnitToggleProps {
    units: string;
    handleChange: React.Dispatch<React.SetStateAction<string>>;
}

const UnitToggle: React.FC<UnitToggleProps> = React.memo(({ units, handleChange }) => {

    return (
        <FormControlLabel
            control={<Switch checked={units === 'imperial'} onChange={handleChange} />}
            label="°F / °C"
        />
    );
})

export default UnitToggle;
