import { useState, useEffect, useMemo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export const useIsGoogleMapsLoaded = () => {
    const [googleMap, setGoogleMap] = useState();
    const loader = useMemo(() => {
        return new Loader({
            apiKey: process.env.REACT_APP_PLACES_API_KEY,
            libraries: ['places'],
        });
    }, []);

    useEffect(() => {
        loader
            .load()
            .then((google) => {
                setGoogleMap(google.maps);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [loader]);

    return googleMap;
};
