import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';

interface DayNightToggleProps {
    isNight: boolean;
    setIsNight: React.Dispatch<React.SetStateAction<boolean>>;
}

const DayNightToggle: React.FC<DayNightToggleProps> = ({ isNight, setIsNight }) => {
    const handleChange = () => {
        setIsNight(!isNight);
    };

    return (
        <FormControlLabel
            control={<Switch checked={isNight} onChange={handleChange} />}
            label="Тема: Светлая / Тёмная"
        />
    );
};

export default DayNightToggle;
