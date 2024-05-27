import React, { useMemo } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import citiesList from '../cities.json';

interface CityInputProps {
    city: string;
    isNight: boolean;
    fieldHandler: (e: any, newVal: any) => void;
}

const CityInput: React.FC<CityInputProps> = React.memo(({ city, fieldHandler, isNight }) => {
    const cities = useMemo(() => citiesList, []);
    const customClasses = isNight ? 'night' : 'day';

    return (
        <Autocomplete
            options={cities}
            value={city}
            onChange={fieldHandler}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Город"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        className: customClasses
                    }}
                    InputLabelProps={{
                        className: customClasses
                    }}
                />
            )}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            classes={{
                paper: customClasses,
                clearIndicator: customClasses,
                popupIndicator: customClasses,
            }}
        />
    );
})

export default CityInput;
