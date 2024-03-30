import React, { useEffect } from 'react';
import axios from 'axios';

const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const Location = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const position = await getLocation();
                const { latitude, longitude } = position.coords;
                await axios.post(`${process.env.REACT_APP_API_HOST}/api/visitor-location`, { latitude, longitude });
            } catch (error) {
                console.error('Error getting location:', error);
            }
        };
        fetchData();
    }, []);

    return <div>Getting user location...</div>;
};


export default Location;
