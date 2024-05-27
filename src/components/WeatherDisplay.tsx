import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface WeatherDisplayProps {
    weatherData: any;
    isNight: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, isNight }) => {
    if (!weatherData) return null;

    const { main, weather } = weatherData;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    return (
        <Card sx={{
            backgroundColor: isNight ? '#34495e' : '#f0f0f0',
            color: isNight ? '#ecf0f1' : '#000000'
        }}>
            <CardContent>
                <Typography variant="h5">{weatherData.name}</Typography>
                <img src={iconUrl} alt="weather icon" />
                <Typography>Температура: {main.temp}°</Typography>
                <Typography>Ощущается как: {main.feels_like}°</Typography>
                <Typography>Мин: {main.temp_min}°</Typography>
                <Typography>Макс: {main.temp_max}°</Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherDisplay;
