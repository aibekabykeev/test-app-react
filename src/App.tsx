import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, CssBaseline, CircularProgress, Box } from '@mui/material';
import CityInput from './components/CityInput';
import WeatherDisplay from './components/WeatherDisplay';
import UnitToggle from './components/UnitToggle';
import DayNightToggle from './components/DayNightToggle';
import config from './config/config';
import {BASE_URL} from "./constants/index";


const App: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [units, setUnits] = useState<string>('metric');
    const [isNight, setIsNight] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [geoLoading, setGeoLoading] = useState<boolean>(true);
    const [geoFetched, setGeoFetched] = useState<boolean>(false);

    const fieldHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, newVal: any) => {
        setCity(newVal || '')
    }, [])

    const fetchWeatherData = async (city: string, updateLoading = true) => {
        if (updateLoading) setLoading(true);
        const API_KEY = config.WEATHER_API_KEY;
        const url = `${BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`;
        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            if (updateLoading) setLoading(false);
        }
    };

    const fetchCityByCoordinates = async (latitude: number, longitude: number) => {
        const API_KEY = config.WEATHER_API_KEY;
        const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`;
        try {
            const response = await axios.get(url);
            setCity(response.data.name);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching city by coordinates:', error);
        } finally {
            setGeoLoading(false);
            setGeoFetched(true);
        }
    };

    const unitHandleChange = useCallback(() => {
        setUnits(units === 'metric' ? 'imperial' : 'metric');
    }, [units])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchCityByCoordinates(latitude, longitude);
        });
    }, [])


    useEffect(() => {
        if (city && geoFetched) {
            fetchWeatherData(city, false);
        }
    }, [city, units, geoFetched]);

    useEffect(() => {
        document.body.className = isNight ? 'night' : 'day';
    }, [isNight]);

    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <DayNightToggle isNight={isNight} setIsNight={setIsNight} />
            <CityInput isNight={isNight} city={city} fieldHandler={fieldHandler} />
            <UnitToggle units={units} handleChange={unitHandleChange} />
            {(loading || geoLoading) ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <WeatherDisplay isNight={isNight} weatherData={weatherData} />
            )}
        </Container>
    );
};

export default App;
